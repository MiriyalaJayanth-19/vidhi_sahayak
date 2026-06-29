"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase-browser";

const navItems = [
  { href: "/chat", label: "AI Counsel" },
  { href: "/consultation", label: "Find a Lawyer" },
  { href: "/documents", label: "Documents" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/categories", label: "Topics" },
];

// Scales-of-justice mark used across the redesign
function Logo({ size = 34, rounded = 9 }: { size?: number; rounded?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center bg-[#0E1116] text-white shadow-[0_1px_2px_rgba(14,17,22,.18)]"
      style={{ width: size, height: size, borderRadius: rounded }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" /><path d="M6 7h12" /><path d="m4 7-2.5 6a3 3 0 0 0 6 0L5 7" /><path d="m19 7-2.5 6a3 3 0 0 0 6 0L20 7" /><path d="M7 21h10" />
      </svg>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sb = supabaseBrowser();
    if (!sb) return;
    const init = async () => {
      const { data } = await sb.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    };
    init();
    const { data: sub } = sb.auth.onAuthStateChange((_e: AuthChangeEvent, session: Session | null) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function onSignOut() {
    const sb = supabaseBrowser();
    await sb?.auth.signOut();
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Announcement ───────────────────────────────────────── */}
      <div className="border-b border-[#ECEEF2] bg-[#F6F7F9]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-2.5 px-6 py-[9px] text-[13px] text-[#5A6472]">
          <span className="rounded-[5px] border border-[#DCE7FD] bg-[#ECF2FE] px-[7px] py-0.5 font-mono text-[10px] font-semibold tracking-[.08em] text-[#1856C9]">NEW</span>
          <span className="hidden sm:inline">Draft court-ready Indian legal documents with AI in minutes.</span>
          <span className="sm:hidden">AI-drafted legal documents.</span>
          <Link href="/documents/new" className="cursor-pointer font-medium text-[#0E1116] underline decoration-[#C9CDD4] underline-offset-[3px] hover:decoration-[#0E1116]">Try it free →</Link>
        </div>
      </div>

      {/* ── Main bar ───────────────────────────────────────────── */}
      <div className={`border-b border-[#ECEEF2] backdrop-blur-[14px] transition-shadow ${scrolled ? "bg-white/90 shadow-[0_1px_0_rgba(14,17,22,.04)]" : "bg-white/[.82]"}`}>
        <div className="mx-auto flex h-[62px] max-w-[1200px] items-center justify-between gap-6 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[11px]">
            <Logo />
            <div className="leading-[1.1]">
              <div className="text-[16px] font-semibold tracking-[-.01em] text-[#0E1116]">Vidhi<span className="font-medium text-[#5A6472]">Sahayak</span></div>
              <div className="font-mono text-[9px] font-medium uppercase tracking-[.14em] text-[#9AA2AF]">AI Legal Counsel</div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-[8px] px-[13px] py-2 text-[14px] font-medium transition-colors hover:bg-[#F4F5F7] hover:text-[#0E1116] ${pathname === item.href ? "bg-[#F4F5F7] text-[#0E1116]" : "text-[#5A6472]"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {userEmail ? (
              <>
                <span className="hidden max-w-[160px] truncate text-[13px] font-medium text-[#5A6472] md:block">{userEmail}</span>
                <button
                  onClick={onSignOut}
                  className="rounded-[8px] border border-[#E1E4E9] bg-white px-3.5 py-2 text-[13.5px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="hidden rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#0E1116] transition hover:bg-[#F4F5F7] sm:inline-flex">Sign in</Link>
                <Link href="/dashboard" className="inline-flex items-center gap-[7px] rounded-[9px] bg-[#0E1116] px-4 py-[9px] text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(14,17,22,.2)] transition hover:bg-[#23282F]">
                  Open app
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-[#E5E8EC] bg-white text-[#0E1116] transition hover:bg-[#F7F8FA] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<path d="M4 6h16M4 12h16M4 18h16" />)}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        {mobileOpen && (
          <nav className="border-t border-[#ECEEF2] bg-white px-4 pb-4 pt-2.5 lg:hidden">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`rounded-[9px] px-3 py-3 text-[15px] font-medium transition-colors hover:bg-[#F4F5F7] ${pathname === item.href ? "bg-[#F4F5F7] text-[#0E1116]" : "text-[#1B2027]"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-2.5 border-t border-[#EEF0F3] pt-3.5">
              <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="flex-1 rounded-[9px] border border-[#E1E4E9] bg-white py-[11px] text-center text-[14.5px] font-medium text-[#0E1116]">Sign in</Link>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1 rounded-[9px] bg-[#0E1116] py-[11px] text-center text-[14.5px] font-medium text-white">Open app</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
