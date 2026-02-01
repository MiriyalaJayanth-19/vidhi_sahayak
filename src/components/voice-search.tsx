"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function VoiceSearch() {
  const router = useRouter();
  const [lang, setLang] = useState("en-IN");
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);

  useEffect(() => {
    if (!VOICE_ON || !listening) return;
    // inline setup to avoid missing-deps lint
    const SR = window as unknown as {
      webkitSpeechRecognition?: new () => Recognition;
      SpeechRecognition?: new () => Recognition;
    };
    const Ctor = SR.webkitSpeechRecognition ?? SR.SpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = lang;
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
        const q = finalText.trim();
        const url = new URL("/chat", window.location.origin);
        url.searchParams.set("q", q);
        url.searchParams.set("lang", lang);
        url.searchParams.set("speak", "1");
        router.push(url.toString());
      }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    try { r.start(); } catch {}
    return () => {
      try {
        r.stop();
      } catch {}
    };
  }, [listening, lang, router]);

  function toggleMic() {
    if (!VOICE_ON) return;
    if (listening) {
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
      setListening(false);
      return;
    }
    // do not touch mic APIs until explicitly enabled
    setInterim("");
    setListening(true);
  }

  if (!VOICE_ON) return null;

  return (
    <div className="flex items-center gap-2">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="rounded-md border bg-transparent px-2 py-2 text-sm outline-none dark:border-zinc-800"
      >
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi</option>
      </select>
      <button
        onClick={toggleMic}
        className={
          listening
            ? "inline-flex items-center gap-2 rounded-md border bg-red-600 px-3 py-2 text-sm text-white"
            : "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        }
        aria-pressed={listening}
        title="Voice search"
      >
        <span aria-hidden>🎤</span>
        {listening ? "Listening…" : "Voice"}
      </button>
      {interim && <span className="text-xs text-zinc-500">{interim}</span>}
    </div>
  );
}
