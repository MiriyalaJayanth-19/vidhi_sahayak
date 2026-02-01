"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lawyer } from "@/lib/lawyers";
import Image from "next/image";

export default function ConsultationPage() {
  const [q, setQ] = useState("");
  const [practice, setPractice] = useState("all");
  const [location, setLocation] = useState("all");
  const [maxFee, setMaxFee] = useState<number | null>(null);
  const [items, setItems] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Static options for now; could be fetched from DB later
  const practices = useMemo(() => [
    "all",
    "Civil",
    "Property",
    "Contracts",
    "Criminal",
    "Cyber",
    "IPR",
    "Design Patents",
    "Trademarks",
    "Family",
    "Rental",
    "Corporate",
    "MOU",
    "Agreements",
  ], []);

  const locations = useMemo(() => ["all", "Hyderabad", "Bengaluru", "Mumbai", "Delhi", "Pune"], []);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchLawyers() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (practice && practice !== "all") params.set("practice", practice);
        if (location && location !== "all") params.set("location", location);
        if (maxFee) params.set("maxFee", String(maxFee));
        const res = await fetch(`/api/lawyers?${params.toString()}`, { signal: controller.signal });
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err: unknown) {
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        if (!isAbort) setError("Failed to load lawyers");
      } finally {
        setLoading(false);
      }
    }
    fetchLawyers();
    return () => controller.abort();
  }, [q, practice, location, maxFee]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Lawyer Consultation</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Browse verified lawyers by practice area, location, and fees. Booking and payments coming soon.
      </p>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, practice, location"
          className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
        />
        <select
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
        >
          {practices.map((p) => (
            <option key={p} value={p}>
              {p[0]?.toUpperCase()}
              {p.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
        >
          {locations.map((l) => (
            <option key={l} value={l}>
              {l[0]?.toUpperCase()}
              {l.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          placeholder="Max fee (₹)"
          value={maxFee ?? ""}
          onChange={(e) => setMaxFee(e.target.value ? Number(e.target.value) : null)}
          className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800"
        />
      </div>

      {/* Results */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((l, idx) => {
          const demoImgs = [
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=800&auto=format&fit=crop",
          ];
          const img = demoImgs[idx % demoImgs.length];
          return (
            <div key={l.id} className="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative h-40 w-full">
                <Image src={img} alt={l.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-medium">{l.name}</h2>
                    <p className="text-xs text-zinc-500">{l.location} • {l.practices.join(", ")} • {l.experienceYears}+ yrs</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/lawyers/${l.id}`} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Profile</Link>
                  <Link href={`/consultation/book/${l.id}`} className="rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Book</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!loading && items.length === 0 && (
        <div className="rounded-lg border bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          No lawyers match your filters.
        </div>
      )}
      {loading && <p className="mt-4 text-sm text-zinc-500">Loading…</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
