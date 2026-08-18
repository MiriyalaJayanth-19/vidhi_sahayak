/**
 * server.js — HTTP server entry point.
 *
 * Imports the configured Express app from app.js, connects to MongoDB,
 * binds to a port, and handles graceful shutdown.
 *
 * For tests: import app.js directly (no port binding).
 * For production: use cluster.js (multi-core) which requires this file.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./config/logger");
const connectDB = require("./config/db");
const app = require("./app");

// ── Bootstrap DB ──────────────────────────────────────────────────────────────
connectDB();

// ── Start HTTP server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀  VidhiSahayak backend running on http://localhost:${PORT}`);
  logger.info(`   Environment : ${process.env.NODE_ENV || "development"}`);
  // NOTE: Never log MONGODB_URI — it may contain credentials (Atlas user:pass)
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
function shutdown(signal) {
  logger.info(`Received ${signal} — shutting down gracefully…`);
  server.close(async () => {
    logger.info("HTTP server closed. Closing MongoDB connection…");
    await mongoose.connection.close();
    logger.info("MongoDB disconnected. Exiting.");
    process.exit(0);
  });
  // Force-kill if shutdown takes longer than 10 seconds
  setTimeout(() => {
    logger.error("Forced shutdown after 10s timeout");
    process.exit(1);
  }, 10_000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));
