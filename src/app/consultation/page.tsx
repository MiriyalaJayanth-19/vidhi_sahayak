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

  const practices = useMemo(() => [
    "all", "Civil", "Property", "Contracts", "Criminal", "Cyber", "IPR", "Design Patents", "Trademarks", "Family", "Rental", "Corporate", "MOU", "Agreements",
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Trusted Professionals</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Lawyer <span className="gradient-text">Consultation</span>
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
          Browse verified lawyers by practice area, location, and fees. Booking and payments coming soon.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 mb-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, practice, location"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            aria-label="Search lawyers"
          />
        </div>
        <select
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
          aria-label="Filter by practice area"
        >
          {practices.map((p) => (
            <option key={p} value={p}>{p[0]?.toUpperCase()}{p.slice(1)}</option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
          aria-label="Filter by location"
        >
          {locations.map((l) => (
            <option key={l} value={l}>{l[0]?.toUpperCase()}{l.slice(1)}</option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          placeholder="Max fee (₹)"
          value={maxFee ?? ""}
          onChange={(e) => setMaxFee(e.target.value ? Number(e.target.value) : null)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
          aria-label="Maximum fee filter"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div key={l.id} className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 premium-shadow hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={img} alt={l.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                {/* Verified badge */}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 glass-card rounded-full px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Verified
                </div>
                {/* Fee badge */}
                <div className="absolute top-3 right-3 glass-card rounded-lg px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  ₹{l.fee}/session
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-base">{l.name}</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {l.location} • {l.practices.join(", ")} • {l.experienceYears}+ yrs
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/lawyers/${l.id}`} className="flex-1 text-center rounded-xl border border-slate-200 dark:border-slate-600 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300">
                    Profile
                  </Link>
                  <Link href={`/consultation/book/${l.id}`} className="flex-1 text-center rounded-xl gradient-bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/25 transition-all duration-300">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && items.length === 0 && (
        <div className="rounded-2xl glass-card p-8 text-center text-sm text-slate-500 dark:text-slate-400 premium-shadow mt-4">
          <svg className="mx-auto mb-3 text-slate-300 dark:text-slate-600" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          No lawyers match your filters. Try broadening your search.
        </div>
      )}
      {loading && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          Loading lawyers...
        </div>
      )}
      {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
