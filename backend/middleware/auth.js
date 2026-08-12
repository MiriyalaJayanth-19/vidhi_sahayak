const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes that require a valid JWT.
 * Reads the token from the Authorization header: "Bearer <token>"
 * Attaches the full user document to req.user on success.
 */
async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorised — no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user (without password) to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found — token invalid" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired — please sign in again" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * Middleware to restrict access to specific roles.
 * Usage: router.get('/admin', protect, authorize('admin'), handler)
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied — requires role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
}

module.exports = { protect, authorize };
