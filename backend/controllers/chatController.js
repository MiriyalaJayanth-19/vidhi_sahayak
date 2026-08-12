const ChatSession = require("../models/ChatSession");

// ──────────────────────────────────────────────────────────────────────────────
// Static data (migrated from @/lib/categories and @/lib/guidance)
// ──────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { slug: "land", name: "Land" },
  { slug: "agreement", name: "Agreement" },
  { slug: "rental", name: "Rental" },
  { slug: "affidavit", name: "Affidavit" },
  { slug: "income-declaration", name: "Income Declaration" },
  { slug: "ipr", name: "IPR" },
  { slug: "application-form-creation", name: "Application Form Creation" },
  { slug: "design-patents", name: "Design Patents" },
  { slug: "copyright", name: "Copyright" },
  { slug: "mou", name: "MOU" },
  { slug: "security", name: "Security" },
  { slug: "surety", name: "Surety" },
];

const GUIDANCE = {
  land: {
    typeRequired: ["Sale deed / Gift deed / Partition deed (as applicable)", "ID proofs of parties"],
    whereToGet: ["Local sub-registrar office", "Revenue department website"],
    submissionOffices: ["Sub-registrar office", "Municipal/Revenue department"],
    steps: ["Collect ownership documents and encumbrance certificate", "Draft deed as per purpose (sale/gift/lease)", "Get stamp duty estimation", "Book appointment at sub-registrar", "Execute and register deed with witnesses"],
    printGuidance: ["A4 bond paper", "Black ink, legible fonts"],
  },
  agreement: { typeRequired: ["Parties' details", "Scope/terms, consideration, timelines"], whereToGet: ["Template from legal services website", "Drafted by an advocate"], submissionOffices: ["Not required unless registration mandatory"], steps: ["Draft terms", "Review risks", "Sign and notarize if needed"], printGuidance: ["A4 paper", "Both party signatures on all pages"] },
  rental: { typeRequired: ["Owner and tenant KYC", "Property details, rent, tenure"], whereToGet: ["State's rent agreement portal", "Notary/Advocate"], submissionOffices: ["E-registration portal (state-wise)", "Sub-registrar if tenure>11 months (varies by state)"], steps: ["Draft agreement", "Calculate stamp duty", "E-register or notarize", "Share copies with parties"], printGuidance: ["Non-judicial stamp paper as per state", "Two witnesses"] },
  affidavit: { typeRequired: ["Declarant details", "Statement of facts"], whereToGet: ["Notary office", "District court complex"], submissionOffices: ["As per use-case: university, bank, govt dept"], steps: ["Prepare draft", "Visit notary with ID", "Sign and notarize", "Submit to requesting authority"], printGuidance: ["Non-judicial stamp paper (denomination varies)", "Sign before notary"] },
  "income-declaration": { typeRequired: ["Income sources", "Bank statements (if needed)"], whereToGet: ["Chartered accountant", "Government forms"], submissionOffices: ["As specified by requesting authority"], steps: ["Collect proofs", "Draft declaration", "Notarize if required", "Submit"], printGuidance: ["A4 paper", "Attest supporting documents"] },
  ipr: { typeRequired: ["Type: patent/design/trademark", "Owner details, description"], whereToGet: ["IP India portal", "Patent/design/trademark agent"], submissionOffices: ["https://ipindia.gov.in"], steps: ["Choose category", "Prepare specification", "File online", "Track examination"], printGuidance: ["Follow portal formats", "Annex drawings/specifications"] },
  mou: { typeRequired: ["Party details", "Scope, deliverables, term"], whereToGet: ["Advocate-drafted", "Templates reviewed by lawyer"], submissionOffices: ["Not mandatory (kept between parties)"], steps: ["Draft terms", "Review", "Sign by both parties", "Notarize if needed"], printGuidance: ["A4 paper", "Initial every page"] },
  copyright: { typeRequired: ["Work details (literary/artistic/software)", "Author/owner details"], whereToGet: ["Copyright Office of India", "Online portal"], submissionOffices: ["https://copyright.gov.in"], steps: ["Prepare work samples", "File online", "Track diary number", "Respond to objections"], printGuidance: ["Digital submission preferred", "Attach source code extracts for software"] },
  "design-patents": { typeRequired: ["Novel design details", "Drawings/images"], whereToGet: ["IP India Designs Office", "Registered patent/design agent"], submissionOffices: ["IP India portal"], steps: ["Prior art search", "Prepare drawings", "File application", "Respond to examination"], printGuidance: ["As per design rules", "High-quality prints of drawings"] },
  security: { typeRequired: ["Type: pledge/mortgage/hypothecation", "Asset and borrower details"], whereToGet: ["Bank-prescribed formats", "Lawyer-drafted"], submissionOffices: ["Bank/Registrar depending on instrument"], steps: ["Choose instrument", "Draft terms", "Execute and register if applicable"], printGuidance: ["Stamp duty as per state", "Witness signatures"] },
  surety: { typeRequired: ["Surety and principal details", "Obligations and limits"], whereToGet: ["Bank/company formats", "Notary"], submissionOffices: ["Bank/company"], steps: ["Collect KYC", "Draft surety terms", "Execute and notarize if required"], printGuidance: ["Non-judicial stamp paper (as required)", "Witness signatures"] },
};

const LANG_NAMES = { "hi-IN": "Hindi", "te-IN": "Telugu", "ta-IN": "Tamil", "bn-IN": "Bengali", "ml-IN": "Malayalam", "kn-IN": "Kannada", "mr-IN": "Marathi", "gu-IN": "Gujarati", "pa-IN": "Punjabi", "ur-IN": "Urdu", "en-IN": "English" };

// ──────────────────────────────────────────────────────────────────────────────
// Language detection (migrated from @/lib/lang-utils)
// ──────────────────────────────────────────────────────────────────────────────

function detectLangFromScript(text) {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";
  if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";
  if (/[\u0600-\u06FF]/.test(text)) return "ur-IN";
  return "en-IN";
}

function detectExplicitLang(text) {
  const patterns = [
    [/\btelugu\b|\btelugu\s*lo\b/i, "te-IN"],
    [/\bhindi\b|\bhindi\s*mein\b|\bhindi\s*me\b/i, "hi-IN"],
    [/\btamil\b|\btamizh\b/i, "ta-IN"],
    [/\bbengali\b|\bbangla\b/i, "bn-IN"],
    [/\bmalayalam\b/i, "ml-IN"],
    [/\bkannada\b/i, "kn-IN"],
    [/\bgujarati\b|\bgujrati\b/i, "gu-IN"],
    [/\bpunjabi\b|\bpanjabi\b/i, "pa-IN"],
    [/\bmarathi\b/i, "mr-IN"],
    [/\burdu\b/i, "ur-IN"],
    [/\bin\s*english\b/i, "en-IN"],
  ];
  for (const [regex, code] of patterns) {
    if (regex.test(text)) return code;
  }
  return null;
}

function resolveLanguage(text, clientLang) {
  if (clientLang && clientLang !== "auto") return clientLang;
  const keyword = detectExplicitLang(text);
  if (keyword) return keyword;
  return detectLangFromScript(text);
}

// ──────────────────────────────────────────────────────────────────────────────
// Category matching & guidance context
// ──────────────────────────────────────────────────────────────────────────────

function matchCategory(text) {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.includes(cat.slug) || lower.includes(cat.name.toLowerCase())) return cat.slug;
  }
  const aliases = { "rent": "rental", "lease": "rental", "sale deed": "land", "property": "land", "plot": "land", "trademark": "ipr", "patent": "ipr", "copyright": "copyright", "nda": "agreement", "contract": "agreement", "affidavit": "affidavit", "notary": "affidavit", "mou": "mou", "memorandum": "mou", "income": "income-declaration", "salary": "income-declaration", "startup": "ipr", "design": "design-patents" };
  for (const [kw, slug] of Object.entries(aliases)) {
    if (lower.includes(kw)) return slug;
  }
  return null;
}

function buildGuidanceContext(categorySlug) {
  if (!categorySlug || !GUIDANCE[categorySlug]) return "";
  const g = GUIDANCE[categorySlug];
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  return `Relevant legal category: ${cat?.name ?? categorySlug}\nTypical documents required: ${g.typeRequired.join(", ")}\nWhere to get/file: ${g.whereToGet.join(" | ")}\nSubmission offices: ${g.submissionOffices.join(" | ")}\nKey steps: ${g.steps.join(" → ")}\nPrint guidance: ${g.printGuidance.join(", ")}`.trim();
}

function buildSystemPrompt(detectedLang, guidanceCtx) {
  const langName = LANG_NAMES[detectedLang] ?? "English";
  const isEnglish = detectedLang === "en-IN";
  const languageInstruction = isEnglish
    ? "Reply in clear, simple English that is easy for any Indian citizen to understand."
    : `IMPORTANT: You must reply ONLY in ${langName} using its native script and characters. Do NOT switch to English or any other language in your response. Write naturally as a native ${langName} speaker would, using simple everyday vocabulary accessible to common citizens.`;
  return `You are VidhiSahayak (विधि सहायक), an expert AI legal assistant dedicated to helping Indian citizens understand laws, their rights, and legal procedures.\n\n${languageInstruction}\n\nYOUR EXPERTISE COVERS:\n• Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Civil Procedure Code (CPC)\n• Property & Land laws: Registration Act, Transfer of Property Act, RERA\n• Tenant rights and rental agreements (state-specific rules)\n• Right to Information (RTI Act, 2005)\n• Consumer Protection Act, 2019\n• Personal laws: Hindu Marriage Act, Muslim Personal Law, Special Marriage Act\n• Labour laws: Shops & Establishments Act, Maternity Benefit Act, Minimum Wages Act\n• Motor Vehicles Act, 2019\n• Intellectual Property: Patents Act, Trademarks Act, Copyright Act\n• Affidavits, notarization, stamp duty, document registration\n• Government schemes: PM Awas Yojana, Jan Dhan, Ration card, Aadhaar\n\nRESPONSE GUIDELINES:\n1. Be helpful and empathetic — many users are first-time legal information seekers\n2. Give specific actionable steps (not vague advice)\n3. Cite the relevant Act/Section when applicable\n4. Mention if users should consult a lawyer or notary for their specific situation\n5. Keep answers concise (3–5 sentences or bullet points) unless a detailed explanation is requested\n6. NEVER provide advice that could be construed as representing the user legally\n\n${guidanceCtx ? `CONTEXT FOR THIS QUERY:\n${guidanceCtx}` : ""}\n\nPLATFORM CAPABILITIES TO MENTION WHEN RELEVANT:\n• Document generation: rental agreements, affidavits, sale deeds, MOUs, service agreements\n• Category-wise guidance for: Land, Rental, Affidavit, IPR, Agreement, MOU, Security, Surety, Copyright, Design Patents\n• Lawyer consultation booking\n• Step-by-step submission guides`.trim();
}

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/chat
// ──────────────────────────────────────────────────────────────────────────────

async function chat(req, res) {
  try {
    const { message, sessionId, lang: clientLang } = req.body;
    const userText = String(message ?? "");

    if (!userText) {
      return res.status(400).json({ message: "message is required" });
    }

    // Resolve language
    const detectedLang = resolveLanguage(userText, clientLang);

    // Match category for context injection
    const categorySlug = matchCategory(userText);
    const guidanceCtx = buildGuidanceContext(categorySlug);
    const systemPrompt = buildSystemPrompt(detectedLang, guidanceCtx);

    // Get or create session in MongoDB
    let session = null;
    const userId = req.user?._id ?? null;

    if (sessionId) {
      session = await ChatSession.findById(sessionId);
    }
    if (!session) {
      session = await ChatSession.create({ user: userId, messages: [] });
    }

    // Add user message to session
    session.messages.push({ role: "user", content: userText, lang: detectedLang });

    // Build conversation history (last 12 messages)
    const history = session.messages.slice(-12).map((m) => ({ role: m.role, content: m.content }));

    // ── Try AI providers ──────────────────────────────────────────────────────
    let assistantText = "";
    let providerUsed = "none";
    let modelUsed = null;
    let geminiError = "";

    const geminiKey = process.env.GEMINI_API_KEY;
    const perplexityKey = process.env.PERPLEXITY_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const GEMINI_MODELS = ["gemini-2.0-flash-lite", "gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash"];

    if (geminiKey) {
      let hit429 = false;
      for (const model of GEMINI_MODELS) {
        try {
          const { default: fetch } = await import("node-fetch");
          const res2 = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: history.map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.content }] })),
                generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
                safetySettings: [],
              }),
            }
          );
          if (!res2.ok) {
            geminiError = `${model}: HTTP ${res2.status}`;
            if (res2.status === 429) { hit429 = true; await new Promise((r) => setTimeout(r, 1500)); }
            continue;
          }
          const g = await res2.json();
          const text = g?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (typeof text === "string" && text.length > 0) {
            assistantText = text; providerUsed = "gemini"; modelUsed = model; hit429 = false; break;
          }
          geminiError = `${model}: empty response`;
        } catch (e) {
          geminiError = `${model}: ${e.message}`;
        }
      }
      if (!assistantText && hit429) geminiError = "429: rate_limit_exceeded";
    }

    if (!assistantText && perplexityKey) {
      try {
        const { default: fetch } = await import("node-fetch");
        const r = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${perplexityKey}` },
          body: JSON.stringify({ model: "sonar-small-online", messages: [{ role: "system", content: systemPrompt }, ...history], max_tokens: 512 }),
        });
        const data = await r.json();
        assistantText = data?.choices?.[0]?.message?.content ?? "";
        if (assistantText) { providerUsed = "perplexity"; modelUsed = "sonar-small-online"; }
      } catch { /* fallthrough */ }
    }

    if (!assistantText && openaiKey) {
      try {
        const { default: fetch } = await import("node-fetch");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemPrompt }, ...history], max_tokens: 512 }),
        });
        const data = await r.json();
        assistantText = data?.choices?.[0]?.message?.content ?? "";
        if (assistantText) { providerUsed = "openai"; modelUsed = "gpt-4o-mini"; }
      } catch { /* fallthrough */ }
    }

    if (!assistantText) {
      if (geminiKey && geminiError) {
        assistantText = geminiError.includes("429")
          ? "⚠️ The AI service is temporarily rate-limited (free tier allows ~15 requests/minute).\n\nPlease wait about 60 seconds and try again."
          : "⚠️ Unable to reach the AI service right now. Please try again in a moment.";
      } else {
        assistantText = "Namaste! I'm VidhiSahayak. Please add your GEMINI_API_KEY in the backend .env for full AI responses.";
      }
    }

    // Save assistant reply to session
    session.messages.push({ role: "assistant", content: assistantText, lang: detectedLang });
    // Keep session from growing unbounded (max 100 messages)
    if (session.messages.length > 100) {
      session.messages = session.messages.slice(-100);
    }
    await session.save();

    return res.json({
      reply: assistantText,
      sessionId: session._id,
      detectedLang,
      categoryMatched: categorySlug,
      providers: {
        geminiConfigured: Boolean(geminiKey),
        perplexityConfigured: Boolean(perplexityKey),
        openaiConfigured: Boolean(openaiKey),
      },
      providerUsed,
      modelUsed,
    });
  } catch (err) {
    console.error("[chat] error:", err);
    res.status(500).json({ message: "Chat request failed." });
  }
}

module.exports = { chat };
