"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Documentation" },
  { href: "/consultation", label: "Consultation" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Chat" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sb = supabaseBrowser();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
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
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              VS
            </span>
            <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              VidhiSahayak
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-500/10"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full gradient-bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {userEmail ? (
              <>
                <span className="hidden text-sm text-slate-500 dark:text-slate-400 md:inline truncate max-w-[160px]">{userEmail}</span>
                <button
                  onClick={onSignOut}
                  className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline-flex rounded-full border border-slate-200 dark:border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full gradient-bg-primary px-5 py-1.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get started
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 py-3 space-y-1 animate-[fade-in-up_0.2s_ease-out]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-500/10"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
