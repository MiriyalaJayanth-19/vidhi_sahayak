const mongoose = require("mongoose");

/**
 * ChatSession — a conversation thread belonging to a user (or anonymous).
 * Each session has many ChatMessages (stored inline as an embedded array for
 * fast retrieval, capped at 50 messages per session).
 */
const chatMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      default: "en-IN",
    },
  },
  {
    _id: false, // no separate _id per message — they live inside the session
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

const chatSessionSchema = new mongoose.Schema(
  {
    // null means anonymous session
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    messages: {
      type: [chatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for user session lookups
chatSessionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("ChatSession", chatSessionSchema);
