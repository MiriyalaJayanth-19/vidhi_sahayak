"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lawyer } from "@/lib/lawyers";
import { AppShell } from "@/components/app-shell";

const TINTS = [
  { tint: "#ECF2FE", border: "#DCE7FD", text: "#1856C9" },
  { tint: "#E9F7EF", border: "#D2EEDD", text: "#16794A" },
  { tint: "#FBF1E4", border: "#F2E2C9", text: "#9A6A1A" },
  { tint: "#F1ECFB", border: "#E3D9F5", text: "#6A45C0" },
];

function initialsOf(name: string) {
  return name.replace(/^adv\.?\s*/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

const SLOTS = ["Today 4:30 PM", "Today 6:00 PM", "Tomorrow 11:00 AM", "Tomorrow 3:15 PM"];

export default function ConsultationPage() {
  const [q, setQ] = useState("");
  const [practice, setPractice] = useState("all");
  const [location, setLocation] = useState("all");
  const [maxFee, setMaxFee] = useState<number | null>(null);
  const [items, setItems] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"video" | "audio">("video");

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

  // Keep a valid selection as the list changes (UI state only)
  useEffect(() => {
    if (items.length === 0) { setSelectedId(null); return; }
    if (!selectedId || !items.some((l) => l.id === selectedId)) setSelectedId(items[0].id);
  }, [items, selectedId]);

  const selected = items.find((l) => l.id === selectedId) || null;

  return (
    <AppShell active="consultation" title="Consultation" desc="Browse and book verified advocates">
      <div className="flex flex-col md:h-full md:flex-row">
        {/* ── Browse ─────────────────────────────────────────────────────── */}
        <div className="vs-scroll min-w-0 flex-1 px-5 py-[22px] sm:px-7 md:overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-[9px] border border-[#E1E4E9] bg-white px-3 py-2 focus-within:border-[#1F6FEB]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9AA2AF" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, practice area, or city"
                className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-[#0E1116] outline-none placeholder:text-[#9AA2AF]"
                aria-label="Search lawyers"
              />
            </div>
            <select value={practice} onChange={(e) => setPractice(e.target.value)} className="cursor-pointer rounded-[9px] border border-[#E1E4E9] bg-white px-3 py-2 text-[13px] font-medium text-[#1B2027] outline-none" aria-label="Filter by practice area">
              {practices.map((p) => <option key={p} value={p}>{p === "all" ? "All practice areas" : p}</option>)}
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="cursor-pointer rounded-[9px] border border-[#E1E4E9] bg-white px-3 py-2 text-[13px] font-medium text-[#1B2027] outline-none" aria-label="Filter by city">
              {locations.map((l) => <option key={l} value={l}>{l === "all" ? "All cities" : l}</option>)}
            </select>
            <input
              type="number"
              min={0}
              placeholder="Max ₹/min"
              value={maxFee ?? ""}
              onChange={(e) => setMaxFee(e.target.value ? Number(e.target.value) : null)}
              className="w-[110px] rounded-[9px] border border-[#E1E4E9] bg-white px-3 py-2 text-[13px] text-[#0E1116] outline-none placeholder:text-[#9AA2AF] focus:border-[#1F6FEB]"
              aria-label="Maximum fee filter"
            />
          </div>

          <div className="my-3 flex items-center justify-between">
            <div className="text-[13px] text-[#8B93A1]">
              {loading ? "Loading advocates…" : <><span className="font-semibold text-[#0E1116]">{items.length}</span> verified advocate{items.length === 1 ? "" : "s"} available</>}
            </div>
          </div>

          {error && <p className="mt-2 text-[13px] text-[#B4231F]">{error}</p>}

          {/* List */}
          <div className="flex flex-col gap-2.5">
            {items.map((l, idx) => {
              const t = TINTS[idx % TINTS.length];
              const isSel = l.id === selectedId;
              return (
                <button
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className="flex items-center gap-3.5 rounded-[13px] border bg-white p-[14px] text-left transition"
                  style={{ borderColor: isSel ? "#0E1116" : "#E8EAEE", boxShadow: isSel ? "0 0 0 3px rgba(14,17,22,.06)" : "0 1px 2px rgba(14,17,22,.03)" }}
                  aria-pressed={isSel}
                >
                  <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[11px] text-[16px] font-semibold" style={{ background: t.tint, border: `1px solid ${t.border}`, color: t.text }}>{initialsOf(l.name)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[14.5px] font-semibold text-[#0E1116]">{l.name}</span>
                      <svg className="flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="#1F6FEB" aria-label="Verified"><path d="M9.5 1.5 11 0l1.5 1.5L14.5 1l1 2 2.2.3.3 2.2 2 1-1 2 1 2-2 1-.3 2.2-2.2.3-1 2-2-.5L11 24l-1.5-1.5-2 .5-1-2-2.2-.3-.3-2.2-2-1 1-2-1-2 2-1 .3-2.2L4.5 3l1-2 2 .5z" /><path d="m8 12 2.5 2.5L16 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="mt-0.5 truncate text-[12.5px] text-[#8B93A1]">{l.practices.join(", ")} · {l.location} · {l.experienceYears}+ yrs</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="font-mono text-[14px] font-semibold text-[#0E1116]">₹{l.fee}/min</div>
                  </div>
                </button>
              );
            })}

            {!loading && items.length === 0 && (
              <div className="rounded-[13px] border border-[#E8EAEE] bg-white p-8 text-center text-[13px] text-[#8B93A1]">
                No advocates match your filters. Try broadening your search.
              </div>
            )}
          </div>
        </div>

        {/* ── Booking detail ─────────────────────────────────────────────── */}
        <aside className="vs-scroll w-full flex-shrink-0 border-t border-[#E8EAEE] bg-white md:w-[348px] md:overflow-y-auto md:border-l md:border-t-0">
          {selected ? (
            <>
              <div className="px-6 pt-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] border border-[#DCE7FD] bg-[#ECF2FE] text-[20px] font-semibold text-[#1856C9]">{initialsOf(selected.name)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5"><span className="text-[17px] font-semibold text-[#0E1116]">{selected.name}</span></div>
                    <div className="mt-0.5 text-[12.5px] text-[#8B93A1]">{selected.practices[0]} · {selected.location}</div>
                  </div>
                </div>
                <p className="mt-3.5 text-[13px] leading-[1.6] text-[#5A6472]">Verified advocate practising {selected.practices.join(", ").toLowerCase()} in {selected.location}, with {selected.experienceYears}+ years of experience.</p>
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {[
                    { v: `${selected.experienceYears}+ yrs`, l: "Practising" },
                    { v: `₹${selected.fee}`, l: "Per minute" },
                    { v: selected.practices.length, l: "Practice areas" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-[10px] border border-[#EEF0F3] bg-[#FAFBFC] p-2.5 text-center">
                      <div className="text-[15px] font-semibold text-[#0E1116]">{s.v}</div>
                      <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[.04em] text-[#9AA2AF]">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[.08em] text-[#9AA2AF]">Consultation mode</div>
                <div className="mt-3 flex gap-2.5">
                  {(["video", "audio"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-[9px] border p-2.5 text-[13px] font-medium capitalize transition ${mode === m ? "border-[#0E1116] bg-[#0E1116] text-white" : "border-[#E1E4E9] bg-white text-[#5A6472] hover:border-[#D3D7DE] hover:text-[#0E1116]"}`}
                    >
                      {m === "video" ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      )}
                      {m}
                    </button>
                  ))}
                </div>

                <div className="mt-5 font-mono text-[10.5px] uppercase tracking-[.08em] text-[#9AA2AF]">Pick a slot</div>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {SLOTS.map((s) => (
                    <div key={s} className="cursor-pointer rounded-[9px] border border-[#E1E4E9] bg-white p-2.5 text-center text-[12.5px] font-medium text-[#1B2027] transition hover:border-[#0E1116] hover:bg-[#FAFBFC]">{s}</div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-[11px] border border-[#EEF0F3] bg-[#FAFBFC] p-3.5">
                  <div className="flex items-center justify-between text-[13px] text-[#5A6472]"><span>Rate</span><span className="font-mono font-semibold text-[#0E1116]">₹{selected.fee}/min</span></div>
                  <div className="mt-2 flex items-center justify-between text-[13px] text-[#5A6472]"><span>Est. 20 min</span><span className="font-mono font-semibold text-[#0E1116]">~₹{selected.fee * 20}</span></div>
                  <div className="my-3 h-px bg-[#EEF0F3]" />
                  <Link href={`/consultation/book/${selected.id}`} className="flex items-center justify-center gap-2 rounded-[9px] bg-[#0E1116] p-3 text-[14px] font-medium text-white transition hover:bg-[#23282F]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18" /><rect width="18" height="18" x="3" y="4" rx="2" /></svg>
                    Continue to booking
                  </Link>
                  <div className="mt-2.5 text-center text-[11px] text-[#A6ADB8]">Pay only for what you use · Refundable if no-show</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-[13px] text-[#8B93A1]">
              {loading ? "Loading advocates…" : "Select an advocate to see availability and book."}
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
