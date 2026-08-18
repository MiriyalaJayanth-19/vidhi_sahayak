const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");
const logger = require("../config/logger");

// ── Validation schemas ────────────────────────────────────────────────────────
const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "lawyer"]).optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const updateMeSchema = z.object({
  fullName: z.string().trim().min(2).optional(),
  preferredLanguage: z.string().min(2).max(10).optional(),
}).strict(); // reject unknown fields

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
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { fullName, email, password, role } = parsed.data;

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
    logger.error({ err }, "[auth] register error");
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { email, password } = parsed.data;

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
    logger.error({ err }, "[auth] login error");
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
    const parsed = updateMeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const updates = parsed.data;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    logger.error({ err }, "[auth] updateMe error");
    res.status(500).json({ message: "Update failed." });
  }
}

module.exports = { register, login, getMe, updateMe };
