import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import VoiceSearch from "@/components/voice-search";
import InlineVoiceAssistant from "@/components/inline-voice-assistant";

export default function Home() {
  return (
    <div className="text-slate-900 dark:text-slate-100">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200/50 dark:border-slate-700/30 py-20 md:py-28">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 animated-grid opacity-60 pointer-events-none" />
        {/* Glowing blur blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-[glow-pulse_3s_ease-in-out_infinite] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-[glow-pulse_3s_ease-in-out_infinite_1.5s] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-medium text-blue-600 dark:text-cyan-400 mb-6 animate-[fade-in_0.6s_ease-out_both]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                AI-Powered Legal Assistance
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight leading-[1.1] md:text-5xl lg:text-6xl xl:text-7xl animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                Your{" "}
                <span className="gradient-text">Legal Assistant</span>
                {" "}for Guidance, Documents &amp; Consultations
              </h1>

              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
                Find answers faster, generate ready-to-print documents, and consult verified lawyers — all powered by AI.
              </p>

              {/* Search Bar */}
              <div className="mt-8 animate-[fade-in-up_0.6s_ease-out_0.3s_both]">
                <form action="/search" method="GET" className="glass-card rounded-2xl p-2 glow-ring transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-2 px-3">
                      <svg className="text-slate-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <input
                        type="text"
                        name="q"
                        placeholder="Search legal topics, e.g. rental agreement, affidavit..."
                        className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400 text-sm"
                        aria-label="Search legal topics"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <VoiceSearch />
                      <button
                        type="submit"
                        className="rounded-xl gradient-bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap gap-3 animate-[fade-in-up_0.6s_ease-out_0.4s_both]">
                <Link href="/documents/new" className="inline-flex items-center gap-2 rounded-full gradient-bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Start a Document
                </Link>
                <Link href="/categories" className="inline-flex items-center gap-2 rounded-full glass-card px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  Browse Categories
                </Link>
                <a href="#voice" className="inline-flex items-center gap-2 rounded-full glass-card px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                  Speak with AI
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden md:block animate-[fade-in_0.8s_ease-out_0.3s_both]">
              <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-3xl premium-shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=1200&auto=format&fit=crop"
                  alt="Professional legal assistance"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                  <div className="glass-card rounded-xl px-4 py-2 text-white backdrop-blur-lg">
                    <p className="text-lg font-bold">500+</p>
                    <p className="text-xs opacity-80">Legal Templates</p>
                  </div>
                  <div className="glass-card rounded-xl px-4 py-2 text-white backdrop-blur-lg">
                    <p className="text-lg font-bold">12+</p>
                    <p className="text-xs opacity-80">Languages</p>
                  </div>
                  <div className="glass-card rounded-xl px-4 py-2 text-white backdrop-blur-lg">
                    <p className="text-lg font-bold">24/7</p>
                    <p className="text-xs opacity-80">AI Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          VOICE ASSISTANT SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="voice" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-bg-soft border border-blue-100/50 dark:border-blue-500/10 premium-shadow p-10 md:p-14">
            {/* Glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center gap-6 text-center">
              {/* Section badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-600 dark:text-cyan-400 border border-blue-200/50 dark:border-blue-500/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                Voice-First Experience
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">
                Prefer speaking? <span className="gradient-text">Talk to our AI</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                Speak in any Indian language — English, Hindi, Telugu, Tamil, Bengali, and more. Our AI understands and responds naturally.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {[
                  { label: "Hindi", color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20" },
                  { label: "Telugu", color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
                  { label: "Tamil", color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20" },
                  { label: "Bengali", color: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20" },
                  { label: "+8 more", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
                ].map((b) => (
                  <span key={b.label} className={`rounded-full border px-3 py-1 text-xs font-medium ${b.color}`}>
                    {b.label}
                  </span>
                ))}
              </div>

              <InlineVoiceAssistant />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED LAWYERS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Trusted Professionals</p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured <span className="gradient-text">Lawyers</span>
              </h2>
            </div>
            <Link href="/consultation" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors">
              See all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                name: "Adv. R. Sharma",
                city: "Hyderabad",
                practices: "Property, Civil",
                fee: "₹1200",
                img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. S. Iyer",
                city: "Bengaluru",
                practices: "Contracts, Corporate",
                fee: "₹1500",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. P. Singh",
                city: "Mumbai",
                practices: "Criminal, Family",
                fee: "₹1000",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. N. Gupta",
                city: "Delhi",
                practices: "IPR, Startup",
                fee: "₹1800",
                img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
              },
            ].map((l) => (
              <div key={l.name} className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 premium-shadow hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={l.img} alt={l.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  {/* Fee badge */}
                  <div className="absolute top-3 right-3 glass-card rounded-lg px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {l.fee}/session
                  </div>
                  {/* Verified badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 glass-card rounded-full px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-base">{l.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {l.city} • {l.practices}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link href="/consultation" className="flex-1 text-center rounded-xl gradient-bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/25 transition-all duration-300">
                      Consult
                    </Link>
                    <Link href="/lawyers" className="flex-1 text-center rounded-xl border border-slate-200 dark:border-slate-600 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300">
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CATEGORIES GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Legal Topics</p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Popular <span className="gradient-text">Categories</span>
              </h2>
            </div>
            <Link href="/categories" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors">
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/categories#${c.slug}`}
                className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 premium-shadow hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {c.image && (
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={false}
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{c.name}</p>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Guidance, templates, and submission steps</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-bg-primary p-10 md:p-16 premium-shadow-lg">
            {/* Glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Need help right now?
                </h3>
                <p className="mt-3 text-base text-blue-100/90 max-w-lg">
                  Our support team can guide you to the right document and process. Get expert help instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/support" className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/25 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Contact Support
                </Link>
                <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
