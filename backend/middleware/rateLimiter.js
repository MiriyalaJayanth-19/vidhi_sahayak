const rateLimit = require("express-rate-limit");

/**
 * General API rate limiter — 100 requests per 15 minutes per IP.
 * Apply to all /api routes via app.use('/api', generalLimiter, router).
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP — please try again in 15 minutes.",
  },
});

/**
 * Strict limiter for auth routes — 10 attempts per 15 minutes per IP.
 * Prevents brute-force login attacks.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts — please try again in 15 minutes.",
  },
});

/**
 * Chat-specific limiter — 15 messages per minute per IP.
 * Mirrors the old in-memory rate limiter in the Next.js API route.
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "You are sending too many messages. Please wait a minute before trying again.",
  },
});

module.exports = { generalLimiter, authLimiter, chatLimiter };
