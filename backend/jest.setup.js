/**
 * jest.setup.js — Runs before all tests.
 *
 * Sets required environment variables so modules like rateLimiter.js,
 * logger.js, and authController.js don't fail or try to connect to
 * Redis/Sentry during tests.
 */

// Ensure test environment
process.env.NODE_ENV = "test";

// Prevent Redis connection attempts in tests (rateLimiter falls back to in-memory)
delete process.env.REDIS_URL;

// Prevent Sentry initialization in tests
delete process.env.SENTRY_DSN;

// Provide dummy JWT secret for auth tests
process.env.JWT_SECRET = "test-secret-for-jest-do-not-use-in-production";
process.env.JWT_EXPIRES_IN = "1h";

// Suppress Google TTS key in tests (ttsController returns 400 when key missing)
delete process.env.GOOGLE_TTS_API_KEY;
