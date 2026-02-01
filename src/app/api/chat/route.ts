import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const { message, sessionId } = await request.json();
  const supabase = getSupabaseClient();

  const placeholder = (msg: string) =>
    `You said: ${msg}. This is a placeholder response. Add GEMINI_API_KEY (preferred), or PERPLEXITY_API_KEY / OPENAI_API_KEY in vidhisahayak-web/.env.local and restart the server.`;

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
      .limit(10);
    history = (recent || []).map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
  } else {
    history = [{ role: "user", content: userText }];
  }
  const systemPrompt =
    "You are VidhiSahayak, a helpful legal assistant for India. Be concise, factual, cite sources when possible, and suggest next steps. Provide general information, not legal advice.";
  const messages = [...history];

  const geminiKey = process.env.GEMINI_API_KEY;
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  let providerUsed: "gemini" | "perplexity" | "openai" | "none" = "none";
  let modelUsed: string | null = null;

  if (geminiKey) {
    try {
      const models = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-1.5-pro-latest",
      ];
      let success = false;
      for (const model of models) {
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
              generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
              safetySettings: [],
            }),
          }
        );
        if (!res.ok) {
          // try next model on 404/403; break on other errors
          if (res.status === 404 || res.status === 403) {
            continue;
          }
          throw new Error(`Gemini HTTP ${res.status}`);
        }
        const g = await res.json();
        const text = g?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (typeof text === "string" && text.length > 0) {
          assistantText = text;
          providerUsed = "gemini";
          modelUsed = model;
          success = true;
          break;
        }
      }
      if (!success) {
        throw new Error("No Gemini model returned content");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      // do nothing, will try fallbacks below
    }
  }

  // Fallback to Perplexity if no assistantText yet and key present
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
          messages,
          max_tokens: 400,
        }),
      });
      const data = await res.json();
      assistantText = data?.choices?.[0]?.message?.content ?? "";
      if (assistantText) { providerUsed = "perplexity"; modelUsed = "sonar-small-online"; }
    } catch {
      assistantText = assistantText || "";
    }
  }

  // Fallback to OpenAI if still empty and key present
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
          messages,
          max_tokens: 400,
        }),
      });
      const data = await res.json();
      assistantText = data?.choices?.[0]?.message?.content ?? "";
    } catch {
      assistantText = assistantText || "";
    }
  }

  if (!assistantText) {
    // Return a concise deterministic response (not a placeholder)
    assistantText = `I heard: "${userText}". Here’s a quick next step: tell me the category or document you need (e.g., rental agreement, affidavit, IPC query), and I’ll guide you with steps and options.`;
  }

  // Insert assistant reply if Supabase is available
  if (supabase && session) {
    await supabase.from("ai_chat_messages").insert({ session_id: session, role: "assistant", content: assistantText });
  }

  return NextResponse.json({
    reply: assistantText,
    sessionId: session ?? null,
    providers: {
      geminiConfigured: Boolean(geminiKey),
      perplexityConfigured: Boolean(perplexityKey),
      openaiConfigured: Boolean(openaiKey),
    },
    providerUsed,
    modelUsed,
  });
}
