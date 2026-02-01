import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Sign in to view your documents, consultations, and lawyer tools.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">User area</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>My documents and templates</li>
            <li>Consultations and bookings</li>
          </ul>
          <div className="mt-3">
            <Link href="/dashboard/user" className="text-sm underline underline-offset-4">Open user dashboard</Link>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Lawyer area</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Cases: open, in progress, attention needed</li>
            <li>Payments and invoices</li>
            <li>IPC sections reference</li>
          </ul>
          <div className="mt-3">
            <Link href="/dashboard/lawyer" className="text-sm underline underline-offset-4">Open lawyer dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
