"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { resolveLanguage, LANG_OPTIONS } from "@/lib/lang-utils";

// ─── Constants ────────────────────────────────────────────────────────────────
const VOICE_ON = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";


const QUICK_PROMPTS = [
  { label: "Rent Agreement", text: "How do I create a rent agreement?" },
  { label: "Property Rights", text: "What are my property rights as a tenant?" },
  { label: "RTI Application", text: "How to file an RTI application?" },
  { label: "FIR Filing", text: "How do I file an FIR?" },
  { label: "Affidavit", text: "What is an affidavit and how to get one notarized?" },
  { label: "Consumer Rights", text: "What are my rights under Consumer Protection Act?" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  lang?: string;
  category?: string | null;
}

type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: (e: { resultIndex: number; results: Array<{ 0: { transcript: string }; isFinal: boolean }> }) => void;
  onend: () => void;
  onerror: () => void;
};


// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! 🙏 I'm VidhiSahayak, your AI legal assistant.\n\nI can help you with:\n• Understanding Indian laws (IPC, CrPC, RTI, RERA…)\n• Drafting documents (rental agreements, affidavits, MOUs…)\n• Legal procedures and your rights\n\nAsk me anything in English, Hindi, Telugu, Tamil, Bengali, or any other Indian language!",
      lang: "en-IN",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [lang, setLang] = useState("auto");
  const [speakBack, setSpeakBack] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef<Recognition | null>(null);
  const autoSentRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // TTS
  const speak = useCallback((text: string, targetLang?: string) => {
    if (!speakBack || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const tLang = targetLang ?? "en-IN";
    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const base = tLang.split("-")[0];
      const voice = voices.find((v) => v.lang === tLang) || voices.find((v) => v.lang.startsWith(base)) || null;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = voice?.lang ?? tLang;
      if (voice) utter.voice = voice;
      utter.rate = 0.95;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      const handler = () => { doSpeak(); window.speechSynthesis.removeEventListener("voiceschanged", handler); };
      window.speechSynthesis.addEventListener("voiceschanged", handler);
      window.speechSynthesis.getVoices();
    }
  }, [speakBack]);

  // Send message
  const onSend = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setInput("");
    setInterim("");
    // Use 3-priority resolution: dropdown > keyword in message > script
    const userLang = resolveLanguage(text, lang);
    setMessages((m) => [...m, { role: "user", content: text, lang: userLang }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId, lang: userLang }),
      });
      const data = await res.json();
      if (data.sessionId && !sessionId) setSessionId(data.sessionId);
      const reply = String(data.reply ?? "(no reply)");
      const replyLang = data.detectedLang ?? userLang;
      setMessages((m) => [...m, {
        role: "assistant",
        content: reply,
        lang: replyLang,
        category: data.categoryMatched ?? null,
      }]);
      speak(reply, replyLang);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong. Please try again.", lang: "en-IN" }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId, lang, speak]);

  // Voice recognition
  useEffect(() => {
    if (!VOICE_ON || !listening) return;
    const SR = window as unknown as {
      webkitSpeechRecognition?: new () => Recognition;
      SpeechRecognition?: new () => Recognition;
    };
    const Ctor = SR.webkitSpeechRecognition ?? SR.SpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = lang !== "auto" ? lang : (navigator.language || "en-IN");
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = (e) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else setInterim(t);
      }
      if (finalText) {
        setInterim("");
        onSend(finalText.trim());
      }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    try { r.start(); } catch { }
    return () => { try { r.stop(); } catch { } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, lang]);

  function toggleMic() {
    if (!VOICE_ON) return;
    if (listening) {
      try { recognitionRef.current?.stop(); } catch { }
      setListening(false);
    } else {
      const SR = window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown };
      if (!SR.webkitSpeechRecognition && !SR.SpeechRecognition) {
        alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
        return;
      }
      setListening(true);
    }
  }

  // Auto-send from URL params (voice search entry)
  useEffect(() => {
    const q = searchParams.get("q");
    const l = searchParams.get("lang");
    const sp = searchParams.get("speak");
    if (l) setLang(l);
    if (sp === "1") setSpeakBack(true);
    if (q && !autoSentRef.current) {
      autoSentRef.current = true;
      onSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function clearChat() {
    setMessages([{
      role: "assistant",
      content: "Chat cleared. How can I help you with Indian legal matters?",
      lang: "en-IN",
    }]);
    setSessionId(null);
    window.speechSynthesis?.cancel();
  }

  return (
    <div className="flex h-[calc(100dvh-56px)] flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚖️</span>
          <div>
            <h1 className="text-sm font-semibold leading-tight">VidhiSahayak AI</h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Indian Legal Assistant · Any Language</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-md border bg-transparent px-2 py-1 text-xs outline-none dark:border-zinc-700"
            aria-label="Select language"
          >
            {LANG_OPTIONS.map((o) => (
              <option key={o.code} value={o.code}>{o.label}</option>
            ))}
          </select>
          {/* Speak toggle */}
          <label className="flex cursor-pointer items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={speakBack}
              onChange={(e) => setSpeakBack(e.target.checked)}
              className="h-3.5 w-3.5"
            />
            🔊
          </label>
          {/* Clear chat */}
          <button
            onClick={clearChat}
            className="rounded-md border px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            title="Clear chat"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ── Quick prompts ──────────────────────────────────────────────────── */}
      {messages.length <= 1 && (
        <div className="border-b bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="mb-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">Quick questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => onSend(p.text)}
                className="rounded-full border bg-zinc-50 px-3 py-1 text-xs text-zinc-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Messages ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm shadow">
                ⚖️
              </div>
            )}
            <div className="max-w-[80%] space-y-1">
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${m.role === "user"
                  ? "rounded-br-sm bg-indigo-600 text-white"
                  : "rounded-bl-sm bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  }`}
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {m.content}
              </div>
              {m.role === "assistant" && m.category && (
                <p className="px-1 text-[10px] text-zinc-400">
                  📂 Category matched: {m.category}
                </p>
              )}
            </div>
            {m.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm dark:bg-zinc-700">
                👤
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm shadow">
              ⚖️
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm dark:bg-zinc-800">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="inline-block h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Interim transcript */}
        {interim && (
          <div className="flex justify-end gap-3">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-indigo-400/50 px-4 py-2.5 text-sm italic text-white">
              {interim}…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Speaking indicator ─────────────────────────────────────────────── */}
      {speaking && (
        <div className="flex items-center justify-between bg-indigo-50 px-4 py-2 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Speaking — AI is reading the response aloud
          </span>
          <button
            onClick={() => { window.speechSynthesis?.cancel(); setSpeaking(false); }}
            className="font-medium underline underline-offset-2"
          >
            Stop
          </button>
        </div>
      )}

      {/* ── Input bar ──────────────────────────────────────────────────────── */}
      <div className="border-t bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-end gap-2">
          {VOICE_ON && (
            <button
              onClick={toggleMic}
              className={`mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition ${listening
                ? "animate-pulse bg-red-500 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              aria-pressed={listening}
              aria-label={listening ? "Stop voice input" : "Start voice input"}
            >
              🎤
            </button>
          )}
          <textarea
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder={`Type in any Indian language… (Enter to send, Shift+Enter for new line)`}
            rows={1}
            className="flex-1 resize-none rounded-xl border bg-zinc-50 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            style={{ maxHeight: "120px", overflowY: "auto" }}
            disabled={loading}
          />
          <button
            onClick={() => onSend()}
            disabled={loading || !input.trim()}
            className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40"
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-center text-[10px] text-zinc-400 dark:text-zinc-600">
          General legal information only · Not a substitute for professional legal advice
        </p>
      </div>
    </div>
  );
}
