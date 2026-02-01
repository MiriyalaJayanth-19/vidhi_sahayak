"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function SignInEntryPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sb = supabaseBrowser();
    if (!sb) {
      alert("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      const msg =
        error.message?.includes("security purposes")
          ? "Too many requests. Please wait ~60 seconds before trying again."
          : error.message;
      alert(`Sign in failed: ${msg}`);
      return;
    }
    // Ensure profile exists
    const userId = data.user?.id;
    if (userId) {
      await sb
        .from("profiles")
        .upsert({ id: userId, email: data.user.email }, { onConflict: "id" });
    }
    router.push("/dashboard");
  }

  async function onMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sb = supabaseBrowser();
    if (!sb) {
      alert("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
      },
    });
    setLoading(false);
    if (error) {
      const msg =
        error.message?.includes("security purposes")
          ? "Too many requests. Please wait ~60 seconds before requesting another magic link."
          : error.message;
      alert(`Magic link failed: ${msg}`);
      return;
    }
    alert("Magic link sent! Check your email to finish signing in.");
  }
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Welcome to VidhiSahayak</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Choose how you want to continue. You can create a new account or sign in if you already have one.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* User card */}
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">User</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Get guidance, create documents, and book consultations.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/auth/signup?role=user" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Create account
            </Link>
          </div>
        </div>

        {/* Lawyer card */}
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Lawyer</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Provide license, get verified, and offer consultations.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/auth/signup?role=lawyer" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Email / password sign in */}
      <div className="mt-10 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="font-medium">Already have an account?</h2>
        <form onSubmit={onSignIn} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800 md:col-span-1"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800 md:col-span-1"
          />
          <button
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200 md:col-span-1"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-2 text-xs text-zinc-500">If you just signed up and email confirmation is enabled, please confirm your email before signing in.</p>
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-medium">Or get a magic link</h3>
          <form onSubmit={onMagicLink} className="mt-2 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
            />
            <button
              disabled={loading}
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              {loading ? "Sending…" : "Send magic link"}
            </button>
          </form>
        </div>
      </div>

      <p className="mt-8 text-xs text-zinc-500">Note: Authentication will be connected in Phase 2 (Supabase Auth). For now, use Create account to proceed to role onboarding.</p>
    </div>
  );
}
