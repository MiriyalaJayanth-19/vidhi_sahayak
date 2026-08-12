"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const userActions = [
  {
    title: "My Documents",
    description: "View and manage generated documents, templates, and drafts.",
    href: "/documents",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-500/10",
    borderLight: "border-blue-200/60 dark:border-blue-500/20",
  },
  {
    title: "Consultations",
    description: "Book, manage, or review your lawyer consultations.",
    href: "/consultation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-500/10",
    borderLight: "border-emerald-200/60 dark:border-emerald-500/20",
  },
  {
    title: "AI Legal Chat",
    description: "Ask questions about Indian law in any language — instantly.",
    href: "/chat",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    ),
    color: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50 dark:bg-violet-500/10",
    borderLight: "border-violet-200/60 dark:border-violet-500/20",
  },
  {
    title: "Browse Categories",
    description: "Explore legal topics with guidance, steps, and documents.",
    href: "/categories",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-500/10",
    borderLight: "border-amber-200/60 dark:border-amber-500/20",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const isSignedIn = Boolean(user);

  const stats = [
    { label: "Documents Created", value: isSignedIn ? "0" : "—", note: isSignedIn ? "Saved to your account" : "Sign in to track" },
    { label: "Consultations", value: isSignedIn ? "0" : "—", note: isSignedIn ? "Booked sessions" : "Sign in to track" },
    { label: "AI Conversations", value: isSignedIn ? "0" : "∞", note: isSignedIn ? "Your active sessions" : "Unlimited free" },
    { label: "Languages Supported", value: "12+", note: "Hindi, Telugu, Tamil…" },
  ];

  return (
    <div className="section-shell">
      {/* Header */}
      <div className="section-header">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Welcome Back</p>
        <h1 className="section-title">
          Your <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="section-lead">
          Access your documents, consultations, AI chat, and legal resources — all in one place.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5">
            <p className="text-2xl font-bold gradient-text">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</p>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {userActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group overflow-hidden card-surface p-6 hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${a.bgLight} border ${a.borderLight} mb-4`}>
              <span className={`bg-gradient-to-br ${a.color} bg-clip-text text-transparent`}>
                {a.icon}
              </span>
            </div>
            <h3 className="font-semibold text-base flex items-center gap-2">
              {a.title}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a.description}</p>
          </Link>
        ))}
      </div>

      {/* Role-Based Access */}
      <h2 className="text-lg font-semibold mb-5">Role-Based Access</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* User Dashboard */}
        <div className="relative overflow-hidden card-surface p-6">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">User Dashboard</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Documents, bookings, and templates</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              My documents and templates
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Consultation bookings
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Saved AI chat history
            </li>
          </ul>
          <Link href="/dashboard/user" className="inline-flex items-center gap-2 btn-primary px-5 py-2.5 text-sm font-medium">
            Open User Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Lawyer Dashboard */}
        <div className="relative overflow-hidden card-surface p-6">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Lawyer Dashboard</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Cases, payments, and verification</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Cases: open, in progress, attention needed
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Payments and invoices
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Verification and profile management
            </li>
          </ul>
          <Link href="/dashboard/lawyer" className="inline-flex items-center gap-2 btn-outline px-5 py-2.5 text-sm font-medium">
            Open Lawyer Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
