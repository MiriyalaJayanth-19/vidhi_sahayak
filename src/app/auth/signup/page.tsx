"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const LANGS = ["English", "Hindi"]; // extend later

type Role = "user" | "lawyer";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "user";
  const [role, setRole] = useState<Role>(initialRole);

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
    const lang = String(fd.get("preferred_language") || "English");
    const sb = supabaseBrowser();
    if (!sb) {
      alert("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    // Sign up user
    const { data: signUpData, error: signUpErr } = await sb.auth.signUp({ email, password });
    if (signUpErr) {
      alert(`Sign up failed: ${signUpErr.message}`);
      return;
    }
    const session = signUpData.session || (await sb.auth.getSession()).data.session;
    const userId = session?.user?.id;
    if (!userId) {
      alert("Check your email to confirm your account. After confirming, use Sign in to continue.");
      router.push("/auth/signin");
      return;
    }
    // Create profile row (RLS requires auth.uid() = id)
    const { error: profileErr } = await sb.from("profiles").insert({ id: userId, role: "user", full_name: fullName, email, preferred_language: lang });
    if (profileErr && profileErr.code !== "23505") {
      // ignore unique violation, else show
      console.warn("Profile insert error:", profileErr.message);
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
    const license = String(fd.get("license_number") || "");
    const education = String(fd.get("education") || "");
    const experienceYears = Number(fd.get("experience_years") || 0);
    const practicingCourt = String(fd.get("practicing_court") || "");
    const officeLocation = String(fd.get("office_location") || "");
    const contactInfo = String(fd.get("contact_info") || "");
    const sb = supabaseBrowser();
    if (!sb) {
      alert("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    const { data: signUpData, error: signUpErr } = await sb.auth.signUp({ email, password });
    if (signUpErr) {
      alert(`Sign up failed: ${signUpErr.message}`);
      return;
    }
    const session = signUpData.session || (await sb.auth.getSession()).data.session;
    const userId = session?.user?.id;
    if (!userId) {
      alert("Check your email to confirm your account. After confirming, use Sign in to continue.");
      router.push("/auth/signin");
      return;
    }
    // Create base profile
    const { error: profileErr } = await sb.from("profiles").insert({ id: userId, role: "lawyer", full_name: fullName, email });
    if (profileErr && profileErr.code !== "23505") {
      console.warn("Profile insert error:", profileErr.message);
    }
    // Create lawyer profile (pending verification)
    const { error: lpErr } = await sb.from("lawyer_profiles").insert({
      id: userId,
      license_number: license,
      verification_status: "pending",
      education,
      experience_years: experienceYears,
      practicing_court: practicingCourt,
      office_location: officeLocation,
      contact_info: contactInfo,
    });
    if (lpErr && lpErr.code !== "23505") {
      console.warn("Lawyer profile insert error:", lpErr.message);
    }
    router.push("/dashboard");
  }
  // no consultant

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {role === "user" && "Fill basic details, set a password, and choose your preferred language."}
        {role === "lawyer" && "Provide license and profile details for verification before listing."}
      </p>

      {/* Role switcher */}
      <div className="mt-4 flex gap-2">
        <button onClick={() => setRole("user")} className={`rounded-md border px-3 py-1.5 text-sm ${role === "user" ? "bg-zinc-100 dark:bg-zinc-900" : ""}`}>User</button>
        <button onClick={() => setRole("lawyer")} className={`rounded-md border px-3 py-1.5 text-sm ${role === "lawyer" ? "bg-zinc-100 dark:bg-zinc-900" : ""}`}>Lawyer</button>
      </div>

      {/* Forms */}
      {role === "user" && (
        <form onSubmit={onSubmitUser} className="mt-6 space-y-3 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input name="full_name" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Create password</label>
            <input name="password" type="password" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred language</label>
            <select name="preferred_language" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800">
              {LANGS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Continue</button>
        </form>
      )}

      {role === "lawyer" && (
        <form onSubmit={onSubmitLawyer} className="mt-6 space-y-3 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input name="full_name" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Create password</label>
            <input name="password" type="password" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-sm font-medium">Law license number</label>
            <input name="license_number" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          {/* Proof uploads can be added later using Supabase Storage */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Education</label>
              <input name="education" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
            </div>
            <div>
              <label className="block text-sm font-medium">Experience (years)</label>
              <input name="experience_years" type="number" min={0} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
            </div>
            <div>
              <label className="block text-sm font-medium">Practicing court</label>
              <input name="practicing_court" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
            </div>
            <div>
              <label className="block text-sm font-medium">Office location</label>
              <input name="office_location" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Contact information</label>
            <input name="contact_info" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Continue</button>
        </form>
      )}

      {/* consultant removed */}

      <p className="mt-6 text-xs text-zinc-500">Note: Authentication and storage will be connected in Phase 2 using Supabase Auth and Storage.</p>
    </div>
  );
}
