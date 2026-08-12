const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the MONGODB_URI from .env
 * Exits the process on failure so the server doesn't start in a broken state.
 */
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 8 doesn't need these flags, but included for clarity
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
