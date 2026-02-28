/**
 * Shared language detection utilities for VidhiSahayak.
 * Used on both client (components) and server (API route).
 */

/**
 * Detect language from Unicode script ranges in the text.
 * Works when user types in their native script.
 */
export function detectLangFromScript(text: string): string {
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN";  // Devanagari (Hindi/Marathi)
    if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";  // Telugu
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";  // Tamil
    if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";  // Bengali
    if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";  // Malayalam
    if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";  // Kannada
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";  // Gujarati
    if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";  // Punjabi (Gurmukhi)
    if (/[\u0600-\u06FF]/.test(text)) return "ur-IN";  // Urdu (Arabic script)
    return "en-IN";
}

/**
 * Detect an EXPLICIT language request written in any script, e.g.:
 *   "explain in Telugu", "Hindi mein batao", "Tamil la sollu",
 *   "please reply in Kannada", "gujarati ma samjhao"
 *
 * Takes priority over script detection because the user is explicitly asking
 * for a specific output language even when typing in English/Latin script.
 */
export function detectExplicitLang(text: string): string | null {
    const patterns: Array<[RegExp, string]> = [
        // Telugu — all common forms
        [/\btelugu\b|\btelugu\s*lo\b|\btelugu\s*లో\b|తెలుగులో/i, "te-IN"],
        // Hindi — English + transliteration
        [/\bhindi\b|\bhindi\s*mein\b|\bhindi\s*me\b|\bhindi\s*mai\b|\bhindi\s*main\b|हिंदी\s*में/i, "hi-IN"],
        // Tamil
        [/\btamil\b|\btamil\s*la\b|\btamil\s*il\b|\btamizh\b/i, "ta-IN"],
        // Bengali
        [/\bbengali\b|\bbangla\b|\bbengali\s*te\b/i, "bn-IN"],
        // Malayalam
        [/\bmalayalam\b|\bmalayalam\s*il\b|\bmalayaalam\b/i, "ml-IN"],
        // Kannada
        [/\bkannada\b|\bkannada\s*alli\b|\bkannad\b/i, "kn-IN"],
        // Gujarati
        [/\bgujarati\b|\bgujarati\s*ma\b|\bgujrati\b/i, "gu-IN"],
        // Punjabi
        [/\bpunjabi\b|\bpanjabi\b|\bpunjabi\s*vich\b/i, "pa-IN"],
        // Marathi
        [/\bmarathi\b|\bmarathi\s*madhe\b|\bmarathi\s*me\b/i, "mr-IN"],
        // Urdu
        [/\burdu\b|\burdu\s*mein\b/i, "ur-IN"],
        // English (explicit request to reply in English)
        [/\bin\s*english\b|\breply\s*in\s*english\b/i, "en-IN"],
    ];

    for (const [regex, code] of patterns) {
        if (regex.test(text)) return code;
    }
    return null;
}

/**
 * Full language resolution with priority:
 *   1. Client dropdown selection (explicit user choice)
 *   2. Explicit language keyword in the message ("tell me in Telugu")
 *   3. Unicode script detection (user typing in native script)
 *   4. Fallback: English
 */
export function resolveLanguage(text: string, clientLang?: string): string {
    // Priority 1: explicit dropdown selection
    if (clientLang && clientLang !== "auto") return clientLang;
    // Priority 2: explicit keyword like "in Telugu"
    const keyword = detectExplicitLang(text);
    if (keyword) return keyword;
    // Priority 3: script-based detection
    return detectLangFromScript(text);
}

export const LANG_NAMES: Record<string, string> = {
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
    "en-IN": "English",
};

export const LANG_OPTIONS = [
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
