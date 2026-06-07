import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import VoiceSearch from "@/components/voice-search";
import InlineVoiceAssistant from "@/components/inline-voice-assistant";

export default function Home() {
  return (
    <div id="main-content" className="text-slate-900 bg-slate-50 min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Premium Legal SaaS Hero
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-32">
        {/* Glowing atmospheric gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              {/* Modern SaaS Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 animate-[fade-in_0.5s_ease-out_both]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Next-Generation AI Legal Platform
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-black tracking-tight leading-tight md:text-5xl lg:text-6xl text-white animate-[fade-in-up_0.5s_ease-out_0.1s_both]">
                AI-Powered Legal Copilot <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                  For India
                </span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-slate-400 max-w-xl leading-relaxed animate-[fade-in-up_0.5s_ease-out_0.15s_both]">
                Find instant answers to Indian laws, auto-generate ready-to-print legal drafts, and schedule consultation calls with verified lawyers — in any Indian language.
              </p>

              {/* Quick Search Input */}
              <div className="mt-8 max-w-xl animate-[fade-in-up_0.5s_ease-out_0.20s_both]">
                <form action="/search" method="GET" className="rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-md p-1.5 focus-within:border-indigo-500 transition-all duration-300 flex items-center shadow-lg shadow-indigo-950/20">
                  <div className="flex flex-1 items-center gap-2.5 px-4">
                    <svg className="text-slate-500 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      name="q"
                      placeholder="Ask or search legal topics (e.g. rental agreement, affidavit, property rights)..."
                      className="w-full bg-transparent py-2.5 outline-none placeholder:text-slate-600 text-sm text-white focus:ring-0"
                      aria-label="Search legal topics"
                    />
                  </div>
                  <div className="flex items-center gap-1 shrink-0 pr-1">
                    <VoiceSearch />
                    <button
                      type="submit"
                      className="rounded-full bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all duration-200 cursor-pointer shadow-md shadow-indigo-600/30"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3.5 animate-[fade-in-up_0.5s_ease-out_0.25s_both]">
                <Link href="/documents/new" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  Draft Document
                </Link>
                <Link href="/chat" className="btn-outline text-white hover:bg-white/5 border-slate-700">
                  Consult AI Counsel
                </Link>
                <a href="#pricing" className="btn-ghost text-slate-300 hover:text-white border-transparent">
                  Pricing Plans
                </a>
              </div>
            </div>

            {/* Hero Interactive UI Preview */}
            <div className="lg:col-span-5 relative hidden lg:block animate-[fade-in_0.6s_ease-out_0.3s_both]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-2xl filter blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-4 shadow-2xl">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">vidhisahayak.app/workspace</div>
                  <span className="w-4 h-4 rounded bg-slate-800" />
                </div>
                
                {/* App Content Simulation */}
                <div className="space-y-3">
                  <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 text-xs">
                    <p className="text-indigo-400 font-bold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      AI Legal Companion
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      "Namaste! According to Section 17 of the Indian Registration Act, 1908, any lease agreement of real property from year to year must be compulsorily registered."
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 rounded-lg p-3 border border-slate-800/40 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-200">Residential Rental Agreement.docx</p>
                      <p className="text-slate-500 text-[10px] mt-0.5">Template updated 2 days ago</p>
                    </div>
                    <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded">Draft Ready</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-slate-950/40 rounded p-2.5 border border-slate-800/40 text-center">
                      <p className="font-bold text-slate-300">500+ Templates</p>
                      <p className="text-slate-600">Updated Daily</p>
                    </div>
                    <div className="bg-slate-950/40 rounded p-2.5 border border-slate-800/40 text-center">
                      <p className="font-bold text-slate-300">12+ Languages</p>
                      <p className="text-slate-600">Local Dialects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CORE SaaS SERVICES / VALUE PROPOSITION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="section-kicker">Everything You Need</p>
            <h2 className="section-title text-slate-900">
              One Portal. Complete Legal Empowerment.
            </h2>
            <p className="section-lead text-slate-500 mx-auto">
              Our comprehensive suite of legal technology tools simplifies regulatory compliance and legal knowledge for common citizens and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/documents/new",
                label: "Document Generation",
                desc: "Auto-generate ironclad legal drafts, agreements, and affidavits instantly.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                ),
                color: "indigo",
              },
              {
                href: "/consultation",
                label: "Lawyer Consultation",
                desc: "Connect and book virtual consultation sessions with verified advocates.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                ),
                color: "purple",
              },
              {
                href: "/chat",
                label: "AI Legal Chat",
                desc: "Ask general questions and receive legal answers based on the Indian Penal Code.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                ),
                color: "cyan",
              },
              {
                href: "/categories",
                label: "Legal Categories",
                desc: "Browse regulatory frameworks, print guidelines, and checklists.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                ),
                color: "amber",
              },
            ].map((service) => (
              <Link
                key={service.label}
                href={service.href}
                className="group card-surface-hover p-6 bg-white hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-5 group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  Get Started →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          VOICE ASSISTANT SECTION — Premium modern layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="voice" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              </svg>
              Voice-First Legal Tech
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white">
              Talk to Our AI Assistant <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                In Your Own Language
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Don't want to type? Speak naturally in any Indian language. Our AI detects your script, processes your queries, and replies back with simple, clean legal information.
            </p>

            {/* Language badges */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              {[
                "Hindi हिन्दी",
                "Telugu తెలుగు",
                "Tamil தமிழ்",
                "Bengali বাংলা",
                "Marathi मराठी",
                "Kannada ಕನ್ನಡ",
                "English",
              ].map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-slate-800 bg-slate-900/50 px-4.5 py-1 text-xs font-medium text-slate-300"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Real voice client component */}
            <div className="pt-6">
              <InlineVoiceAssistant />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED LAWYERS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="section-kicker">Professional Network</p>
              <h2 className="section-title">Verified Panel Advocates</h2>
            </div>
            <Link href="/consultation" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1">
              Browse All Lawyers →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <div key={l.name} className="group overflow-hidden card-surface border-slate-100 hover:border-indigo-500/20 transition-all duration-300 hover:shadow-lg bg-white">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={l.img} alt={l.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  {/* Fee badge */}
                  <div className="absolute top-3 right-3 rounded-md bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white">
                    {l.fee}/session
                  </div>
                  {/* Verified badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-base text-slate-800">{l.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                    <svg className="text-slate-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    </svg>
                    {l.city} • {l.practices}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Link href="/consultation" className="flex-1 text-center btn-primary text-xs py-2">
                      Book Call
                    </Link>
                    <Link href="/lawyers" className="flex-1 text-center btn-outline text-xs py-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
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
      <section className="section-shell bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="section-kicker">Knowledge Base</p>
              <h2 className="section-title">Popular Legal Directories</h2>
            </div>
            <Link href="/categories" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1">
              All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/categories#${c.slug}`}
                className="group overflow-hidden card-surface saffron-accent-left transition-all duration-300 hover:shadow-md hover:border-indigo-500 bg-white"
              >
                {c.image && (
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover group-hover:scale-103 transition-all duration-300"
                      priority={false}
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{c.name}</p>
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 transition-transform duration-200 group-hover:translate-x-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    Check rules, required templates, and official steps.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SAAS PRICING SECTION — TIERED MEMBERSHIPS (NEW)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="section-shell bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="section-kicker">Transparent Pricing</p>
            <h2 className="section-title text-slate-900">
              Flexible Plans Built For Everyone
            </h2>
            <p className="section-lead text-slate-500 mx-auto">
              Get AI legal answers and draft legal contracts. Choose a plan that suits your personal or enterprise needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Free Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Free Plan</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                  <span className="ml-1 text-slate-500 text-sm">/ forever</span>
                </div>
                <p className="mt-4 text-xs text-slate-500">Perfect for quick legal lookups and simple document templates.</p>
                <ul className="mt-6 space-y-3.5 text-slate-600 text-xs font-semibold">
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    15 AI Chat Queries / min
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Standard Categories Guidance
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-400">
                    <svg className="text-slate-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /></svg>
                    No Premium AI Models
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-400">
                    <svg className="text-slate-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /></svg>
                    No Unlimited Document Downloads
                  </li>
                </ul>
              </div>
              <Link href="/auth/signup" className="mt-8 block text-center rounded-full border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Sign Up Free
              </Link>
            </div>

            {/* Pro Plan (Popular) */}
            <div className="rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-md flex flex-col justify-between relative">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600 px-4 py-1 text-[10px] font-black uppercase text-white tracking-widest shadow-sm">
                Most Popular
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Pro Plan</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹499</span>
                  <span className="ml-1 text-slate-500 text-sm">/ month</span>
                </div>
                <p className="mt-4 text-xs text-slate-500">For individuals and startup founders needing unlimited drafts and lawyer scheduling.</p>
                <ul className="mt-6 space-y-3.5 text-slate-600 text-xs font-semibold">
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Unlimited AI Legal Chat
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Premium LLM Access (Gemini/GPT-4o)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Unlimited Document Generation
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Free Lawyer Booking Service
                  </li>
                </ul>
              </div>
              <Link href="/auth/signup" className="mt-8 block text-center rounded-full bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30">
                Go Pro Now
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Enterprise Plan</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900">Custom</span>
                </div>
                <p className="mt-4 text-xs text-slate-500">Tailored custom SLA agreements, higher rate limits, and API integrations for institutions.</p>
                <ul className="mt-6 space-y-3.5 text-slate-600 text-xs font-semibold">
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Custom NDA/MOU templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Developer API Access
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    Multi-tenant Workspace Accounts
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    24/7 Phone & Email SLA support
                  </li>
                </ul>
              </div>
              <Link href="/support" className="mt-8 block text-center rounded-full border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA BANNER SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-950 p-10 md:p-16 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_35%)]" />
            
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                  Empower Your Legal Operations <br />
                  With AI Today.
                </h3>
                <p className="mt-4 text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
                  Join thousands of Indian citizens and businesses who trust VidhiSahayak for draft generation and AI counseling. Sign up today and get your first draft absolutely free.
                </p>
              </div>
              <div className="flex flex-wrap gap-3.5 shrink-0">
                <Link href="/support" className="btn-ghost border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white">
                  Contact Support
                </Link>
                <Link href="/auth/signup" className="btn-inverse text-slate-950 font-bold bg-white hover:bg-slate-100 shadow-lg">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
