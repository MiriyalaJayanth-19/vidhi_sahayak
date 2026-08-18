/**
 * app.js — Express application factory.
 *
 * Exports the configured Express `app` WITHOUT starting the HTTP server.
 * This separation allows tests (supertest) to import the app and run it
 * in-process without binding to a port.
 *
 * The HTTP server is started in server.js (and cluster.js in production).
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const pinoHttp = require("pino-http");
const Sentry = require("@sentry/node");
const logger = require("./config/logger");

const { generalLimiter } = require("./middleware/rateLimiter");

// ── Sentry (error monitoring) ─────────────────────────────────────────────────
// Only initializes when SENTRY_DSN is provided — safe to omit in local dev.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: 0.1, // capture 10% of requests for performance traces
  });
  logger.info("Sentry initialized");
}

// Route files
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const lawyerRoutes = require("./routes/lawyerRoutes");
const ttsRoutes = require("./routes/ttsRoutes");

const app = express();

// ── Sentry request handler (must be FIRST middleware) ─────────────────────────
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
}

// ── Security & Logging ────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "http://localhost:3000")
      .split(",")
      .map((o) => o.trim()),
    credentials: true,
  })
);
// Structured HTTP request logging via pino-http (disabled in test to prevent Jest hanging)
if (process.env.NODE_ENV !== "test") {
  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));
}

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting (general) ───────────────────────────────────────────────────
app.use("/api", generalLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/tts", ttsRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState; // 0=disconnected, 1=connected
  const dbOk = dbState === 1;
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? "ok" : "degraded",
    db: dbOk ? "connected" : "disconnected",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ── Global error handler ──────────────────────────────────────────────────────
// Sentry error handler must be registered BEFORE the custom error handler
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error({ err, req: { method: req.method, url: req.originalUrl } }, "[server] unhandled error");
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

module.exports = app;
