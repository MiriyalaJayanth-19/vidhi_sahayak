"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const VOICE_ON = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── All supported Indian languages ──────────────────────────────────────────
const LANG_OPTIONS = [
  { code: "auto", label: "Auto" },
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "हिंदी" },
  { code: "te-IN", label: "తెలుగు" },
  { code: "ta-IN", label: "தமிழ்" },
  { code: "bn-IN", label: "বাংলা" },
  { code: "ml-IN", label: "മലയാളം" },
  { code: "kn-IN", label: "ಕನ್ನಡ" },
  { code: "gu-IN", label: "ગુજરાતી" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ" },
  { code: "mr-IN", label: "मराठी" },
  { code: "ur-IN", label: "اردو" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function detectLangFromText(text: string): string {
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

function getVoiceForLang(lang: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const base = lang.split("-")[0];
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(base)) ||
    null
  );
}

function labelForLang(lang: string): string {
  return LANG_OPTIONS.find((o) => o.code === lang)?.label ?? lang;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function InlineVoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [lastReply, setLastReply] = useState("");
  const [lastInputLang, setLastInputLang] = useState<string>("en-IN");
  const [usedVoice, setUsedVoice] = useState<string>("");
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [manualLang, setManualLang] = useState<string>("auto");
  const recognitionRef = useRef<Recognition | null>(null);
  const sessionRef = useRef<string | null>(null);
  const pathname = usePathname();

  // Cancel TTS on route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  }, [pathname]);

  function onPause() {
    try { window.speechSynthesis.pause(); setSpeaking(false); } catch { }
  }
  function onResume() {
    try { window.speechSynthesis.resume(); setSpeaking(true); } catch { }
  }
  function onStop() {
    try { window.speechSynthesis.cancel(); setSpeaking(false); } catch { }
  }

  // Browser TTS
  const speak = useCallback(async (text: string, preferredLang?: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const targetLang = preferredLang || (manualLang !== "auto" ? manualLang : detectLangFromText(text));

    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = getVoiceForLang(targetLang, voices);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = voice?.lang || targetLang;
      if (voice) utter.voice = voice;
      utter.rate = 0.95;
      utter.pitch = 1.0;
      setUsedVoice(`${voice ? voice.name : "Default"} (${utter.lang})`);
      window.speechSynthesis.cancel();
      utter.onend = () => setSpeaking(false);
      utter.onstart = () => setSpeaking(true);
      window.speechSynthesis.speak(utter);
    };

    const existing = window.speechSynthesis.getVoices();
    if (existing && existing.length > 0) {
      doSpeak();
    } else {
      const handler = () => {
        doSpeak();
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
      };
      window.speechSynthesis.addEventListener("voiceschanged", handler);
      window.speechSynthesis.getVoices();
    }
  }, [manualLang]);

  // Send to AI
  const sendToAI = useCallback(async (text: string) => {
    try {
      const chosen = manualLang !== "auto" ? manualLang : lastInputLang;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionRef.current, lang: chosen }),
      });
      const data = await res.json();
      if (data.sessionId && !sessionRef.current) sessionRef.current = data.sessionId;
      const reply = String(data.reply ?? "");
      const replyLang = data.detectedLang ?? chosen;
      setLastReply(reply);
      if (reply) speak(reply, replyLang);
    } catch {
      setLastReply("Sorry, something went wrong.");
    }
  }, [manualLang, lastInputLang, speak]);

  // Speech recognition
  useEffect(() => {
    if (!VOICE_ON || !listening) return;
    const SR = window as unknown as {
      webkitSpeechRecognition?: new () => Recognition;
      SpeechRecognition?: new () => Recognition;
    };
    const Ctor = SR.webkitSpeechRecognition ?? SR.SpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = manualLang !== "auto" ? manualLang : (typeof navigator !== "undefined" ? navigator.language || "en-IN" : "en-IN");
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
        const detected = detectLangFromText(finalText);
        const chosen = manualLang !== "auto" ? manualLang : detected;
        setLastInputLang(chosen);
        sendToAI(finalText.trim());
      }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    try { r.start(); } catch { }
    return () => { try { r.stop(); } catch { } };
  }, [listening, sendToAI, manualLang]);

  function toggleMic() {
    if (!VOICE_ON) return;
    if (listening) {
      try { recognitionRef.current && recognitionRef.current.stop(); } catch { }
      setListening(false);
    } else {
      setListening(true);
    }
  }

  if (!VOICE_ON) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      {/* Mic button */}
      <button
        onClick={toggleMic}
        className={
          listening
            ? "inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-3xl text-white shadow-lg shadow-red-500/40 animate-pulse"
            : "inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-3xl text-white shadow-lg shadow-indigo-500/30 hover:scale-105 transition"
        }
        aria-pressed={listening}
        title="Speak with AI"
      >
        🎤
      </button>

      {/* Status */}
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {listening ? "Listening… speak now" : speaking ? "Speaking…" : "Tap mic and speak in your language"}
      </p>

      {/* Interim transcript */}
      {interim && (
        <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {interim}…
        </div>
      )}

      {/* AI reply */}
      {lastReply && (
        <div className="max-w-xl rounded-xl border bg-white p-4 text-sm leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200" style={{ whiteSpace: "pre-wrap" }}>
          {lastReply}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        {/* Playback controls */}
        <div className="flex items-center gap-1">
          <button onClick={onPause} className="rounded-md border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">⏸ Pause</button>
          <button onClick={onResume} className="rounded-md border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">▶ Play</button>
          <button onClick={onStop} className="rounded-md border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">⏹ Stop</button>
        </div>

        {/* Language selector */}
        <label className="flex items-center gap-1.5 rounded-md border px-2 py-1 dark:border-zinc-700">
          <span>🌐</span>
          <select
            value={manualLang}
            onChange={(e) => setManualLang(e.target.value)}
            className="bg-transparent text-xs outline-none cursor-pointer"
          >
            {LANG_OPTIONS.map((o) => (
              <option key={o.code} value={o.code}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Metadata */}
      <div className="text-[11px] text-zinc-500 dark:text-zinc-500 space-y-0.5">
        <p>Detected language: <span className="font-medium text-zinc-700 dark:text-zinc-300">{labelForLang(manualLang !== "auto" ? manualLang : lastInputLang)}</span></p>
        {usedVoice && <p>Voice: <span className="font-medium text-zinc-700 dark:text-zinc-300">{usedVoice}</span></p>}
      </div>
    </div>
  );
}
