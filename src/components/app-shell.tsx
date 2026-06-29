"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type NavKey = "dashboard" | "chat" | "documents" | "consultation" | "system" | "support";

const ICONS: Record<NavKey, ReactNode> = {
  dashboard: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1.5" /><rect width="7" height="5" x="14" y="3" rx="1.5" /><rect width="7" height="9" x="14" y="12" rx="1.5" /><rect width="7" height="5" x="3" y="16" rx="1.5" /></svg>
  ),
  chat: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
  ),
  documents: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></svg>
  ),
  consultation: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  system: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="6.5" cy="17.5" r="2.5" /><path d="M11 6.5H4M20 17.5h-7" /></svg>
  ),
  support: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
  ),
};

const WORKSPACE: { key: NavKey; href: string; label: string }[] = [
  { key: "dashboard", href: "/dashboard", label: "Dashboard" },
  { key: "chat", href: "/chat", label: "AI Counsel" },
  { key: "documents", href: "/documents/new", label: "Documents" },
  { key: "consultation", href: "/consultation", label: "Consultation" },
];

const RESOURCES: { key: NavKey; href: string; label: string }[] = [
  { key: "system", href: "/system", label: "Design System" },
  { key: "support", href: "/support", label: "Help & Support" },
];

function NavRow({ item, active, onNavigate }: { item: { key: NavKey; href: string; label: string }; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center gap-[11px] rounded-[8px] px-[10px] py-2 text-[14px] font-medium transition-colors hover:bg-[#F4F5F7] ${active ? "bg-[#F1F3F6] text-[#0E1116]" : "text-[#5A6472]"}`}
    >
      {active && <span className="absolute left-[-12px] top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-[2px] bg-[#1F6FEB]" />}
      {ICONS[item.key]}
      {item.label}
    </Link>
  );
}

export function AppShell({
  active,
  title,
  desc,
  children,
}: {
  active: NavKey;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F9]">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-[90] flex w-[236px] flex-shrink-0 flex-col border-r border-[#E8EAEE] bg-white transition-transform duration-200 md:relative md:translate-x-0 ${open ? "translate-x-0 shadow-[0_24px_70px_rgba(14,17,22,.28)]" : "-translate-x-full"}`}
      >
        <Link href="/" onClick={close} className="flex h-[62px] flex-shrink-0 items-center gap-2.5 border-b border-[#EEF0F3] px-[18px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#0E1116]">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M6 7h12" /><path d="m4 7-2.5 6a3 3 0 0 0 6 0L5 7" /><path d="m19 7-2.5 6a3 3 0 0 0 6 0L20 7" /><path d="M7 21h10" /></svg>
          </div>
          <div className="leading-[1.05]">
            <div className="text-[14.5px] font-semibold text-[#0E1116]">VidhiSahayak</div>
            <div className="font-mono text-[8.5px] uppercase tracking-[.12em] text-[#9AA2AF]">AI Legal Counsel</div>
          </div>
        </Link>

        <div className="flex-1 overflow-y-auto px-3 py-3.5">
          <div className="px-2.5 pb-2 font-mono text-[10px] uppercase tracking-[.1em] text-[#A6ADB8]">Workspace</div>
          <div className="flex flex-col gap-0.5">
            {WORKSPACE.map((item) => (
              <NavRow key={item.key} item={item} active={active === item.key} onNavigate={close} />
            ))}
          </div>
          <div className="px-2.5 pb-2 pt-[18px] font-mono text-[10px] uppercase tracking-[.1em] text-[#A6ADB8]">Resources</div>
          <div className="flex flex-col gap-0.5">
            {RESOURCES.map((item) => (
              <NavRow key={item.key} item={item} active={active === item.key || pathname?.startsWith(item.href) === true} onNavigate={close} />
            ))}
          </div>
        </div>

        <div className="border-t border-[#EEF0F3] p-3">
          <Link href="/dashboard/profile" onClick={close} className="flex items-center gap-2.5 rounded-[9px] p-2 transition-colors hover:bg-[#F4F5F7]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#DCE7FD] bg-[#ECF2FE] text-[13px] font-semibold text-[#1856C9]">VS</div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-[#0E1116]">Your account</div>
              <div className="text-[11px] text-[#9AA2AF]">Pro plan</div>
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A6ADB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5M7 9l5-5 5 5" /></svg>
          </Link>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && <div onClick={close} className="fixed inset-0 z-[80] bg-[rgba(14,17,22,.42)] md:hidden" aria-hidden="true" />}

      {/* ── Main column ─────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[62px] flex-shrink-0 items-center gap-3.5 border-b border-[#E8EAEE] bg-white/85 px-4 backdrop-blur-[12px]">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-[#E5E8EC] bg-white text-[#0E1116] transition hover:bg-[#F7F8FA] md:hidden"
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-[15px] font-semibold tracking-[-.01em] text-[#0E1116]">{title}</div>
            {desc && <div className="truncate text-[12px] text-[#8B93A1]">{desc}</div>}
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden w-[240px] cursor-text items-center gap-2 rounded-[8px] border border-[#E5E8EC] bg-white px-[11px] py-[7px] transition hover:border-[#D3D7DE] lg:flex">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9AA2AF" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <span className="flex-1 text-[13px] text-[#9AA2AF]">Search</span>
              <span className="rounded-[4px] border border-[#E5E8EC] px-[5px] py-px font-mono text-[10px] text-[#A6ADB8]">⌘K</span>
            </div>
            <button aria-label="Notifications" className="relative flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[8px] border border-[#E5E8EC] bg-white transition hover:bg-[#F7F8FA]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5A6472" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
              <span className="absolute right-2 top-[7px] h-1.5 w-1.5 rounded-full border-[1.5px] border-white bg-[#DC2626]" />
            </button>
            <Link href="/consultation" className="inline-flex flex-shrink-0 items-center gap-[7px] rounded-[8px] bg-[#0E1116] px-3.5 py-2 text-[13.5px] font-medium text-white transition hover:bg-[#23282F]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              <span className="hidden sm:inline">New consult</span>
            </Link>
          </div>
        </header>

        <main id="main-content" className="vs-scroll min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
