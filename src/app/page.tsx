import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import VoiceSearch from "@/components/voice-search";

export default function Home() {
  return (
    <div id="main-content" className="bg-white text-slate-800">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Clean Light Purple Background
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(145deg, hsl(252,60%,95%) 0%, hsl(265,50%,90%) 60%, hsl(280,40%,88%) 100%)" }}>
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(252,100%,75%), transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(285,70%,70%), transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}
            <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out_both]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-violet-200 px-4 py-1.5 text-xs font-semibold text-violet-700 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                India&apos;s AI-Powered Legal Assistant
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 leading-[1.15] tracking-tight">
                Find Lawyers &amp; Legal Help{" "}
                <span className="gradient-text">Online in India</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Online legal consultation starting at just <strong className="text-violet-700">₹31/min</strong>.
                Talk to verified advocates, generate documents, and get AI legal guidance in any Indian language.
              </p>

              {/* Search Bar */}
              <div className="max-w-lg">
                <form action="/search" method="GET"
                  className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-white/80 p-1.5 focus-within:ring-2 focus-within:ring-violet-400 transition-all duration-200">
                  <div className="flex flex-1 items-center gap-2 px-4">
                    <svg className="text-slate-400 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text" name="q"
                      placeholder="Search legal topics, e.g. rental agreement, FIR..."
                      className="w-full bg-transparent py-2 outline-none placeholder:text-slate-400 text-sm text-slate-800 focus:ring-0"
                      aria-label="Search legal topics"
                    />
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <VoiceSearch />
                    <button type="submit"
                      className="rounded-full px-5 py-2 text-sm font-bold text-white transition-all duration-200 cursor-pointer"
                      style={{ background: "hsl(252,100%,62%)" }}>
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/consultation"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "hsl(252,100%,62%)", boxShadow: "0 4px 16px hsla(252,100%,62%,0.4)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Talk to a Lawyer
                </Link>
                <Link href="/documents/new"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-violet-600 px-6 py-3 text-sm font-bold text-violet-700 bg-white hover:bg-violet-50 transition-all duration-200 hover:-translate-y-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6M12 11v6M9 14h6" />
                  </svg>
                  Create Document
                </Link>
                <Link href="/chat"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200">
                  AI Legal Chat
                </Link>
              </div>
            </div>

            {/* Right — Trust Card */}
            <div className="hidden lg:flex flex-col items-center gap-5 animate-[fade-in_0.6s_ease-out_0.2s_both]">
              <div className="w-full bg-white rounded-3xl p-8 shadow-xl border border-white/80 relative overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(107,70,255,0.15)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none translate-x-8 -translate-y-8"
                  style={{ background: "hsl(252,100%,62%)" }} />

                <h3 className="text-lg font-bold text-slate-900 mb-6">Why VidhiSahayak?</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      value: "4.8★", label: "Trusted Rating",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )
                    },
                    {
                      value: "256-bit", label: "SSL Encryption",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )
                    },
                    {
                      value: "24/7", label: "Audio & Video",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex justify-center mb-2 text-violet-500">{stat.icon}</div>
                      <div className="text-base font-black text-slate-900">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    "Verified advocates across all Indian states",
                    "Ready-to-print legal documents in 5 minutes",
                    "AI guidance in 12+ Indian languages",
                    "Transparent, per-minute pricing",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "hsl(252,100%,62%)" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">Online consultation starting at</p>
                  <p className="text-3xl font-black text-center mt-1" style={{ color: "hsl(252,100%,62%)" }}>
                    ₹31<span className="text-sm font-medium text-slate-500">/min</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"].map((city) => (
                  <Link key={city} href="/consultation"
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200">
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 3 Steps
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-kicker mb-1">Simple &amp; Fast</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Get Legal Help in 3 Easy Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[25%] right-[25%] h-px bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200 z-0" />
            {[
              {
                step: "01", title: "Select a Problem",
                desc: "Choose your legal issue from our comprehensive list of Indian law categories.",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ),
              },
              {
                step: "02", title: "Choose Your Plan",
                desc: "Pick a consultation plan that fits your budget — starting at just ₹31/min.",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" />
                  </svg>
                ),
              },
              {
                step: "03", title: "Consult an Expert",
                desc: "Connect instantly via audio or video call with a verified advocate in your language.",
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 p-6 hover:border-violet-200 hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-violet-100 text-violet-600"
                  style={{ background: "hsl(252,60%,97%)" }}>
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-violet-500 mb-1">Step {item.step}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CORE SERVICES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-kicker mb-1">Everything You Need</p>
            <h2 className="section-title">One Platform. Complete Legal Help.</h2>
            <p className="section-lead mt-3 mx-auto text-center">
              From AI chat to document drafts to verified lawyer consultations — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/consultation",
                label: "Talk to a Lawyer",
                desc: "Connect with verified advocates for audio/video consultations at transparent rates.",
                badge: "₹31/min",
                badgeColor: "bg-violet-50 text-violet-700",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
              },
              {
                href: "/documents/new",
                label: "Draft Legal Documents",
                desc: "Generate court-ready affidavits, rental agreements, and contracts in minutes.",
                badge: "5 min",
                badgeColor: "bg-emerald-50 text-emerald-700",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                ),
              },
              {
                href: "/chat",
                label: "AI Legal Guidance",
                desc: "Ask questions about Indian laws in your language and get instant, clear answers.",
                badge: "Free",
                badgeColor: "bg-blue-50 text-blue-700",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                ),
              },
              {
                href: "/categories",
                label: "Browse Legal Topics",
                desc: "Explore property, family, criminal, and 50+ categories of Indian law.",
                badge: "50+ Topics",
                badgeColor: "bg-amber-50 text-amber-700",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                ),
              },
            ].map((service) => (
              <Link key={service.label} href={service.href}
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-violet-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-violet-600 border border-violet-100"
                    style={{ background: "hsl(252,60%,97%)" }}>
                    {service.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors mb-2">
                  {service.label}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{service.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Get Started
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURED LAWYERS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <p className="section-kicker mb-1">Professional Network</p>
              <h2 className="section-title">Top Verified Advocates</h2>
            </div>
            <Link href="/consultation"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              View All Lawyers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Adv. R. Sharma", city: "Hyderabad", practices: "Property & Civil", rate: "₹31/min", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop", rating: "4.9", exp: "12 yrs" },
              { name: "Adv. S. Iyer", city: "Bengaluru", practices: "Contracts & Corporate", rate: "₹40/min", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", rating: "4.8", exp: "9 yrs" },
              { name: "Adv. P. Singh", city: "Mumbai", practices: "Criminal & Family", rate: "₹31/min", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop", rating: "4.7", exp: "15 yrs" },
              { name: "Adv. N. Gupta", city: "Delhi", practices: "IPR & Startup Law", rate: "₹50/min", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop", rating: "4.9", exp: "11 yrs" },
            ].map((l) => (
              <div key={l.name}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-violet-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <Image src={l.img} alt={l.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2 py-1 text-xs font-bold text-violet-700 border border-violet-100">
                    {l.rate}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{l.name}</h3>
                    <span className="text-xs font-semibold text-amber-500 shrink-0">★ {l.rating}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    </svg>
                    {l.city}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{l.practices} · {l.exp} exp.</p>
                  <div className="mt-3 flex gap-2">
                    <Link href="/consultation"
                      className="flex-1 text-center rounded-full py-2 text-xs font-bold text-white transition-all duration-200"
                      style={{ background: "hsl(252,100%,62%)" }}>
                      Book Call
                    </Link>
                    <Link href="/consultation"
                      className="flex-1 text-center rounded-full py-2 text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LEGAL CATEGORIES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <p className="section-kicker mb-1">Knowledge Base</p>
              <h2 className="section-title">Popular Legal Categories</h2>
            </div>
            <Link href="/categories"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              All Categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/categories#${c.slug}`}
                className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-violet-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {c.image && (
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <Image src={c.image} alt={c.name} fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors leading-tight">{c.name}</p>
                    <svg className="text-slate-300 group-hover:text-violet-400 transition-colors shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 leading-snug">Templates &amp; guidance</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="section-shell bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-kicker mb-1">Transparent Pricing</p>
            <h2 className="section-title">Plans for Every Need</h2>
            <p className="section-lead mt-3 mx-auto text-center">
              Start free. Upgrade when you need unlimited access and premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Free</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-slate-400 text-sm">/ forever</span>
                </div>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">Perfect for quick legal lookups and basic document templates.</p>
              </div>
              <ul className="space-y-3 flex-1">
                {["15 AI chat queries/day", "Browse all legal categories", "1 free document template"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(150,60%,40%)" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
                {["Premium AI models", "Unlimited document downloads"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(220,15%,65%)" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup"
                className="mt-7 block text-center rounded-full border-2 border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                Sign Up Free
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-violet-600 bg-white p-7 flex flex-col relative"
              style={{ boxShadow: "0 8px 40px hsla(252,100%,62%,0.2)" }}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black uppercase text-white tracking-widest"
                style={{ background: "hsl(252,100%,62%)" }}>
                Most Popular
              </div>
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(252,100%,62%)" }}>Pro</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹499</span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">Ideal for individuals and founders needing unlimited legal access.</p>
              </div>
              <ul className="space-y-3 flex-1">
                {["Unlimited AI Legal Chat", "Premium LLM (Gemini / GPT-4o)", "Unlimited Document Generation", "Free Lawyer Booking", "12+ Indian Languages"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "hsl(252,100%,62%)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup"
                className="mt-7 block text-center rounded-full py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "hsl(252,100%,62%)", boxShadow: "0 4px 16px hsla(252,100%,62%,0.4)" }}>
                Get Pro Now
              </Link>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Enterprise</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                </div>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">Tailored SLAs, API access, and dedicated support for institutions.</p>
              </div>
              <ul className="space-y-3 flex-1">
                {["Custom NDA / MOU templates", "Developer API Access", "Multi-tenant Workspace", "24/7 Phone & Email SLA Support"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(150,60%,40%)" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/support"
                className="mt-7 block text-center rounded-full border-2 border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-shell bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(252,80%,55%) 0%, hsl(285,70%,50%) 100%)" }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 50%)" }} />
            <div className="relative">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-3">
                Get Legal Assistance Right Now
              </h3>
              <p className="text-violet-100 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Join thousands of Indians who trust VidhiSahayak for legal guidance, document drafts, and verified advocate connections.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Talk to a Lawyer
                </Link>
                <Link href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5">
                  Register Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
