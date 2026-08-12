const User = require("../models/User");

/**
 * GET /api/lawyers
 * Query params: q, practice, location, maxFee
 *
 * Returns a list of verified lawyers from MongoDB.
 * Falls back to static seed data if the DB has no verified lawyers yet.
 */

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
    const q = (req.query.q || "").toLowerCase();
    const practice = req.query.practice || "all";
    const location = req.query.location || "all";
    const maxFee = req.query.maxFee ? Number(req.query.maxFee) : null;

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
    if (maxFee !== null) {
      query["lawyerProfile.fee"] = { $lte: maxFee };
    }
    if (q) {
      query.$or = [
        { fullName: { $regex: q, $options: "i" } },
        { "lawyerProfile.officeLocation": { $regex: q, $options: "i" } },
      ];
    }

    const lawyers = await User.find(query)
      .select("fullName lawyerProfile createdAt")
      .lean();

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

      return res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300").json({ items });
    }

    // Fall back to static data if no lawyers in DB yet
    const filtered = STATIC_LAWYERS.filter((l) => {
      const matchesText = q ? [l.name, l.location, ...l.practices].join(" ").toLowerCase().includes(q) : true;
      const matchesPractice = practice === "all" ? true : l.practices.includes(practice);
      const matchesLocation = location === "all" ? true : l.location === location;
      const matchesFee = maxFee ? l.fee <= maxFee : true;
      return matchesText && matchesPractice && matchesLocation && matchesFee;
    });

    return res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300").json({ items: filtered });
  } catch (err) {
    console.error("[lawyers] error:", err);
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
