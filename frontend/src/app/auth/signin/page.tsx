"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInEntryPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const errorMessage = await signIn(email, password);
    setLoading(false);
    if (errorMessage) {
      alert(`Sign in failed: ${errorMessage}`);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative max-w-lg text-white">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold text-xl mb-8">
            VS
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            Your AI-powered legal assistant for every Indian citizen
          </h2>
          <p className="mt-4 text-blue-100/80 leading-relaxed">
            Generate documents, get legal guidance, and connect with verified lawyers — all in your preferred language.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-4">
            {[
              { icon: "📄", text: "500+ legal document templates" },
              { icon: "🗣️", text: "12+ Indian languages supported" },
              { icon: "⚖️", text: "Verified lawyer consultations" },
              { icon: "🤖", text: "24/7 AI legal assistance" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm text-lg">
                  {f.icon}
                </span>
                <span className="text-sm text-blue-50/90">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-md shadow-blue-500/20">
              VS
            </span>
            <span className="text-lg font-semibold gradient-text">VidhiSahayak</span>
          </div>

          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your dashboard, documents, and consultations.
          </p>

          {/* Role Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/auth/signup?role=user"
              className="group rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-4 premium-shadow hover:premium-shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-sm font-semibold">User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get guidance &amp; documents</p>
            </Link>
            <Link
              href="/auth/signup?role=lawyer"
              className="group rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-4 premium-shadow hover:premium-shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <p className="text-sm font-semibold">Lawyer</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get verified &amp; consult</p>
            </Link>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400 dark:text-slate-500">or sign in</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Sign-in Form */}
          <form onSubmit={onSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>
            <button
              id="signin-submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 text-sm font-medium"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-blue-600 dark:hover:text-cyan-400">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-blue-600 dark:hover:text-cyan-400">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
