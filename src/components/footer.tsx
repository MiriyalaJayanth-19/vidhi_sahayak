import Link from "next/link";

const serviceLinks = [
  { href: "/documents/new", label: "Create Legal Document" },
  { href: "/consultation", label: "Find a Lawyer" },
  { href: "/chat", label: "AI Legal Assistant" },
  { href: "/categories", label: "Legal Categories" },
  { href: "/templates", label: "Document Templates" },
  { href: "/search", label: "Search" },
];

const quickLinks = [
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/categories/land", label: "Property & Land" },
  { href: "/categories/rental", label: "Rental Agreements" },
  { href: "/categories/affidavit", label: "Affidavits" },
  { href: "/categories/agreement", label: "Agreements" },
];

export function Footer() {
  return (
    <footer className="govt-footer bg-slate-950 text-slate-400 border-t border-slate-900">
      {/* Sleek brand gradient indicator line at top */}
      <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Main Footer Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              {/* Premium geometric shield icon */}
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <span className="block text-lg font-black text-white tracking-tight">Vidhi<span className="text-indigo-400">Sahayak</span></span>
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">AI Legal Assistant</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Empowering individuals and businesses across India with instant AI legal guidance, automated ready-to-print contracts, and verified lawyer consultation scheduling.
            </p>
            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Verified Counsel
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure & Private
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-indigo-500 inline-block" />
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-all duration-200 flex items-center gap-2">
                    <svg className="opacity-40" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-indigo-500 inline-block" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:translate-x-0.5 transition-all duration-200 flex items-center gap-2">
                    <svg className="opacity-40" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SaaS Newsletter signup & Policies */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-indigo-500 inline-block" />
              Join Newsletter
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Get monthly updates on important Indian legal reforms, document templates, and compliance updates.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-slate-900 border border-slate-800 rounded-full px-4.5 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer">
                Join
              </button>
            </div>

            {/* Support Box */}
            <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-4">
              <p className="text-xs font-bold text-white mb-1">Need Legal Guidance?</p>
              <p className="text-[11px] text-slate-500">support@vidhisahayak.in</p>
              <Link href="/chat" className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
                Open Virtual Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ──────────────────────────────────────────────── */}
        <div className="border-t border-slate-900 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-[11px] text-slate-600 text-center md:text-left leading-relaxed">
              © {new Date().getFullYear()} VidhiSahayak Technologies Private Limited. All rights reserved.<br />
              Disclaimer: VidhiSahayak is an AI legal copilot providing general informational guidance under Indian laws. We are not a law firm and do not provide direct legal advice.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
              <span>•</span>
              <span className="font-semibold text-slate-500">Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
