"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { resolveLanguage, LANG_OPTIONS } from "@/lib/lang-utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    role: "user" | "assistant";
    content: string;
    lang?: string;
}

type Recognition = {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    continuous: boolean;
    start: () => void;
    stop: () => void;
    onresult: (e: { resultIndex: number; results: Array<{ 0: { transcript: string }; isFinal: boolean }> }) => void;
    onend: () => void;
    onerror: () => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const VOICE_ON = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";


const WELCOME_MESSAGES: Record<string, string> = {
    "en-IN": "Namaste! I'm VidhiSahayak — your legal assistant. Ask me about laws, documents, rights, or procedures in any Indian language.",
    "hi-IN": "नमस्ते! मैं विधि सहायक हूँ। कानून, दस्तावेज़, या अधिकारों के बारे में हिंदी में पूछें।",
    "te-IN": "నమస్కారం! నేను విధి సహాయక్. చట్టాలు, పత్రాలు, లేదా హక్కుల గురించి తెలుగులో అడగండి.",
    "ta-IN": "வணக்கம்! நான் விதி சஹாயக். சட்டங்கள், ஆவணங்கள் பற்றி தமிழில் கேளுங்கள்.",
    "bn-IN": "নমস্কার! আমি বিধি সহায়ক। আইন, নথি, বা অধিকার সম্পর্কে বাংলায় জিজ্ঞেস করুন।",
    "ml-IN": "നമസ്കാരം! ഞാൻ വിധി സഹായക്. നിയമങ്ങൾ, രേഖകൾ, അവകാശങ്ങൾ എന്നിവ മലയാളത്തിൽ ചോദിക്കൂ.",
    "kn-IN": "ನಮಸ್ಕಾರ! ನಾನು ವಿಧಿ ಸಹಾಯಕ. ಕಾನೂನು, ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿರಿ.",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIChatWidget() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState("auto");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [listening, setListening] = useState(false);
    const [interim, setInterim] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [unread, setUnread] = useState(0);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<Recognition | null>(null);

    // Cancel TTS on route change
    useEffect(() => {
        if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    }, [pathname]);

    // Initialize welcome message based on language
    useEffect(() => {
        const welcome = WELCOME_MESSAGES[lang !== "auto" ? lang : "en-IN"] ?? WELCOME_MESSAGES["en-IN"];
        setMessages([{ role: "assistant", content: welcome, lang: lang !== "auto" ? lang : "en-IN" }]);
    }, [lang]);

    // Auto-scroll
    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    // Focus input on open
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 100);
    }, [open]);

    // Count unread when closed
    useEffect(() => {
        if (!open && messages.length > 1) {
            setUnread((u) => u + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    const resolvedLang = useCallback((text: string) => {
        return resolveLanguage(text, lang);
    }, [lang]);

    // ── TTS ──────────────────────────────────────────────────────────────────
    const speak = useCallback((text: string, targetLang?: string) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        const tLang = targetLang ?? "en-IN";
        const doSpeak = () => {
            const voices = window.speechSynthesis.getVoices();
            const base = tLang.split("-")[0];
            const voice =
                voices.find((v) => v.lang === tLang) ||
                voices.find((v) => v.lang.startsWith(base)) ||
                null;
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
    }, []);

    // ── Send message ─────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (textOverride?: string) => {
        const text = (textOverride ?? input).trim();
        if (!text || loading) return;
        setInput("");
        setInterim("");
        const userLang = resolvedLang(text);
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
            const reply = String(data.reply ?? "Sorry, something went wrong.");
            const replyLang = data.detectedLang ?? userLang;
            setMessages((m) => [...m, { role: "assistant", content: reply, lang: replyLang }]);
            speak(reply, replyLang);
        } catch {
            setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong.", lang: "en-IN" }]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, sessionId, resolvedLang, speak]);

    // ── Voice recognition ────────────────────────────────────────────────────
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
                setInput(finalText);
                sendMessage(finalText.trim());
            }
        };
        r.onend = () => setListening(false);
        r.onerror = () => setListening(false);
        recognitionRef.current = r;
        try { r.start(); } catch { }
        return () => { try { r.stop(); } catch { } };
    }, [listening, lang, sendMessage]);

    function toggleMic() {
        if (!VOICE_ON) return;
        if (listening) {
            try { recognitionRef.current?.stop(); } catch { }
            setListening(false);
        } else {
            setListening(true);
        }
    }

    function stopSpeaking() {
        try { window.speechSynthesis.cancel(); } catch { }
        setSpeaking(false);
    }

    function handleOpen() {
        setOpen(true);
        setUnread(0);
    }

    // Don't show on /chat page to avoid duplication
    if (pathname === "/chat") return null;

    return (
        <>
            {/* ── Floating Trigger ─────────────────────────────────────────────── */}
            {!open && (
                <button
                    id="ai-chat-widget-trigger"
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl ring-2 ring-indigo-400/30 transition hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
                    aria-label="Open AI Legal Assistant"
                    title="Ask VidhiSahayak"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {unread > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {unread > 9 ? "9+" : unread}
                        </span>
                    )}
                </button>
            )}

            {/* ── Chat Panel ───────────────────────────────────────────────────── */}
            {open && (
                <div
                    id="ai-chat-widget-panel"
                    className="fixed bottom-0 right-0 z-50 flex flex-col overflow-hidden rounded-t-2xl border border-zinc-200/60 bg-white shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-900 sm:bottom-6 sm:right-6 sm:rounded-2xl"
                    style={{ width: "min(420px, 100vw)", height: "min(600px, 100dvh)" }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">⚖️</div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm leading-tight">VidhiSahayak AI</p>
                            <p className="text-indigo-200 text-[11px] leading-tight">
                                {speaking ? "Speaking…" : loading ? "Thinking…" : "Legal Assistant · Any Indian Language"}
                            </p>
                        </div>
                        {/* Language selector */}
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="rounded-md bg-white/20 px-2 py-1 text-[11px] font-medium text-white outline-none cursor-pointer"
                            aria-label="Select language"
                        >
                            {LANG_OPTIONS.map((o) => (
                                <option key={o.code} value={o.code} className="text-zinc-900">
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {m.role === "assistant" && (
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm dark:bg-indigo-950">
                                        ⚖️
                                    </div>
                                )}
                                <div
                                    className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${m.role === "user"
                                        ? "bg-indigo-600 text-white rounded-br-sm"
                                        : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm"
                                        }`}
                                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start gap-2">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm dark:bg-indigo-950">⚖️</div>
                                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
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
                        {interim && (
                            <div className="flex justify-end">
                                <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-indigo-500/50 px-3 py-2 text-sm italic text-white">
                                    {interim}…
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input area */}
                    <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
                        {speaking && (
                            <div className="mb-2 flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-1.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                                    Speaking in {LANG_OPTIONS.find((o) => o.code === lang)?.label ?? "your language"}…
                                </span>
                                <button onClick={stopSpeaking} className="font-medium underline underline-offset-2 hover:opacity-75">
                                    Stop
                                </button>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            {VOICE_ON && (
                                <button
                                    onClick={toggleMic}
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base transition ${listening
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                        }`}
                                    aria-pressed={listening}
                                    aria-label={listening ? "Stop listening" : "Start voice input"}
                                    title={listening ? "Stop" : "Speak"}
                                >
                                    🎤
                                </button>
                            )}
                            <input
                                ref={inputRef}
                                id="ai-chat-widget-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder="Type in any Indian language…"
                                className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                                disabled={loading}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={loading || !input.trim()}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40"
                                aria-label="Send message"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-1.5 text-center text-[10px] text-zinc-400 dark:text-zinc-600">
                            General legal information only — not a substitute for professional legal advice
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
