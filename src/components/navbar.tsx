"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Legal Topics" },
  { href: "/consultation", label: "Talk to Lawyer" },
  { href: "/documents", label: "Documents" },
  { href: "/chat", label: "AI Counsel" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/support", label: "Help" },
];

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
    const { data: sub } = sb.auth.onAuthStateChange((_e: any, session: any) => {
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
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md shadow-slate-200/60"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* ── Top Announcement Bar ─────────────────────────────────── */}
      <div className="bg-violet-600 text-white text-xs font-medium py-1.5 px-4 text-center">
        🎉 New: Generate ready-to-print Indian legal documents with AI — &nbsp;
        <Link href="/documents/new" className="underline font-semibold hover:text-violet-200 transition-colors">
          Try it free →
        </Link>
      </div>

      {/* ── Main Header ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex items-center justify-center h-9 w-9 rounded-lg text-white transition-transform duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(252,100%,62%), hsl(285,70%,55%))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <span className="block text-lg font-black text-slate-900 leading-none tracking-tight">
                Vidhi<span className="gradient-text">Sahayak</span>
              </span>
              <span className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                AI Legal Copilot
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-violet-600" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {userEmail ? (
              <>
                <span className="hidden md:block text-sm text-slate-500 font-medium truncate max-w-[160px]">
                  {userEmail}
                </span>
                <button
                  onClick={onSignOut}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/consultation"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white transition-all duration-200 shadow-sm cursor-pointer"
                  style={{ background: "hsl(252,100%,62%)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Talk to Lawyer
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden md:inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  Register Free
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3 flex gap-2">
              <Link href="/auth/signin" className="flex-1 text-center rounded-full border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Sign In
              </Link>
              <Link href="/consultation" className="flex-1 text-center rounded-full py-2 text-xs font-bold text-white transition-colors" style={{ background: "hsl(252,100%,62%)" }}>
                Talk to Lawyer
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
