"use client";

import React from "react";
import Link from "next/link";
import { LAWYERS } from "@/lib/lawyers";
import { useState } from "react";

export default function BookConsultationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const found = LAWYERS.find((l) => l.id === id);
  const lawyer =
    found || {
      id,
      name: "Adv. Sample Lawyer",
      practices: ["Civil", "Property"],
      experienceYears: 5,
      location: "Your City",
      fee: 0,
    };

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  async function onConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSuccess(null);
    // Simulate booking API latency
    await new Promise((r) => setTimeout(r, 900));
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setSuccess(`Booking confirmed with ${lawyer.name}. Reference: BK-${code}`);
    setSubmitting(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Book consultation</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Schedule a session with {lawyer.name} ({lawyer.location}).</p>

      {success && (
        <div className="mt-4 rounded-md border border-green-600/30 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-900/30 dark:text-green-200">
          {success}
        </div>
      )}

      <div className="mt-6 rounded-lg border bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-2 md:grid-cols-2">
          <div><span className="text-zinc-500">Practice areas:</span> {lawyer.practices.join(", ")}</div>
          <div><span className="text-zinc-500">Experience:</span> {lawyer.experienceYears}+ yrs</div>
        </div>
      </div>

      <form onSubmit={onConfirm} className="mt-6 grid gap-3 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium">Name</label>
            <input required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-xs font-medium">Email</label>
            <input required type="email" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" placeholder="you@example.com" />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium">Date</label>
            <input required type="date" className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-xs font-medium">Time</label>
            <select required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800">
              <option>10:00 AM</option>
              <option>11:30 AM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium">Issue summary</label>
          <textarea required rows={4} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" placeholder="Briefly describe your issue" />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" disabled={submitting} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            {submitting ? "Confirming…" : "Confirm booking"}
          </button>
          <Link href={`/lawyers/${lawyer.id}`} className="text-xs underline underline-offset-4">View profile</Link>
          <span className="ml-auto text-xs text-zinc-500">Demo only</span>
        </div>
      </form>
    </div>
  );
}
