"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const VOICE_ON = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! Ask your question in any Indian language. I can help with guidance, documents, and consultations." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("auto");
  const [speakBack, setSpeakBack] = useState(true);
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
  const recognitionRef = useRef<Recognition | null>(null);
  const autoSentRef = useRef(false);
  const searchParams = useSearchParams();

  function detectLangFromText(text: string): string {
    // Very lightweight script-based detection for Indian languages
    // Devanagari: \u0900-\u097F (Hindi/Marathi)
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
    // Telugu: \u0C00-\u0C7F
    if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";
    // Tamil: \u0B80-\u0BFF
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";
    // Bengali: \u0980-\u09FF
    if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";
    // Malayalam: \u0D00-\u0D7F
    if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";
    // Kannada: \u0C80-\u0CFF
    if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";
    // Gujarati: \u0A80-\u0AFF
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";
    // Gurmukhi (Punjabi): \u0A00-\u0A7F
    if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";
    // Arabic script (Urdu): \u0600-\u06FF
    if (/[\u0600-\u06FF]/.test(text)) return "ur-IN";
    // Default English (India)
    return "en-IN";
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    const speakLang = lang === "auto" ? detectLangFromText(text) : lang;
    utter.lang = speakLang;
    const voices = window.speechSynthesis.getVoices();
    const base = speakLang.split("-")[0];
    const preferred = voices.find((v) => v.lang === speakLang) || voices.find((v) => v.lang.startsWith(base)) || null;
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  async function onSend(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      if (data.sessionId && !sessionId) setSessionId(data.sessionId);
      const reply = data.reply ?? "(no reply)";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (speakBack && reply) speak(reply);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  function setupRecognition() {
    const SR = window as unknown as {
      webkitSpeechRecognition?: new () => Recognition;
      SpeechRecognition?: new () => Recognition;
    };
    const Ctor = SR.webkitSpeechRecognition ?? SR.SpeechRecognition;
    if (!Ctor) return null;
    const r = new Ctor();
    r.lang = lang === "auto" ? (typeof navigator !== "undefined" ? navigator.language || "en-IN" : "en-IN") : lang;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = (e: { resultIndex: number; results: Array<{ 0: { transcript: string }; isFinal: boolean }> }) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else setInput(t);
      }
      if (finalText) {
        setInput(finalText);
        onSend();
      }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    return r;
  }

  useEffect(() => {
    if (!VOICE_ON || !listening) return;
    const r = setupRecognition();
    recognitionRef.current = r;
    if (r) r.start();
    return () => {
      try {
        if (r) r.stop();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, lang]);

  function toggleMic() {
    if (listening) {
      try { recognitionRef.current && recognitionRef.current.stop(); } catch {}
      setListening(false);
      return;
    }
    const SR = window as unknown as {
      webkitSpeechRecognition?: new () => Recognition;
      SpeechRecognition?: new () => Recognition;
    };
    const Ctor = SR.webkitSpeechRecognition ?? SR.SpeechRecognition;
    if (!Ctor) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    setListening(true);
  }

  // Auto-consume q/lang/speak from URL (voice search entry)
  useEffect(() => {
    const q = searchParams.get("q");
    const l = searchParams.get("lang");
    const sp = searchParams.get("speak");
    if (l) setLang(l);
    if (sp === "1") setSpeakBack(true);
    if (q && !autoSentRef.current) {
      autoSentRef.current = true;
      setInput(q);
      onSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">AI Chat</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Ask about categories, guidance, documents, or consultations. Tap the mic and speak, or type your question.</p>

      <div className="mt-6 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div className={
                m.role === "user"
                  ? "inline-block rounded-lg bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black"
                  : "inline-block rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
              }>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
            placeholder="Type your question..."
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
          />
          {/* Speak reply is enabled by default; no toggle shown for simpler UX */}
          {VOICE_ON && (
            <button
              onClick={toggleMic}
              className={
                listening
                  ? "rounded-md border px-3 py-2 text-sm bg-red-600 text-white dark:border-zinc-800"
                  : "rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              }
              aria-pressed={listening}
            >
              {listening ? "Stop" : "Mic"}
            </button>
          )}
          <button
            onClick={() => onSend()}
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
