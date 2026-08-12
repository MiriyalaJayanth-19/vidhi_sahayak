"use client";

import Link from "next/link";

export default function LawyerDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Lawyer dashboard</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Manage your profile and cases, view payments, and use IPC references.
      </p>

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
        {/* Profile & Verification */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Profile & verification</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Law license number</li>
            <li>Proof of identity & recent photo (upload)</li>
            <li>Education and experience (years)</li>
            <li>Practicing court and office location</li>
            <li>Contact information</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link href="/dashboard/lawyer/profile" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              Edit profile
            </Link>
            <Link href="/dashboard/lawyer/verification" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Submit for verification
            </Link>
          </div>
        </div>

        {/* Cases */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Cases</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Open</li>
            <li>In progress</li>
            <li>Attention needed</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link href="/dashboard/lawyer/cases" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              View cases
            </Link>
            <Link href="/dashboard/lawyer/cases/new" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              Add new case
            </Link>
          </div>
        </div>

        {/* Payments & Invoices */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Payments & invoices</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Pending payments</li>
            <li>Completed payouts</li>
            <li>Download invoices</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link href="/dashboard/lawyer/payments" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              View payments
            </Link>
            <Link href="/dashboard/lawyer/invoices" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              View invoices
            </Link>
          </div>
        </div>

        {/* IPC sections reference */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">IPC sections reference</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Quickly look up IPC sections and constitutional articles. Use AI to fetch authoritative sources.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/chat" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Open AI reference
            </Link>
            <Link href="/consultation" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              Find co-counsel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
