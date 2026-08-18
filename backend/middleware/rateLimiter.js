const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const Redis = require("ioredis");
const logger = require("../config/logger");

// ── Redis client ──────────────────────────────────────────────────────────────
//
// Redis is ONLY created when REDIS_URL is explicitly set AND we are not in
// a test environment. This prevents ioredis from opening a TCP socket to
// localhost:6379 during Jest runs, which would hang the test suite.
//
let redisClient = null;

if (process.env.REDIS_URL && process.env.NODE_ENV !== "test") {
  redisClient = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    enableOfflineQueue: false, // don't queue commands while disconnected
    lazyConnect: true,
  });

  redisClient.on("error", (err) => {
    // Log but do NOT crash — rate limiter falls back to in-memory if Redis goes down
    logger.error({ err }, "[redis] connection error");
  });
  redisClient.on("connect", () => logger.info("[redis] connected"));
  redisClient.on("reconnecting", () => logger.warn("[redis] reconnecting…"));
}

/** Create a RedisStore for a given prefix (when Redis is available) */
function makeStore(prefix) {
  if (!redisClient) return undefined; // fall back to in-memory store
  return new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix,
  });
}

// ── Rate limiters ─────────────────────────────────────────────────────────────

/**
 * General API rate limiter — 100 requests per 15 minutes per IP.
 * Applied to all /api/* routes.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeStore("rl:general:"),
  message: {
    message: "Too many requests from this IP — please try again in 15 minutes.",
  },
});

/**
 * Strict limiter for auth routes — 10 attempts per 15 minutes per IP.
 * Prevents brute-force login/register attacks.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeStore("rl:auth:"),
  message: {
    message: "Too many authentication attempts — please try again in 15 minutes.",
  },
});

/**
 * Chat-specific limiter — 15 messages per minute per IP.
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeStore("rl:chat:"),
  message: {
    message: "You are sending too many messages. Please wait a minute before trying again.",
  },
});

module.exports = { generalLimiter, authLimiter, chatLimiter };
