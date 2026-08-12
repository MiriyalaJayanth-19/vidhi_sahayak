const express = require("express");
const { register, login, getMe, updateMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// Public routes (rate-limited)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Protected routes
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

module.exports = router;
