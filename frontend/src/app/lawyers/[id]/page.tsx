import React from "react";
import { LAWYERS } from "@/lib/lawyers";
import Link from "next/link";

export default function LawyerProfilePage({ params }: { params: Promise<{ id: string }> }) {
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{lawyer.name}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{lawyer.location} • {lawyer.practices.join(", ")} • {lawyer.experienceYears}+ yrs</p>
      <div className="mt-6 flex gap-2">
        <Link href="/consultation" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Back</Link>
        <Link href={`/consultation/book/${lawyer.id}`} className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Book</Link>
      </div>
    </div>
  );
}
