const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },
    role: {
      type: String,
      enum: ["user", "lawyer", "consultant", "admin"],
      default: "user",
    },
    preferredLanguage: {
      type: String,
      default: "en-IN",
    },
    // Lawyer-specific fields (only populated when role === 'lawyer')
    lawyerProfile: {
      licenseNumber: String,
      verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      education: String,
      experienceYears: { type: Number, default: 0 },
      practicingCourt: String,
      officeLocation: String,
      contactInfo: String,
      practices: { type: [String], default: [] },
      fee: { type: Number, default: 0 },
      photoUrl: String,
      proofIdentityUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
