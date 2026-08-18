const mongoose = require("mongoose");
const logger = require("./logger");

/**
 * Connect to MongoDB using the MONGODB_URI from .env.
 * Exits the process on initial connection failure (fast-fail at startup).
 * After startup, Mongoose handles automatic reconnect — connection events are
 * logged for observability.
 */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast on startup (5s)
      heartbeatFrequencyMS: 10000,    // check connection health every 10s
    });
    logger.info({ host: mongoose.connection.host }, "✅ MongoDB connected");
  } catch (err) {
    logger.error({ err }, "❌ MongoDB initial connection failed — exiting");
    process.exit(1);
  }
}

// ── Connection event listeners for observability ──────────────────────────────
mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected — Mongoose will attempt to reconnect");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error({ err }, "MongoDB connection error");
});

module.exports = connectDB;
