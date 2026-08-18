const User = require("../models/User");
const logger = require("../config/logger");

/**
 * GET /api/lawyers
 * Query params: q, practice, location, maxFee, page, limit
 *
 * Returns a list of verified lawyers from MongoDB.
 * Falls back to static seed data if the DB has no verified lawyers yet.
 */

// Escape special regex characters to prevent ReDoS attacks
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Static fallback data (migrated from @/lib/lawyers.ts)
const STATIC_LAWYERS = [
  { id: "l1", name: "Adv. Aditi Rao", practices: ["Civil", "Property", "Contracts"], experienceYears: 7, location: "Hyderabad", fee: 1500 },
  { id: "l2", name: "Adv. Karthik Menon", practices: ["Criminal", "Cyber"], experienceYears: 5, location: "Bengaluru", fee: 2000 },
  { id: "l3", name: "Adv. Nisha Sharma", practices: ["IPR", "Design Patents", "Trademarks"], experienceYears: 9, location: "Mumbai", fee: 2500 },
  { id: "l4", name: "Adv. Rohan Gupta", practices: ["Family", "Rental", "Civil"], experienceYears: 6, location: "Delhi", fee: 1200 },
  { id: "l5", name: "Adv. Priya Desai", practices: ["Corporate", "MOU", "Agreements"], experienceYears: 8, location: "Pune", fee: 1800 },
];

async function getLawyers(req, res) {
  try {
    const rawQ = (req.query.q || "").trim().slice(0, 100); // cap search string at 100 chars
    const q = rawQ.toLowerCase();
    const practice = req.query.practice || "all";
    const location = req.query.location || "all";
    const maxFee = req.query.maxFee ? Number(req.query.maxFee) : null;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    // Build MongoDB query for verified lawyers
    const query = {
      role: "lawyer",
      "lawyerProfile.verificationStatus": "verified",
    };

    if (practice !== "all") {
      query["lawyerProfile.practices"] = practice;
    }
    if (location !== "all") {
      query["lawyerProfile.officeLocation"] = location;
    }
    if (maxFee !== null && !isNaN(maxFee)) {
      query["lawyerProfile.fee"] = { $lte: maxFee };
    }
    if (rawQ) {
      // Escape user input before using in regex to prevent ReDoS
      const safeQ = escapeRegex(rawQ);
      query.$or = [
        { fullName: { $regex: safeQ, $options: "i" } },
        { "lawyerProfile.officeLocation": { $regex: safeQ, $options: "i" } },
      ];
    }

    const [lawyers, total] = await Promise.all([
      User.find(query).select("fullName lawyerProfile createdAt").skip(skip).limit(limit).lean(),
      User.countDocuments(query),
    ]);

    if (lawyers.length > 0) {
      const items = lawyers.map((l) => ({
        id: l._id,
        name: l.fullName,
        practices: l.lawyerProfile?.practices ?? [],
        experienceYears: l.lawyerProfile?.experienceYears ?? 0,
        location: l.lawyerProfile?.officeLocation ?? "",
        fee: l.lawyerProfile?.fee ?? 0,
        photoUrl: l.lawyerProfile?.photoUrl ?? null,
      }));

      return res
        .set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
        .json({ items, total, page, limit, pages: Math.ceil(total / limit) });
    }

    // Fall back to static data if no lawyers in DB yet
    const filtered = STATIC_LAWYERS.filter((l) => {
      const matchesText = q ? [l.name, l.location, ...l.practices].join(" ").toLowerCase().includes(q) : true;
      const matchesPractice = practice === "all" ? true : l.practices.includes(practice);
      const matchesLocation = location === "all" ? true : l.location === location;
      const matchesFee = maxFee ? l.fee <= maxFee : true;
      return matchesText && matchesPractice && matchesLocation && matchesFee;
    });

    // Apply basic pagination to static fallback too
    const paginatedStatic = filtered.slice(skip, skip + limit);
    return res
      .set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
      .json({ items: paginatedStatic, total: filtered.length, page, limit, pages: Math.ceil(filtered.length / limit) });
  } catch (err) {
    logger.error({ err }, "[lawyers] getLawyers error");
    res.status(500).json({ message: "Failed to fetch lawyers." });
  }
}

/**
 * GET /api/lawyers/:id
 * Get a single lawyer's full profile.
 */
async function getLawyerById(req, res) {
  try {
    const lawyer = await User.findOne({ _id: req.params.id, role: "lawyer" })
      .select("fullName lawyerProfile createdAt")
      .lean();

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found." });
    }

    res.json({
      id: lawyer._id,
      name: lawyer.fullName,
      practices: lawyer.lawyerProfile?.practices ?? [],
      experienceYears: lawyer.lawyerProfile?.experienceYears ?? 0,
      location: lawyer.lawyerProfile?.officeLocation ?? "",
      fee: lawyer.lawyerProfile?.fee ?? 0,
      education: lawyer.lawyerProfile?.education ?? "",
      practicingCourt: lawyer.lawyerProfile?.practicingCourt ?? "",
      contactInfo: lawyer.lawyerProfile?.contactInfo ?? "",
      photoUrl: lawyer.lawyerProfile?.photoUrl ?? null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lawyer." });
  }
}

module.exports = { getLawyers, getLawyerById };
