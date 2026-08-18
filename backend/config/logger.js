const pino = require("pino");

/**
 * Structured logger using Pino.
 *
 * - Production : JSON output (compatible with Datadog, CloudWatch, Grafana Loki, etc.)
 * - Development: Human-readable via pino-pretty
 *
 * Usage in controllers / middleware:
 *   const logger = require("../config/logger");
 *   logger.info("Server started");
 *   logger.error({ err }, "[auth] register failed");
 */
const isTest = process.env.NODE_ENV === "test";
const isDev  = !isTest && process.env.NODE_ENV !== "production";

const logger = pino({
  // Silent in tests — prevents pino-pretty worker threads from hanging Jest
  level: isTest ? "silent" : (process.env.LOG_LEVEL || (isDev ? "debug" : "info")),
  // Pretty-print only in development (not test, not production)
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

module.exports = logger;
