const mongoose = require("mongoose");

/**
 * Document model — user-created legal documents.
 * 'content' is a flexible object to store filled-form data for any category.
 */
const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast user-document lookups
documentSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Document", documentSchema);
