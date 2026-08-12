"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const LANGS = [
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "हिंदी (Hindi)" },
  { code: "te-IN", label: "తెలుగు (Telugu)" },
  { code: "ta-IN", label: "தமிழ் (Tamil)" },
  { code: "bn-IN", label: "বাংলা (Bengali)" },
  { code: "ml-IN", label: "മലയാളം (Malayalam)" },
  { code: "kn-IN", label: "ಕನ್ನಡ (Kannada)" },
  { code: "gu-IN", label: "ગુજરાતી (Gujarati)" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

type Role = "user" | "lawyer";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const initialRole = (searchParams.get("role") as Role) || "user";
  const [role, setRole] = useState<Role>(initialRole);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    if (role === "lawyer") return "Create Lawyer Account";
    return "Create User Account";
  }, [role]);

  async function onSubmitUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const fullName = String(fd.get("full_name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    setLoading(true);
    const errorMessage = await signUp(fullName, email, password, "user");
    setLoading(false);

    if (errorMessage) {
      alert(`Sign up failed: ${errorMessage}`);
      return;
    }
    router.push("/dashboard");
  }

  async function onSubmitLawyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const fullName = String(fd.get("full_name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    // Register the account first, then they can fill in lawyer details on their profile page
    setLoading(true);
    const errorMessage = await signUp(fullName, email, password, "lawyer");
    setLoading(false);

    if (errorMessage) {
      alert(`Sign up failed: ${errorMessage}`);
      return;
    }
    router.push("/dashboard");
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {role === "user" && "Fill in your details and create a password to get started."}
        {role === "lawyer" && "Create an account to get started. You can complete your lawyer profile after signing in."}
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setRole("user")}
          className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition-all ${
            role === "user"
              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
              : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setRole("lawyer")}
          className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition-all ${
            role === "lawyer"
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          Lawyer
        </button>
      </div>

      {role === "user" && (
        <form
          onSubmit={onSubmitUser}
          className="mt-6 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input id="signup-fullname" name="full_name" required placeholder="Ravi Kumar" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input id="signup-email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input id="signup-password" name="password" type="password" required minLength={6} placeholder="At least 6 characters" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred language</label>
            <select name="preferred_language" className={inputClass}>
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
          <button
            id="signup-user-submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 text-sm font-medium"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
      )}

      {role === "lawyer" && (
        <form
          onSubmit={onSubmitLawyer}
          className="mt-6 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input id="signup-lawyer-fullname" name="full_name" required placeholder="Adv. Priya Sharma" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input id="signup-lawyer-email" name="email" type="email" required placeholder="lawyer@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input id="signup-lawyer-password" name="password" type="password" required minLength={6} placeholder="At least 6 characters" className={inputClass} />
          </div>
          <p className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
            📋 After registering, you can complete your professional profile (license number, experience, court, etc.) from your dashboard. Your profile will be reviewed before being listed publicly.
          </p>
          <button
            id="signup-lawyer-submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 text-sm font-medium"
          >
            {loading ? "Creating account…" : "Create Lawyer Account"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
        Already have an account?{" "}
        <a href="/auth/signin" className="underline hover:text-blue-600 dark:hover:text-cyan-400">
          Sign in
        </a>
      </p>
    </div>
  );
}
