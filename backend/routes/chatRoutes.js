const express = require("express");
const { chat } = require("../controllers/chatController");
const { chatLimiter } = require("../middleware/rateLimiter");

// protect is optional: chat works for anonymous users too, but if a token
// is present, we attach req.user so the session can be linked to the user.
const { protect } = require("../middleware/auth");

const router = express.Router();

// Optional auth: if no token is present, req.user will be undefined (null session)
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return next();
  try {
    await protect(req, res, next);
  } catch {
    next(); // treat as anonymous if token is invalid
  }
}

router.post("/", chatLimiter, optionalAuth, chat);

module.exports = router;
