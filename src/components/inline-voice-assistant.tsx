"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const VOICE_ON = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";

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

export default function InlineVoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [lastReply, setLastReply] = useState("");
  const [lastInputLang, setLastInputLang] = useState<string>("en-IN");
  const [usedVoice, setUsedVoice] = useState<string>("");
  const [fastMode, setFastMode] = useState<boolean>(true);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [manualLang, setManualLang] = useState<"auto" | "en-IN" | "hi-IN">("auto");
  const recognitionRef = useRef<Recognition | null>(null);
  const sessionRef = useRef<string | null>(null);
  // no server audio element needed; using browser TTS only
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  }, [pathname]);

  function onPause() {
    try {
      window.speechSynthesis.pause();
      setSpeaking(false);
    } catch {}
  }

  function onResume() {
    try {
      window.speechSynthesis.resume();
      setSpeaking(true);
    } catch {}
  }

  function onStop() {
    try {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } catch {}
  }

  function detectLangFromText(text: string): string {
    // Restrict to Hindi (hi-IN) and English (en-IN) only
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN"; // Devanagari
    return "en-IN";
  }

  function getVoiceForLang(lang: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    // Only match Hindi or English (India)
    if (lang === "hi-IN") {
      return (
        voices.find((v) => v.lang === "hi-IN") ||
        voices.find((v) => /Hindi|हिन्दी/.test(v.name)) ||
        null
      );
    }
    // Default to English (India) then any English
    return voices.find((v) => v.lang === "en-IN") || voices.find((v) => v.lang.startsWith("en")) || null;
  }

  function labelForLang(lang: string): string {
    const map: Record<string, string> = {
      "hi-IN": "Hindi",
      "te-IN": "Telugu",
      "ta-IN": "Tamil",
      "bn-IN": "Bengali",
      "ml-IN": "Malayalam",
      "kn-IN": "Kannada",
      "mr-IN": "Marathi",
      "gu-IN": "Gujarati",
      "pa-IN": "Punjabi",
      "ur-IN": "Urdu",
      "en-IN": "English (India)",
    };
    return map[lang] || lang;
  }

  function codeToName(lang: string): string {
    const map: Record<string, string> = {
      "hi-IN": "Hindi",
      "te-IN": "Telugu",
      "ta-IN": "Tamil",
      "bn-IN": "Bengali",
      "ml-IN": "Malayalam",
      "kn-IN": "Kannada",
      "mr-IN": "Marathi",
      "gu-IN": "Gujarati",
      "pa-IN": "Punjabi",
      "ur-IN": "Urdu",
      "en-IN": "English (India)",
    };
    return map[lang] || lang;
  }

  // removed server TTS; browser SpeechSynthesis is used exclusively

  async function speak(text: string, preferredLang?: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const targetLang = preferredLang || (manualLang !== "auto" ? manualLang : detectLangFromText(text));
    // Always use browser TTS (server TTS disabled)
    const voicesReady = window.speechSynthesis.getVoices();
    if (voicesReady && voicesReady.length > 0) {
      const voice = getVoiceForLang(targetLang, voicesReady);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = voice?.lang || targetLang;
      if (voice) utter.voice = voice;
      utter.rate = 1.0;
      utter.pitch = 1.0;
      setUsedVoice(`${voice ? voice.name : "Default"} (${utter.lang})`);
      window.speechSynthesis.cancel();
      utter.onend = () => setSpeaking(false);
      utter.onstart = () => setSpeaking(true);
      window.speechSynthesis.speak(utter);
      return;
    }
    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = getVoiceForLang(targetLang, voices);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = voice?.lang || targetLang;
      if (voice) utter.voice = voice;
      utter.rate = 1.0;
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
      // Trigger load
      window.speechSynthesis.getVoices();
    }
  }

  const sendToAI = useCallback(async (text: string) => {
    try {
      // Add a directive so the AI replies in the user's detected language using native script
      const chosen = manualLang !== "auto" ? manualLang : lastInputLang;
      const langName = codeToName(chosen);
      const baseDirective = `You are a helpful legal assistant. Reply only in ${langName} using its native script. Be concise (1–3 sentences) and actionable. Do not repeat the user's words verbatim. If the request is unclear, ask one specific clarifying question.`;
      const prompt = `${baseDirective}\n\nUser said: ${text}`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, sessionId: sessionRef.current }),
      });
      const data = await res.json();
      if (data.sessionId && !sessionRef.current) sessionRef.current = data.sessionId;
      let reply = String(data.reply ?? "");
      if (!fastMode) {
        // Robust mode: avoid echoes and normalize into bullet points
        const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
        if (norm(reply) === norm(text)) {
          const retryDirective = `${baseDirective} Provide helpful guidance relevant to the user's intent. Do not translate or echo the input; respond with next steps or an answer.`;
          const retry = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: `${retryDirective}\n\nUser said: ${text}`, sessionId: sessionRef.current }),
          });
          const rData = await retry.json();
          if (rData?.reply) reply = String(rData.reply);
        }
        if (reply) {
          const normalizePrompt = `Rewrite the following as 2–4 short bullet points with clear next steps. Reply only in ${codeToName(lastInputLang)} using its native script. Do NOT echo the user's text.\n\nText:\n${reply}`;
          try {
            const nRes = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: normalizePrompt, sessionId: sessionRef.current }),
            });
            const nData = await nRes.json();
            if (nData?.reply) reply = String(nData.reply);
          } catch {}
        }
      }
      setLastReply(reply);
      if (reply) speak(reply, chosen);
    } catch {
      setLastReply("Sorry, something went wrong.");
    }
  }, [fastMode, lastInputLang, manualLang, speak]);

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
        // detect and store input language from the user's speech
        const detected = detectLangFromText(finalText);
        const chosen = manualLang !== "auto" ? manualLang : detected;
        setLastInputLang(chosen);
        sendToAI(finalText.trim());
      }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    try { r.start(); } catch {}
    return () => {
      try { r.stop(); } catch {}
    };
  }, [listening, sendToAI, manualLang]);

  function toggleMic() {
    if (!VOICE_ON) return;
    if (listening) {
      try { recognitionRef.current && recognitionRef.current.stop(); } catch {}
      setListening(false);
    } else {
      setListening(true);
    }
  }

  if (!VOICE_ON) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <button
        onClick={toggleMic}
        className={
          listening
            ? "inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow"
            : "inline-flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        }
        aria-pressed={listening}
        title="Speak with AI"
      >
        🎤
      </button>
      {interim && <div className="text-xs text-zinc-500">{interim}</div>}
      {lastReply && (
        <div className="max-w-xl rounded-md border bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          {lastReply}
        </div>
      )}
      <div className="text-xs text-zinc-500">
        <div className="mb-2 flex items-center justify-center gap-2">
          <button onClick={onPause} className="rounded border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Pause</button>
          <button onClick={onResume} className="rounded border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Play</button>
          <button onClick={onStop} className="rounded border px-2 py-1 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Stop</button>
          <span className="ml-2 text-[11px] text-zinc-600 dark:text-zinc-400">{speaking ? "Speaking…" : "Idle"}</span>
        </div>
        <div className="mb-1 flex items-center justify-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={fastMode} onChange={(e) => setFastMode(e.target.checked)} />
            Fast mode (lower latency)
          </label>
          <label className="inline-flex items-center gap-2">
            <span>Lang:</span>
            <select value={manualLang} onChange={(e) => setManualLang(e.target.value as any)} className="rounded border bg-transparent px-2 py-1 text-xs dark:border-zinc-800">
              <option value="auto">Auto</option>
              <option value="en-IN">English</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </label>
        </div>
        <div>Detected language: <span className="font-medium text-zinc-700 dark:text-zinc-300">{labelForLang(manualLang !== "auto" ? manualLang : lastInputLang)} ({manualLang !== "auto" ? manualLang : lastInputLang})</span></div>
        <div>Voice used: <span className="font-medium text-zinc-700 dark:text-zinc-300">{usedVoice || "Loading voices..."}</span></div>
        <p className="mt-1">Click mic to speak. The assistant will reply and speak back here.</p>
      </div>
    </div>
  );
}
