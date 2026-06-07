"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Legal Categories" },
  { href: "/consultation", label: "Consultation" },
  { href: "/documents", label: "Documents" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "AI Chat" },
  { href: "/support", label: "Help & Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onSignOut() {
    const sb = supabaseBrowser();
    await sb?.auth.signOut();
  }

  return (
    <header className="w-full sticky top-0 z-50 glass border-b border-slate-200/50 backdrop-blur-md">
      {/* ─── Top Utility Announcement Bar ─────────────────────────────── */}
      <div className="saffron-bar bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs font-semibold">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:text-indigo-600 focus:px-3 focus:py-1 focus:rounded"
            >
              Skip to main content
            </a>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center bg-indigo-500/30 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                New
              </span>
              <span className="opacity-95">
                🚀 Build ready-to-print Indian legal documents with our brand-new AI template assistant!
              </span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="opacity-80">24/7 Virtual Counsel</span>
              <span className="opacity-50">|</span>
              <span className="opacity-90">12+ Indian Languages</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Header (Glass-white background with abstract shield logo) ───────────────────── */}
      <div className="bg-white/80 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Brand / Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Premium abstract shield & scale vector */}
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 transition-transform duration-500 group-hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M8 11h8" />
                  <path d="M12 8v6" />
                  <circle cx="12" cy="14" r="1" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-black text-slate-900 tracking-tight leading-tight">
                  Vidhi<span className="gradient-text font-black">Sahayak</span>
                </span>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                  AI Legal Copilot Platform
                </span>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {userEmail ? (
                <>
                  <span className="hidden text-sm font-medium text-slate-600 md:inline truncate max-w-[180px]">
                    {userEmail}
                  </span>
                  <button
                    onClick={onSignOut}
                    className="rounded-full border border-slate-200 px-4.5 py-2 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="hidden sm:inline-flex rounded-full border border-slate-200 px-4.5 py-2 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-full bg-slate-900 px-5.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all duration-200 shadow-sm"
                  >
                    Register Free
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>

      {/* ─── Navigation Bar (Deep Slate Blue) ───────────────────────────────────── */}
      <nav className="govt-nav-bar bg-slate-950 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-11 gap-1 text-xs font-semibold tracking-wide uppercase">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4.5 h-full flex items-center transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-slate-900 text-white font-bold"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 to-purple-600" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Mobile Nav ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <nav className="md:hidden bg-white/95 border-b border-slate-100 animate-[fade-in-up_0.2s_ease-out] backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === item.href
                    ? "text-white bg-indigo-600"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
