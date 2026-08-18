/**
 * Integration tests for the VidhiSahayak backend.
 *
 * Uses:
 *  - jest            : test runner
 *  - supertest       : HTTP assertion on the Express app
 *  - mongodb-memory-server : in-memory MongoDB (no real DB needed)
 *
 * Run: npm test
 */

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// ── App setup ─────────────────────────────────────────────────────────────────
// We import app separately from server.js so we don't start the HTTP server
// during tests (supertest does that itself).
const app = require("../app");

let mongoServer;

// ── Global setup / teardown ───────────────────────────────────────────────────
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up all collections between tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// ── Auth: POST /api/auth/register ─────────────────────────────────────────────
describe("POST /api/auth/register", () => {
  it("returns 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it("returns 400 if password is too short (< 8 chars)", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Test User", email: "test@example.com", password: "short" });
    expect(res.status).toBe(400);
    expect(res.body.errors.password).toBeDefined();
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Test User", email: "not-an-email", password: "validpass123" });
    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBeDefined();
  });

  it("registers a new user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Jayanth M", email: "jayanth@example.com", password: "securePass1!" });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("jayanth@example.com");
    expect(res.body.user.password).toBeUndefined(); // password never returned
  });

  it("returns 409 if email already exists", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Jayanth M", email: "dup@example.com", password: "securePass1!" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Other", email: "dup@example.com", password: "securePass1!" });
    expect(res.status).toBe(409);
  });
});

// ── Auth: POST /api/auth/login ────────────────────────────────────────────────
describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Login User", email: "login@example.com", password: "correctPass1!" });
  });

  it("returns 400 if fields are missing", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "login@example.com" });
    expect(res.status).toBe(400);
  });

  it("returns 401 for wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@example.com", password: "wrongpassword" });
    expect(res.status).toBe(401);
  });

  it("returns token on successful login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@example.com", password: "correctPass1!" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

// ── Auth: GET /api/auth/me ────────────────────────────────────────────────────
describe("GET /api/auth/me", () => {
  let token;
  beforeEach(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ fullName: "Me User", email: "me@example.com", password: "securePass1!" });
    token = res.body.token;
  });

  it("returns 401 without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns user profile with valid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("me@example.com");
    expect(res.body.user.password).toBeUndefined();
  });
});

// ── Chat: POST /api/chat ──────────────────────────────────────────────────────
describe("POST /api/chat", () => {
  it("returns 400 if message is missing", async () => {
    const res = await request(app).post("/api/chat").send({});
    expect(res.status).toBe(400);
  });

  it("returns 400 if message exceeds 2000 characters", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: "a".repeat(2001) });
    expect(res.status).toBe(400);
  });

  it("returns a chat response (AI key may not be set — just check structure)", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: "What is RTI Act?" });
    // Even without AI keys, the endpoint should return 200 with a fallback reply
    expect(res.status).toBe(200);
    expect(res.body.reply).toBeDefined();
    expect(res.body.sessionId).toBeDefined();
  });
});

// ── TTS: POST /api/tts ────────────────────────────────────────────────────────
describe("POST /api/tts", () => {
  it("returns 400 if text is missing", async () => {
    const res = await request(app).post("/api/tts").send({});
    expect(res.status).toBe(400);
  });

  it("returns 400 if text exceeds 1000 characters", async () => {
    const res = await request(app)
      .post("/api/tts")
      .send({ text: "a".repeat(1001) });
    expect(res.status).toBe(400);
  });

  it("returns 400 if GOOGLE_TTS_API_KEY is not set", async () => {
    const original = process.env.GOOGLE_TTS_API_KEY;
    delete process.env.GOOGLE_TTS_API_KEY;
    const res = await request(app)
      .post("/api/tts")
      .send({ text: "Hello World" });
    expect(res.status).toBe(400);
    process.env.GOOGLE_TTS_API_KEY = original;
  });
});

// ── Lawyers: GET /api/lawyers ─────────────────────────────────────────────────
describe("GET /api/lawyers", () => {
  it("returns 200 with items array (falls back to static data)", async () => {
    const res = await request(app).get("/api/lawyers");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("supports pagination params", async () => {
    const res = await request(app).get("/api/lawyers?page=1&limit=2");
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(2);
    expect(res.body.items.length).toBeLessThanOrEqual(2);
  });

  it("safely handles ReDoS-like regex input", async () => {
    const res = await request(app).get("/api/lawyers?q=(((((((((");
    expect(res.status).toBe(200); // should not crash or timeout
  });
});

// ── Health check ──────────────────────────────────────────────────────────────
describe("GET /health", () => {
  it("returns 200 and db:connected when MongoDB is up", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("connected");
  });
});
