const jwt = require("jsonwebtoken");
const User = require("../models/User");

/** Generate a signed JWT for a user id */
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

/**
 * POST /api/auth/register
 * Body: { fullName, email, password, role? }
 */
async function register(req, res) {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email and password are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role === "lawyer" ? "lawyer" : "user",
    });

    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (err) {
    console.error("[auth] register error:", err);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Explicitly select password (it is excluded by default via 'select: false')
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (err) {
    console.error("[auth] login error:", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
}

/**
 * GET /api/auth/me  (protected)
 * Returns the currently authenticated user's profile.
 */
async function getMe(req, res) {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      preferredLanguage: req.user.preferredLanguage,
      lawyerProfile: req.user.lawyerProfile,
    },
  });
}

/**
 * PATCH /api/auth/me  (protected)
 * Update the current user's non-sensitive fields.
 */
async function updateMe(req, res) {
  try {
    const allowed = ["fullName", "preferredLanguage"];
    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    res.status(500).json({ message: "Update failed." });
  }
}

module.exports = { register, login, getMe, updateMe };
