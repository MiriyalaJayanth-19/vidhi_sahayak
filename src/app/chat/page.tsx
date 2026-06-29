"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resolveLanguage, LANG_OPTIONS } from "@/lib/lang-utils";
import { AppShell } from "@/components/app-shell";

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

// ─── Chat Content (uses useSearchParams) ──────────────────────────────────────
function ChatPageContent() {
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
    <AppShell active="chat" title="AI Counsel" desc="General legal information · cite-checked · any Indian language">
      <div className="flex h-full bg-white">
        {/* ── Conversation column ──────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* sub-header */}
          <div className="flex flex-shrink-0 flex-wrap items-center gap-2 border-b border-[#EEF0F3] bg-[#FCFCFD] px-4 py-2.5">
            <div className="inline-flex items-center gap-[7px] rounded-[8px] border border-[#E5E8EC] bg-white px-2.5 py-[5px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              <span className="text-[12.5px] font-semibold text-[#0E1116]">Gemini 1.5 Pro</span>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="cursor-pointer rounded-[8px] border border-[#E5E8EC] bg-white px-2.5 py-1.5 text-[12.5px] text-[#1B2027] outline-none"
              aria-label="Select language"
            >
              {LANG_OPTIONS.map((o) => (
                <option key={o.code} value={o.code}>{o.label}</option>
              ))}
            </select>
            <button
              type="button"
              role="switch"
              aria-checked={speakBack}
              onClick={() => setSpeakBack((v) => !v)}
              className="ml-0.5 inline-flex items-center gap-1.5 text-[12.5px] text-[#5A6472]"
            >
              <span className={`relative inline-block h-[18px] w-[30px] rounded-full transition-colors ${speakBack ? "bg-[#1F6FEB]" : "bg-[#CBD2DC]"}`}>
                <span className={`absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white transition-all ${speakBack ? "left-[14px]" : "left-0.5"}`} />
              </span>
              Read aloud
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden rounded-[6px] border border-[#EAECEF] bg-[#F4F5F7] px-2 py-[3px] font-mono text-[10.5px] text-[#9AA2AF] sm:inline">Saved to history</span>
              <button
                onClick={clearChat}
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#E5E8EC] bg-white px-2.5 py-1.5 text-[12.5px] font-medium text-[#5A6472] transition hover:bg-[#F7F8FA] hover:text-[#0E1116]"
                title="Start a new chat"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                New
              </button>
            </div>
          </div>

          {/* messages */}
          <div className="vs-scroll min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-[768px] flex-col gap-[22px] px-6 pb-2 pt-[26px]">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="max-w-[80%] self-end whitespace-pre-wrap break-words rounded-[14px_14px_4px_14px] bg-[#0E1116] px-[15px] py-[11px] text-[14px] leading-[1.6] text-white">
                    {m.content}
                  </div>
                ) : (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[8px] border border-[#DCE7FD] bg-[#ECF2FE]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1856C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="whitespace-pre-wrap break-words rounded-[4px_14px_14px_14px] border border-[#EEF0F3] bg-[#F7F8FA] px-[15px] py-[13px] text-[14px] leading-[1.65] text-[#1B2027]">
                        {m.content}
                      </div>
                      {m.category && (
                        <div className="mt-2.5 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#8B93A1]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 19-9-15-9 15Z" /></svg>
                            {m.category}
                          </span>
                          <button onClick={() => navigator.clipboard?.writeText(m.content)} className="inline-flex items-center gap-1.5 text-[11.5px] text-[#8B93A1] transition-colors hover:text-[#1856C9]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                            Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-3">
                  <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[8px] border border-[#DCE7FD] bg-[#ECF2FE]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1856C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                  </div>
                  <div className="inline-flex items-center gap-[5px] rounded-[4px_14px_14px_14px] border border-[#EEF0F3] bg-[#F7F8FA] px-4 py-3.5">
                    {[0, 200, 400].map((delay) => (
                      <span key={delay} className="h-[7px] w-[7px] rounded-full bg-[#9AA2AF]" style={{ animation: `vsBlink 1.2s ${delay}ms infinite` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Interim transcript */}
              {interim && (
                <div className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-[#ECF2FE] px-[15px] py-[11px] text-[14px] italic text-[#1856C9]">
                  {interim}…
                </div>
              )}

              {/* Empty state */}
              {messages.length <= 1 && (
                <div className="pt-1.5">
                  <div className="mb-[11px] font-mono text-[10.5px] uppercase tracking-[.08em] text-[#A6ADB8]">Try asking</div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => onSend(p.text)}
                        className="flex items-center justify-between gap-2.5 rounded-[11px] border border-[#E8EAEE] bg-white px-[15px] py-[13px] text-left transition hover:border-[#C9CFD8] hover:bg-[#FCFCFD] hover:shadow-[0_2px_8px_rgba(14,17,22,.04)]"
                      >
                        <span className="text-[13.5px] font-medium text-[#1B2027]">{p.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2C8D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Speaking indicator */}
          {speaking && (
            <div className="flex flex-shrink-0 items-center justify-between border-t border-[#DCE7FD] bg-[#ECF2FE] px-4 py-2 text-[12.5px] text-[#1856C9]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#1F6FEB]" />
                Speaking — reading the response aloud
              </span>
              <button onClick={() => { window.speechSynthesis?.cancel(); setSpeaking(false); }} className="font-medium text-[#1856C9] underline underline-offset-2">Stop</button>
            </div>
          )}

          {/* composer */}
          <div className="flex-shrink-0 border-t border-[#EEF0F3] bg-white px-6 pb-4 pt-3.5">
            <div className="mx-auto max-w-[768px]">
              <div className="flex items-end gap-2.5 rounded-[13px] border border-[#E1E4E9] bg-white px-3.5 py-2.5 shadow-[0_1px_3px_rgba(14,17,22,.05)] focus-within:border-[#1F6FEB] focus-within:shadow-[0_0_0_3px_rgba(31,111,235,.13)]">
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
                  placeholder="Ask in any Indian language… (Enter to send, Shift+Enter for newline)"
                  rows={1}
                  className="flex-1 resize-none border-none bg-transparent py-1 text-[14px] leading-[1.5] text-[#0E1116] outline-none placeholder:text-[#9AA2AF]"
                  style={{ maxHeight: "120px", overflowY: "auto" }}
                  disabled={loading}
                />
                {VOICE_ON && (
                  <button
                    onClick={toggleMic}
                    className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border transition ${listening ? "animate-pulse border-transparent bg-[#DC2626] text-white" : "border-[#EAECEF] bg-[#F4F5F7] text-[#5A6472] hover:border-[#DCE7FD] hover:bg-[#ECF2FE]"}`}
                    aria-pressed={listening}
                    aria-label={listening ? "Stop voice input" : "Start voice input"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                  </button>
                )}
                <button
                  onClick={() => onSend()}
                  disabled={loading || !input.trim()}
                  className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-[#0E1116] text-white transition hover:bg-[#23282F] disabled:opacity-40"
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></svg>
                </button>
              </div>
              <p className="mt-2.5 text-center text-[11px] text-[#A6ADB8]">
                General legal information only · Not a substitute for advice from a licensed advocate
              </p>
            </div>
          </div>
        </div>

        {/* ── Context rail ─────────────────────────────────────────────────── */}
        <aside className="vs-scroll hidden w-[304px] flex-shrink-0 flex-col overflow-y-auto border-l border-[#E8EAEE] bg-[#FBFBFC] lg:flex">
          <div className="px-[18px] pt-[18px]">
            <div className="font-mono text-[10.5px] uppercase tracking-[.1em] text-[#A6ADB8]">Suggested next steps</div>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/documents/new" className="flex items-center gap-[11px] rounded-[11px] border border-[#E8EAEE] bg-white p-3 transition hover:border-[#C9CFD8] hover:shadow-[0_2px_8px_rgba(14,17,22,.05)]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] border border-[#D2EEDD] bg-[#E9F7EF]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16794A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></svg></div>
                <div className="min-w-0"><div className="text-[13px] font-semibold text-[#0E1116]">Draft a document</div><div className="text-[11.5px] text-[#8B93A1]">Auto-filled from this chat</div></div>
              </Link>
              <Link href="/consultation" className="flex items-center gap-[11px] rounded-[11px] border border-[#E8EAEE] bg-white p-3 transition hover:border-[#C9CFD8] hover:shadow-[0_2px_8px_rgba(14,17,22,.05)]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] border border-[#DCE7FD] bg-[#ECF2FE]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1856C9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg></div>
                <div className="min-w-0"><div className="text-[13px] font-semibold text-[#0E1116]">Talk to a lawyer</div><div className="text-[11.5px] text-[#8B93A1]">Verified advocates · ₹31/min</div></div>
              </Link>
            </div>
          </div>

          <div className="p-[18px]">
            <div className="font-mono text-[10.5px] uppercase tracking-[.1em] text-[#A6ADB8]">Referenced law</div>
            <div className="mt-3 flex flex-col gap-2">
              <div className="rounded-[10px] border border-[#E8EAEE] bg-white px-[13px] py-[11px]">
                <div className="font-mono text-[11.5px] font-semibold text-[#1856C9]">Model Tenancy Act, 2021 · §16</div>
                <div className="mt-1 text-[12px] leading-[1.5] text-[#5A6472]">Refund of security deposit within one month of vacating the premises.</div>
              </div>
              <div className="rounded-[10px] border border-[#E8EAEE] bg-white px-[13px] py-[11px]">
                <div className="font-mono text-[11.5px] font-semibold text-[#1856C9]">Consumer Protection Act, 2019</div>
                <div className="mt-1 text-[12px] leading-[1.5] text-[#5A6472]">Complaint for deficiency of service before the District Commission.</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

// ─── Default Export with Suspense ─────────────────────────────────────────────
export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#F6F7F9]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#1F6FEB] border-t-transparent" />
          <p className="text-sm text-[#5A6472]">Loading chat…</p>
        </div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}
