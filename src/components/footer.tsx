import Link from "next/link";

const productLinks = [
  { href: "/chat", label: "AI Counsel" },
  { href: "/consultation", label: "Find a Lawyer" },
  { href: "/documents", label: "Documents" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/terms", label: "Disclaimer" },
];

export function Footer() {
  return (
    <footer className="bg-[#0B0D11] text-[#9AA2AF]">
      <div className="mx-auto max-w-[1200px] px-6 pb-[30px] pt-[52px]">
        <div className="vs-footer grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-[11px]">
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0D11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" /><path d="M6 7h12" /><path d="m4 7-2.5 6a3 3 0 0 0 6 0L5 7" /><path d="m19 7-2.5 6a3 3 0 0 0 6 0L20 7" /><path d="M7 21h10" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-white">VidhiSahayak</span>
            </div>
            <p className="mt-3.5 max-w-[280px] text-[13px] leading-[1.6] text-[#7A828F]">
              India&apos;s AI-powered legal platform. General legal information — not a substitute for professional advice.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[.1em] text-[#5E6571]">Product</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              {productLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-[#9AA2AF] transition-colors hover:text-white">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[.1em] text-[#5E6571]">Company</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              <span className="text-[#9AA2AF]">About</span>
              <span className="text-[#9AA2AF]">Careers</span>
              <Link href="/support" className="text-[#9AA2AF] transition-colors hover:text-white">Support</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[.1em] text-[#5E6571]">Legal</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-[13.5px]">
              {legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-[#9AA2AF] transition-colors hover:text-white">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#1C2027] pt-[22px] text-[12.5px] text-[#5E6571] sm:flex-row">
          <span>© {new Date().getFullYear()} VidhiSahayak. All rights reserved.</span>
          <span className="font-mono">Made in India <span aria-hidden="true">🇮🇳</span></span>
        </div>
      </div>
    </footer>
  );
}
