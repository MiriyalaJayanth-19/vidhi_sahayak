import Link from "next/link";

const platformLinks = [
  { href: "/categories", label: "Legal Categories" },
  { href: "/documents/new", label: "Create Document" },
  { href: "/consultation", label: "Find a Lawyer" },
  { href: "/chat", label: "AI Legal Chat" },
  { href: "/templates", label: "Templates" },
];

const resourceLinks = [
  { href: "/support", label: "Help Center" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: "/categories/land", label: "Property Law" },
  { href: "/categories/rental", label: "Rental Agreements" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/support", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-700/30">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-bg-primary opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-md shadow-blue-500/20">
                VS
              </span>
              <span className="text-lg font-semibold gradient-text">VidhiSahayak</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              AI-powered legal assistance for every Indian citizen. Get guidance, generate documents, and connect with verified lawyers — in any language.
            </p>
            {/* Trust badges */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-500/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Verified Lawyers
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Platform</h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-4">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Need help?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">support@vidhisahayak.in</p>
              <Link href="/chat" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-cyan-400 hover:underline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
                Chat with AI
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/50 dark:border-slate-700/30 py-6 md:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} VidhiSahayak. All rights reserved. General legal information only — not a substitute for professional legal advice.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">Powered by</span>
            <span className="text-xs font-medium gradient-text">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
