import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

// ─── Static landing content ─────────────────────────────────────────────────
const services = [
  {
    href: "/consultation",
    title: "Talk to a lawyer",
    desc: "Audio or video consults with verified advocates at transparent per-minute rates.",
    badge: "₹31/min",
    badgeFg: "#1856C9",
    badgeBg: "#ECF2FE",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    href: "/documents/new",
    title: "Draft documents",
    desc: "Court-ready affidavits, rental agreements, NDAs and MOUs — with filing guidance.",
    badge: "5 min",
    badgeFg: "#16794A",
    badgeBg: "#E9F7EF",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    href: "/chat",
    title: "AI legal guidance",
    desc: "Ask about Indian law in your language and get clear, cited answers instantly.",
    badge: "Free",
    badgeFg: "#5A6472",
    badgeBg: "#F4F5F7",
    icon: <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />,
  },
  {
    href: "/categories",
    title: "Browse topics",
    desc: "Property, family, criminal, IPR and more — with step-by-step guidance.",
    badge: "50+",
    badgeFg: "#5A6472",
    badgeBg: "#F4F5F7",
    icon: (
      <>
        <rect width="7" height="7" x="3" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="14" rx="1.5" />
        <rect width="7" height="7" x="3" y="14" rx="1.5" />
      </>
    ),
  },
];

const lawyers = [
  { initials: "RS", name: "Adv. R. Sharma", city: "Hyderabad", exp: "12 yrs", practice: "Property & Civil", rating: "4.9", rate: "₹31/min", tint: "#ECF2FE", tintBorder: "#DCE7FD", tintText: "#1856C9" },
  { initials: "SI", name: "Adv. S. Iyer", city: "Bengaluru", exp: "9 yrs", practice: "Contracts & Corporate", rating: "4.8", rate: "₹40/min", tint: "#E9F7EF", tintBorder: "#D2EEDD", tintText: "#16794A" },
  { initials: "PS", name: "Adv. P. Singh", city: "Mumbai", exp: "15 yrs", practice: "Criminal & Family", rating: "4.7", rate: "₹31/min", tint: "#FBF1E4", tintBorder: "#F2E2C9", tintText: "#9A6A1A" },
  { initials: "NG", name: "Adv. N. Gupta", city: "Delhi", exp: "11 yrs", practice: "IPR & Startup Law", rating: "4.9", rate: "₹50/min", tint: "#F4F5F7", tintBorder: "#EAECEF", tintText: "#0E1116" },
];

const metrics = [
  { value: "₹31", suffix: "/min", label: "consult from" },
  { value: "1,200+", suffix: "", label: "verified advocates" },
  { value: "12+", suffix: "", label: "Indian languages" },
  { value: "50k+", suffix: "", label: "documents drafted" },
];

export default function Home() {
  return (
    <div className="bg-white text-[#0E1116]">

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[#ECEEF2] bg-[linear-gradient(180deg,#FBFBFC_0%,#fff_70%)]">
        <div className="dotgrid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="vs-hero relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 pb-20 pt-[74px] lg:grid-cols-[1.08fr_.92fr]">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E8EC] bg-white px-3 py-[5px] pl-[9px] shadow-[0_1px_2px_rgba(14,17,22,.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] shadow-[0_0_0_3px_rgba(22,163,74,.16)]" />
              <span className="mono-label !text-[11px] !tracking-[.06em] text-[#5A6472]">India · Verified Advocates · 12+ Languages</span>
            </div>

            <h1 className="mt-[22px] text-[40px] font-semibold leading-[1.04] tracking-[-.03em] text-[#0E1116] sm:text-[53px]">
              Legal clarity for<br />every Indian.
            </h1>

            <p className="mt-[22px] max-w-[520px] text-[17px] leading-[1.6] text-[#5A6472] sm:text-[18px]">
              Talk to verified advocates from <span className="font-medium text-[#0E1116]">₹31/min</span>, draft court-ready documents in minutes, and get AI legal guidance in your language — all in one calm, trustworthy place.
            </p>

            {/* Search */}
            <form action="/chat" method="GET" className="mt-7 flex max-w-[520px] items-center gap-1.5 rounded-[12px] border border-[#E1E4E9] bg-white p-1.5 shadow-[0_2px_10px_rgba(14,17,22,.05)] transition focus-within:border-[#1F6FEB] focus-within:shadow-[0_0_0_3px_rgba(31,111,235,.14)]">
              <svg className="ml-2.5 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9AA2AF" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input name="q" aria-label="Ask a legal question" placeholder="Ask anything — e.g. how to file an FIR, rent agreement…" className="min-w-0 flex-1 border-none bg-transparent px-1 py-2 text-[14.5px] text-[#0E1116] outline-none placeholder:text-[#9AA2AF]" />
              <button type="submit" className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-[#1F6FEB] px-4 py-[9px] text-sm font-medium text-white transition hover:bg-[#195FD6]">Ask AI</button>
            </form>

            {/* CTAs */}
            <div className="vs-hero-actions mt-[18px] flex flex-wrap items-center gap-3">
              <Link href="/consultation" className="inline-flex items-center gap-2 rounded-[9px] bg-[#0E1116] px-[19px] py-[11px] text-[14.5px] font-medium text-white shadow-[0_1px_2px_rgba(14,17,22,.2)] transition hover:bg-[#23282F]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Talk to a lawyer
              </Link>
              <Link href="/documents/new" className="inline-flex items-center gap-2 rounded-[9px] border border-[#E1E4E9] bg-white px-[19px] py-[11px] text-[14.5px] font-medium text-[#0E1116] transition hover:border-[#D3D7DE] hover:bg-[#F7F8FA]">Draft a document</Link>
            </div>

            {/* Trust row */}
            <div className="mt-[34px] flex flex-wrap items-center gap-[22px] font-mono text-[12px] text-[#8B93A1]">
              <span className="flex items-center gap-[7px]"><span className="font-semibold text-[#0E1116]">4.8★</span> rating</span>
              <span className="h-[13px] w-px bg-[#E1E4E9]" />
              <span className="flex items-center gap-[7px]"><span className="font-semibold text-[#0E1116]">1,200+</span> advocates</span>
              <span className="h-[13px] w-px bg-[#E1E4E9]" />
              <span className="flex items-center gap-[7px]"><span className="font-semibold text-[#0E1116]">256-bit</span> secure</span>
            </div>
          </div>

          {/* Right — product preview */}
          <div>
            <div className="overflow-hidden rounded-[16px] border border-[#E5E8EC] bg-white shadow-[0_18px_50px_rgba(14,17,22,.10),0_2px_6px_rgba(14,17,22,.04)]">
              <div className="flex items-center gap-[9px] border-b border-[#EEF0F3] bg-[#FCFCFD] px-4 py-[13px]">
                <div className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[#0E1116]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                </div>
                <div className="text-[13px] font-semibold text-[#0E1116]">AI Counsel</div>
                <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-[#8B93A1]"><span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />EN · हिन्दी · తెలుగు</div>
              </div>
              <div className="flex flex-col gap-3.5 bg-white px-4 py-[18px]">
                <div className="max-w-[78%] self-end rounded-[13px_13px_4px_13px] bg-[#0E1116] px-[13px] py-2.5 text-[13.5px] leading-[1.5] text-white">My landlord won&apos;t return my deposit. What can I do?</div>
                <div className="flex gap-2.5">
                  <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] border border-[#DCE7FD] bg-[#ECF2FE]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1856C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                  </div>
                  <div className="flex-1">
                    <div className="rounded-[4px_13px_13px_13px] border border-[#EEF0F3] bg-[#F6F7F9] px-[13px] py-[11px] text-[13.5px] leading-[1.6] text-[#1B2027]">You can send a formal demand notice, then file in the Rent Authority or Consumer Court. Most deposits must be returned within 30 days of vacating.</div>
                    <div className="mt-[9px] flex flex-wrap gap-1.5">
                      <span className="rounded-[6px] border border-[#DCE7FD] bg-[#ECF2FE] px-2 py-[3px] font-mono text-[10.5px] font-medium text-[#1856C9]">Model Tenancy Act §16</span>
                      <span className="rounded-[6px] border border-[#E8EAEE] bg-[#F4F5F7] px-2 py-[3px] font-mono text-[10.5px] font-medium text-[#5A6472]">CPA 2019</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-0.5">
                  <Link href="/documents/new" className="flex-1 rounded-[8px] border border-[#E5E8EC] bg-white py-[9px] text-center text-[12.5px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]">Draft demand notice</Link>
                  <Link href="/consultation" className="flex-1 rounded-[8px] border border-[#E5E8EC] bg-white py-[9px] text-center text-[12.5px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]">Find a lawyer →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ METRIC BAND ════════════════════════ */}
      <section className="border-b border-[#ECEEF2] bg-white">
        <div className="vs-metric-4 mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 py-[30px] md:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className={`text-center ${i > 0 ? "md:border-l md:border-[#ECEEF2]" : ""}`}>
              <div className="text-[26px] font-semibold tracking-[-.02em] text-[#0E1116]">{m.value}<span className="text-[14px] font-medium text-[#8B93A1]">{m.suffix}</span></div>
              <div className="mt-[3px] font-mono text-[11px] tracking-[.04em] text-[#8B93A1]">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section className="border-b border-[#ECEEF2] bg-[#FBFBFC]">
        <div className="mx-auto max-w-[1200px] px-6 py-[72px]">
          <div className="max-w-[620px]">
            <div className="mono-label text-[#1856C9]">Everything you need</div>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.15] tracking-[-.025em] text-[#0E1116]">One platform. The whole legal journey.</h2>
            <p className="mt-3.5 text-[16px] leading-[1.6] text-[#5A6472]">From a first question to a signed document to a verified advocate — without the confusion, the runaround, or the jargon.</p>
          </div>
          <div className="vs-grid-4 mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="lift block rounded-[14px] border border-[#E8EAEE] bg-white p-[22px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#EAECEF] bg-[#F4F5F7] text-[#0E1116]">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                  </div>
                  <span className="rounded-[6px] px-[7px] py-[3px] font-mono text-[10px] font-semibold" style={{ color: s.badgeFg, background: s.badgeBg }}>{s.badge}</span>
                </div>
                <h3 className="mt-4 text-[15.5px] font-semibold text-[#0E1116]">{s.title}</h3>
                <p className="mt-[7px] text-[13.5px] leading-[1.55] text-[#5A6472]">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ ADVOCATES ════════════════════════ */}
      <section className="border-b border-[#ECEEF2] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-[72px]">
          <div className="vs-section-head flex items-end justify-between gap-6">
            <div>
              <div className="mono-label text-[#1856C9]">Professional network</div>
              <h2 className="mt-3 text-[34px] font-semibold tracking-[-.025em] text-[#0E1116]">Top verified advocates</h2>
            </div>
            <Link href="/consultation" className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[#1856C9]">View all<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link>
          </div>
          <div className="vs-grid-4 mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lawyers.map((l) => (
              <Link key={l.name} href="/consultation" className="lift block rounded-[14px] border border-[#E8EAEE] bg-white p-[18px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[11px] text-[16px] font-semibold" style={{ background: l.tint, border: `1px solid ${l.tintBorder}`, color: l.tintText }}>{l.initials}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-[5px]">
                      <span className="whitespace-nowrap text-[14px] font-semibold text-[#0E1116]">{l.name}</span>
                      <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="#1F6FEB" aria-label="Verified"><path d="M9.5 1.5 11 0l1.5 1.5L14.5 1l1 2 2.2.3.3 2.2 2 1-1 2 1 2-2 1-.3 2.2-2.2.3-1 2-2-.5L11 24l-1.5-1.5-2 .5-1-2-2.2-.3-.3-2.2-2-1 1-2-1-2 2-1 .3-2.2L4.5 3l1-2 2 .5z" /><path d="m8 12 2.5 2.5L16 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-[#8B93A1]">{l.city} · {l.exp}</div>
                  </div>
                </div>
                <div className="mt-[13px] text-[13px] text-[#5A6472]">{l.practice}</div>
                <div className="mt-3.5 flex items-center justify-between border-t border-[#EEF0F3] pt-[13px]">
                  <span className="text-[12.5px] text-[#5A6472]"><span className="text-[#B5862B]">★</span> {l.rating}</span>
                  <span className="font-mono text-[13px] font-semibold text-[#0E1116]">{l.rate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ CATEGORIES ════════════════════════ */}
      <section className="border-b border-[#ECEEF2] bg-[#FBFBFC]">
        <div className="mx-auto max-w-[1200px] px-6 py-[72px]">
          <div className="vs-section-head flex items-end justify-between gap-6">
            <div>
              <div className="mono-label text-[#1856C9]">Knowledge base</div>
              <h2 className="mt-3 text-[34px] font-semibold tracking-[-.025em] text-[#0E1116]">Popular legal topics</h2>
            </div>
          </div>
          <div className="vs-grid-4 mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/categories#${c.slug}`} className="rounded-[11px] border border-[#E8EAEE] bg-white px-4 py-[15px] transition hover:border-[#C9CFD8] hover:shadow-[0_4px_14px_rgba(14,17,22,.05)]">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[#0E1116]">{c.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2C8D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
                <div className="mt-[5px] font-mono text-[10.5px] text-[#9AA2AF]">{c.slug}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ PRICING ════════════════════════ */}
      <section id="pricing" className="border-b border-[#ECEEF2] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-[72px]">
          <div className="mx-auto max-w-[560px] text-center">
            <div className="mono-label text-[#1856C9]">Pricing</div>
            <h2 className="mt-3 text-[34px] font-semibold tracking-[-.025em] text-[#0E1116]">Start free. Upgrade when it matters.</h2>
          </div>
          <div className="vs-grid-3 mt-11 grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-[16px] border border-[#E8EAEE] bg-white p-[26px]">
              <div className="mono-label !text-[11px] !tracking-[.08em] text-[#8B93A1]">Free</div>
              <div className="mt-3.5 flex items-baseline gap-[5px]"><span className="text-[38px] font-semibold tracking-[-.03em] text-[#0E1116]">₹0</span><span className="text-[14px] text-[#8B93A1]">/forever</span></div>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#5A6472]">For quick lookups and basic templates.</p>
              <div className="my-5 h-px bg-[#EEF0F3]" />
              <div className="flex flex-col gap-[11px]">
                {["15 AI queries / day", "All legal categories", "1 free document"].map((f) => (
                  <div key={f} className="flex items-center gap-[9px] text-[13.5px] text-[#1B2027]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>{f}</div>
                ))}
              </div>
              <Link href="/auth/signup" className="mt-6 block rounded-[9px] border border-[#E1E4E9] bg-white py-[11px] text-center text-[14px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]">Get started</Link>
            </div>
            {/* Pro */}
            <div className="relative rounded-[16px] border-[1.5px] border-[#0E1116] bg-white p-[26px] shadow-[0_16px_40px_rgba(14,17,22,.10)]">
              <div className="absolute -top-[11px] left-[26px] rounded-[6px] bg-[#0E1116] px-[9px] py-1 font-mono text-[10px] font-semibold tracking-[.06em] text-white">MOST POPULAR</div>
              <div className="mono-label !text-[11px] !tracking-[.08em] text-[#1856C9]">Pro</div>
              <div className="mt-3.5 flex items-baseline gap-[5px]"><span className="text-[38px] font-semibold tracking-[-.03em] text-[#0E1116]">₹499</span><span className="text-[14px] text-[#8B93A1]">/month</span></div>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#5A6472]">For individuals and founders who need unlimited access.</p>
              <div className="my-5 h-px bg-[#EEF0F3]" />
              <div className="flex flex-col gap-[11px]">
                {["Unlimited AI counsel", "Unlimited documents", "Priority lawyer booking", "12+ Indian languages"].map((f) => (
                  <div key={f} className="flex items-center gap-[9px] text-[13.5px] text-[#1B2027]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1F6FEB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>{f}</div>
                ))}
              </div>
              <Link href="/auth/signup" className="mt-6 block rounded-[9px] bg-[#0E1116] py-[11px] text-center text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(14,17,22,.2)] transition hover:bg-[#23282F]">Get Pro</Link>
            </div>
            {/* Enterprise */}
            <div className="rounded-[16px] border border-[#E8EAEE] bg-white p-[26px]">
              <div className="mono-label !text-[11px] !tracking-[.08em] text-[#8B93A1]">Enterprise</div>
              <div className="mt-3.5 flex items-baseline gap-[5px]"><span className="text-[32px] font-semibold tracking-[-.03em] text-[#0E1116]">Custom</span></div>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#5A6472]">SLAs, API access, and dedicated support for institutions.</p>
              <div className="my-5 h-px bg-[#EEF0F3]" />
              <div className="flex flex-col gap-[11px]">
                {["Custom templates", "Developer API", "24/7 SLA support"].map((f) => (
                  <div key={f} className="flex items-center gap-[9px] text-[13.5px] text-[#1B2027]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>{f}</div>
                ))}
              </div>
              <Link href="/support" className="mt-6 block rounded-[9px] border border-[#E1E4E9] bg-white py-[11px] text-center text-[14px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]">Contact sales</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
