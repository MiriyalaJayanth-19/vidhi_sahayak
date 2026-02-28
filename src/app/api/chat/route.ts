import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { GUIDANCE } from "@/lib/guidance";
import { CATEGORIES } from "@/lib/categories";
import { resolveLanguage, detectExplicitLang, detectLangFromScript, LANG_NAMES } from "@/lib/lang-utils";


// ──────────────────────────────────────────────────────────────────────────────
// Category keyword matching — inject relevant guidance into the prompt
// ──────────────────────────────────────────────────────────────────────────────
function matchCategory(text: string): string | null {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.includes(cat.slug) || lower.includes(cat.name.toLowerCase())) {
      return cat.slug;
    }
  }
  // Additional keyword aliases
  const aliases: Record<string, string> = {
    "rent": "rental", "lease": "rental", "house rent": "rental",
    "sale deed": "land", "property": "land", "plot": "land",
    "trademark": "ipr", "patent": "ipr", "copyright": "copyright",
    "nda": "agreement", "contract": "agreement",
    "affidavit": "affidavit", "notary": "affidavit",
    "mou": "mou", "memorandum": "mou",
    "income": "income-declaration", "salary": "income-declaration",
    "startup": "ipr", "design": "design-patents",
  };
  for (const [kw, slug] of Object.entries(aliases)) {
    if (lower.includes(kw)) return slug;
  }
  return null;
}

function buildGuidanceContext(categorySlug: string | null): string {
  if (!categorySlug || !GUIDANCE[categorySlug]) return "";
  const g = GUIDANCE[categorySlug];
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  return `
Relevant legal category: ${cat?.name ?? categorySlug}
Typical documents required: ${g.typeRequired.join(", ")}
Where to get/file: ${g.whereToGet.join(" | ")}
Submission offices: ${g.submissionOffices.join(" | ")}
Key steps: ${g.steps.join(" → ")}
Print guidance: ${g.printGuidance.join(", ")}
`.trim();
}

// ──────────────────────────────────────────────────────────────────────────────
// System prompt builder
// ──────────────────────────────────────────────────────────────────────────────
function buildSystemPrompt(detectedLang: string, guidanceCtx: string): string {
  const langName = LANG_NAMES[detectedLang] ?? "English";
  const isEnglish = detectedLang === "en-IN";

  const languageInstruction = isEnglish
    ? "Reply in clear, simple English that is easy for any Indian citizen to understand."
    : `IMPORTANT: You must reply ONLY in ${langName} using its native script and characters. Do NOT switch to English or any other language in your response. Write naturally as a native ${langName} speaker would, using simple everyday vocabulary accessible to common citizens.`;

  return `You are VidhiSahayak (विधि सहायक), an expert AI legal assistant dedicated to helping Indian citizens understand laws, their rights, and legal procedures.

${languageInstruction}

YOUR EXPERTISE COVERS:
• Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Civil Procedure Code (CPC)
• Property & Land laws: Registration Act, Transfer of Property Act, RERA
• Tenant rights and rental agreements (state-specific rules)
• Right to Information (RTI Act, 2005)
• Consumer Protection Act, 2019
• Personal laws: Hindu Marriage Act, Muslim Personal Law, Special Marriage Act
• Labour laws: Shops & Establishments Act, Maternity Benefit Act, Minimum Wages Act
• Motor Vehicles Act, 2019
• Intellectual Property: Patents Act, Trademarks Act, Copyright Act
• Affidavits, notarization, stamp duty, document registration
• Government schemes: PM Awas Yojana, Jan Dhan, Ration card, Aadhaar

RESPONSE GUIDELINES:
1. Be helpful and empathetic — many users are first-time legal information seekers
2. Give specific actionable steps (not vague advice)
3. Cite the relevant Act/Section when applicable (e.g., "Under Section 17 of Registration Act...")
4. Mention if users should consult a lawyer or notary for their specific situation
5. Keep answers concise (3–5 sentences or bullet points) unless a detailed explanation is requested
6. If creating/helping with a document, mention it is available on VidhiSahayak's document generation section
7. NEVER provide advice that could be construed as representing the user legally; always clarify this is general legal information

${guidanceCtx ? `CONTEXT FOR THIS QUERY:\n${guidanceCtx}` : ""}

PLATFORM CAPABILITIES TO MENTION WHEN RELEVANT:
• Document generation: rental agreements, affidavits, sale deeds, MOUs, service agreements
• Category-wise guidance for: Land, Rental, Affidavit, IPR, Agreement, MOU, Security, Surety, Copyright, Design Patents
• Lawyer consultation booking
• Step-by-step submission guides`.trim();
}

// ──────────────────────────────────────────────────────────────────────────────
// Main POST handler
// ──────────────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const { message, sessionId, lang: clientLang } = await request.json();
  const supabase = getSupabaseClient();

  // Prepare session if Supabase is available (else stateless)
  let session = sessionId as string | null | undefined;
  const userText = String(message ?? "");

  if (supabase) {
    if (!session) {
      const { data: created } = await supabase
        .from("ai_chat_sessions")
        .insert({ user_id: null })
        .select("id")
        .single();
      session = created?.id as string | undefined;
    }
    if (session) {
      await supabase.from("ai_chat_messages").insert({ session_id: session, role: "user", content: userText });
    }
  }

  // Determine language using 3-priority resolution:
  // 1) explicit client dropdown, 2) explicit keyword in message, 3) script detection
  const detectedLang = resolveLanguage(userText, clientLang);
  const explicitKeyword = detectExplicitLang(userText);
  const scriptLang = detectLangFromScript(userText);
  console.log(`[chat/api] lang — client:${clientLang} keyword:${explicitKeyword} script:${scriptLang} → final:${detectedLang}`);

  // Match category for context injection
  const categorySlug = matchCategory(userText);
  const guidanceCtx = buildGuidanceContext(categorySlug);

  // Build context-aware system prompt
  const systemPrompt = buildSystemPrompt(detectedLang, guidanceCtx);

  // Will be filled by Gemini -> Perplexity -> OpenAI -> deterministic text
  let assistantText = "";

  // Build history if we have Supabase and a session; else just current user text
  let history: Array<{ role: "user" | "assistant"; content: string }> = [];
  if (supabase && session) {
    const { data: recent } = await supabase
      .from("ai_chat_messages")
      .select("role,content,created_at")
      .eq("session_id", session)
      .order("created_at", { ascending: true })
      .limit(12);
    history = (recent || []).map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
  } else {
    history = [{ role: "user", content: userText }];
  }

  const messages = [...history];

  const geminiKey = process.env.GEMINI_API_KEY;
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  let providerUsed: "gemini" | "perplexity" | "openai" | "none" = "none";
  let modelUsed: string | null = null;

  let geminiError = "";
  // Models confirmed available on Google AI Studio keys (checked via /v1beta/models)
  // Order: lite first (higher free quota) → flash → latest alias
  const GEMINI_MODELS = [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
  ];

  if (geminiKey) {
    let hit429 = false;
    for (const model of GEMINI_MODELS) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiKey,
            },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: messages.map((h) => ({
                role: h.role === "user" ? "user" : "model",
                parts: [{ text: h.content }],
              })),
              generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
              safetySettings: [],
            }),
          }
        );

        if (!res.ok) {
          const errBody = await res.text().catch(() => "");
          geminiError = `${model}: HTTP ${res.status}`;
          if (res.status === 429) {
            hit429 = true;
            console.error(`[chat/api] Gemini 429 on ${model} — rate limited`);
            // Small pause before trying next model
            await new Promise((r) => setTimeout(r, 1500));
          } else {
            console.error(`[chat/api] Gemini error on ${model}: HTTP ${res.status} — ${errBody.slice(0, 120)}`);
          }
          continue; // always try next model
        }

        const g = await res.json();
        const text = g?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (typeof text === "string" && text.length > 0) {
          assistantText = text;
          providerUsed = "gemini";
          modelUsed = model;
          hit429 = false;
          break;
        }
        geminiError = `${model}: empty response`;
      } catch (e: unknown) {
        geminiError = `${model}: ${e instanceof Error ? e.message : String(e)}`;
        console.error("[chat/api] Gemini fetch error:", geminiError);
      }
    }

    // If all models returned 429, set a clear message
    if (!assistantText && hit429) {
      geminiError = "429: rate_limit_exceeded";
    }
  }

  // Fallback to Perplexity
  if (!assistantText && perplexityKey) {
    try {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${perplexityKey}`,
        },
        body: JSON.stringify({
          model: "sonar-small-online",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 512,
        }),
      });
      const data = await res.json();
      assistantText = data?.choices?.[0]?.message?.content ?? "";
      if (assistantText) { providerUsed = "perplexity"; modelUsed = "sonar-small-online"; }
    } catch {
      assistantText = assistantText || "";
    }
  }

  // Fallback to OpenAI
  if (!assistantText && openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 512,
        }),
      });
      const data = await res.json();
      assistantText = data?.choices?.[0]?.message?.content ?? "";
      if (assistantText) { providerUsed = "openai"; modelUsed = "gpt-4o-mini"; }
    } catch {
      assistantText = assistantText || "";
    }
  }

  // Final deterministic fallback
  if (!assistantText) {
    if (geminiKey && geminiError) {
      console.error("[chat/api] All Gemini models failed. Last error:", geminiError);
      if (geminiError.includes("429")) {
        assistantText = "⚠️ The AI service is temporarily rate-limited (free tier allows ~15 requests/minute).\n\nPlease wait about 60 seconds and try again. Your message will be answered with full AI once the limit resets.\n\nTip: Avoid sending too many messages too quickly.";
      } else {
        assistantText = "⚠️ Unable to reach the AI service right now (server error). Please try again in a moment.\n\nIf this keeps happening, check that your GEMINI_API_KEY in .env.local is valid and restart the server.";
      }
    } else {
      assistantText = "Namaste! I'm VidhiSahayak. To help you, please tell me:\n\n• What document or legal topic do you need? (e.g., rental agreement, affidavit, RTI, property rights)\n• Which state are you in?\n\nAdd your GEMINI_API_KEY in .env.local for full AI responses.";
    }
  }

  // Store assistant reply
  if (supabase && session) {
    await supabase.from("ai_chat_messages").insert({ session_id: session, role: "assistant", content: assistantText });
  }

  return NextResponse.json({
    reply: assistantText,
    sessionId: session ?? null,
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
}
