"use client";

import Link from "next/link";

export default function UserDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">User dashboard</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Access guidance, documents, consultations, search, and AI help.</p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-lg border bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-base font-medium">Speak to AI</h2>
        <Link
          href="/chat?speak=1"
          className="inline-flex items-center justify-center rounded-full bg-black px-8 py-6 text-lg font-medium text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <span className="mr-3" aria-hidden>🎤</span>
          Speak with AI
        </Link>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Opens chat. Mic permission is only requested if you press the mic there.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Documents and templates</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Create from templates</li>
            <li>Download/print-ready formats</li>
            <li>Track progress</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link href="/categories" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Browse categories</Link>
            <Link href="/chat" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Ask AI</Link>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Consultations and bookings</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Find verified lawyers</li>
            <li>Filter by practice, location, fee</li>
          </ul>
          <div className="mt-3">
            <Link href="/consultation" className="text-sm underline underline-offset-4">Open consultation</Link>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Search</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Use the site search and AI chat to quickly find relevant guidance.</p>
          <div className="mt-3 flex gap-2">
            <Link href="/" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Go to Home</Link>
            <Link href="/chat" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Open AI chat</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
