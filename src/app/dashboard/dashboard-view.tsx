"use client";

import Link from "next/link";
import { useState } from "react";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2C8D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

function StatCard({ v, label, delta }: { v: string | number; label: string; delta: string }) {
  return (
    <div className="rounded-[13px] border border-[#E8EAEE] bg-white p-[17px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
      <div className="font-mono text-[10.5px] uppercase tracking-[.06em] text-[#9AA2AF]">{label}</div>
      <div className="mt-[7px] text-[28px] font-semibold leading-none tracking-[-.02em] text-[#0E1116]">{v}</div>
      <div className="mt-[7px] text-[11.5px] text-[#8B93A1]">{delta}</div>
    </div>
  );
}

export function DashboardView({
  isSignedIn,
  docCount,
  consultationCount,
  chatCount,
}: {
  isSignedIn: boolean;
  docCount: number;
  consultationCount: number;
  chatCount: number;
}) {
  const [role, setRole] = useState<"user" | "lawyer">("user");

  const userStats = [
    { v: isSignedIn ? docCount : "—", label: "Documents", delta: isSignedIn ? "Saved to your account" : "Sign in to track" },
    { v: isSignedIn ? consultationCount : "—", label: "Consultations", delta: isSignedIn ? "Booked sessions" : "Sign in to track" },
    { v: isSignedIn ? chatCount : "∞", label: "AI conversations", delta: isSignedIn ? "Across your sessions" : "Unlimited free" },
    { v: "12+", label: "Languages", delta: "Hindi · Telugu · Tamil…" },
  ];

  const lawyerStats = [
    { v: "14", label: "Active cases", delta: "2 need attention" },
    { v: "5", label: "Awaiting action", delta: "Due this week" },
    { v: "₹84,200", label: "Earnings · Aug", delta: "+18% MoM" },
    { v: "4.9", label: "Client rating", delta: "128 reviews" },
  ];

  const activity = [
    { dot: "#16A34A", title: "Rental agreement drafted", meta: "Rental · ready to print", time: "2h ago" },
    { dot: "#1856C9", title: "Consultation with Adv. R. Sharma", meta: "Property · 18 min", time: "Yesterday" },
    { dot: "#9A6A1A", title: "AI chat — security deposit", meta: "Tenancy · 6 messages", time: "2 days ago" },
    { dot: "#6A45C0", title: "Affidavit — name change", meta: "Affidavit · draft", time: "4 days ago" },
  ];

  const cases = [
    { title: "Sharma v. Verma", client: "R. Sharma", area: "Property dispute", status: "Needs attention", sc: "#B4231F", sb: "#FCEDED", updated: "Hearing in 2 days" },
    { title: "Estate of K. Rao", client: "M. Rao", area: "Succession", status: "In progress", sc: "#1856C9", sb: "#ECF2FE", updated: "Updated 1h ago" },
    { title: "ABC Pvt Ltd — NDA review", client: "ABC Pvt Ltd", area: "Contracts", status: "Open", sc: "#16794A", sb: "#E9F7EF", updated: "New today" },
    { title: "State v. A. Khan", client: "A. Khan", area: "Criminal defence", status: "In progress", sc: "#1856C9", sb: "#ECF2FE", updated: "Updated yesterday" },
  ];

  const seg = (r: "user" | "lawyer") =>
    `cursor-pointer rounded-[7px] px-3.5 py-1.5 text-[13px] font-medium transition ${role === r ? "bg-white text-[#0E1116] shadow-[0_1px_2px_rgba(14,17,22,.10)]" : "text-[#5A6472]"}`;

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-[26px] sm:px-8 sm:pb-12">
      {/* Header row */}
      <div className="mb-[22px] flex flex-col items-start justify-between gap-3.5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-[21px] font-semibold tracking-[-.02em] text-[#0E1116]">Welcome back</h2>
          <p className="mt-1 text-[13.5px] text-[#8B93A1]">Here&apos;s what&apos;s happening across your legal workspace.</p>
        </div>
        <div className="inline-flex w-full gap-0.5 rounded-[10px] border border-[#E5E8EC] bg-[#EEF0F3] p-[3px] sm:w-auto">
          <button onClick={() => setRole("user")} className={`flex-1 sm:flex-none ${seg("user")}`}>Individual</button>
          <button onClick={() => setRole("lawyer")} className={`flex-1 sm:flex-none ${seg("lawyer")}`}>Advocate</button>
        </div>
      </div>

      {/* ── Individual view ─────────────────────────────────── */}
      {role === "user" && (
        <div>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {userStats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <div className="rounded-[14px] border border-[#E8EAEE] bg-white shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <div className="flex items-center justify-between border-b border-[#EEF0F3] px-[18px] py-[15px]">
                  <h3 className="text-[14.5px] font-semibold text-[#0E1116]">Recent activity</h3>
                  <span className="cursor-pointer text-[12.5px] font-medium text-[#1856C9]">View all</span>
                </div>
                <div>
                  {activity.map((a) => (
                    <div key={a.title} className="flex cursor-pointer items-center gap-[13px] border-b border-[#F4F5F7] px-[18px] py-[13px] transition-colors last:border-0 hover:bg-[#FAFBFC]">
                      <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: a.dot }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-medium text-[#0E1116]">{a.title}</div>
                        <div className="mt-px text-[12px] text-[#9AA2AF]">{a.meta}</div>
                      </div>
                      <span className="flex-shrink-0 font-mono text-[11px] text-[#A6ADB8]">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming consultation */}
              <div className="rounded-[14px] border border-[#E8EAEE] bg-gradient-to-b from-[#FCFCFD] to-white p-[18px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10.5px] uppercase tracking-[.08em] text-[#9AA2AF]">Upcoming consultation</div>
                  <span className="rounded-[6px] border border-[#D2EEDD] bg-[#E9F7EF] px-[7px] py-0.5 font-mono text-[10.5px] font-semibold text-[#16794A]">Confirmed</span>
                </div>
                <div className="mt-3.5 flex items-center gap-3.5">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[11px] border border-[#DCE7FD] bg-[#ECF2FE] text-[15px] font-semibold text-[#1856C9]">RS</div>
                  <div className="flex-1">
                    <div className="text-[14.5px] font-semibold text-[#0E1116]">Adv. R. Sharma</div>
                    <div className="text-[12.5px] text-[#8B93A1]">Property &amp; Civil · Tomorrow, 4:30 PM · Video</div>
                  </div>
                  <Link href="/consultation" className="rounded-[8px] bg-[#0E1116] px-[15px] py-[9px] text-[13px] font-medium text-white transition hover:bg-[#23282F]">Join call</Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <div className="rounded-[14px] border border-[#E8EAEE] bg-white p-4 shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <h3 className="mb-3 text-[14.5px] font-semibold text-[#0E1116]">Quick actions</h3>
                <div className="flex flex-col gap-0.5">
                  <QuickAction href="/documents/new" tint="#E9F7EF" border="#D2EEDD" stroke="#16794A" label="Draft a document" icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>} />
                  <QuickAction href="/chat" tint="#ECF2FE" border="#DCE7FD" stroke="#1856C9" label="Ask AI Counsel" icon={<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />} />
                  <QuickAction href="/consultation" tint="#FBF1E4" border="#F2E2C9" stroke="#9A6A1A" label="Find a lawyer" icon={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>} />
                </div>
              </div>

              {/* Plan card */}
              <div className="overflow-hidden rounded-[14px] bg-[#0E1116] p-[18px] text-white">
                <div className="font-mono text-[10.5px] uppercase tracking-[.08em] text-[#8A93A1]">Your plan</div>
                <div className="mt-2 flex items-baseline gap-[7px]"><span className="text-[18px] font-semibold">Pro</span><span className="text-[12.5px] text-[#8A93A1]">₹499/mo</span></div>
                <div className="mt-3.5">
                  <div className="mb-1.5 flex justify-between text-[11.5px] text-[#A6ADB8]"><span>AI queries</span><span className="font-mono">Unlimited</span></div>
                  <div className="h-[5px] overflow-hidden rounded-[3px] bg-[#23282F]"><div className="h-full w-[64%] bg-[#1F6FEB]" /></div>
                  <div className="mb-1.5 mt-3 flex justify-between text-[11.5px] text-[#A6ADB8]"><span>Documents this month</span><span className="font-mono">7 / ∞</span></div>
                  <div className="h-[5px] overflow-hidden rounded-[3px] bg-[#23282F]"><div className="h-full w-[38%] bg-[#16A34A]" /></div>
                </div>
                <button className="mt-4 w-full cursor-pointer rounded-[8px] border border-white/[.16] bg-white/10 p-2 text-center text-[12.5px] font-medium text-white transition hover:bg-white/[.16]">Manage subscription</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Advocate view ───────────────────────────────────── */}
      {role === "lawyer" && (
        <div>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {lawyerStats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
            {/* Cases */}
            <div className="overflow-hidden rounded-[14px] border border-[#E8EAEE] bg-white shadow-[0_1px_2px_rgba(14,17,22,.03)]">
              <div className="flex items-center justify-between border-b border-[#EEF0F3] px-[18px] py-[15px]">
                <h3 className="text-[14.5px] font-semibold text-[#0E1116]">Your cases</h3>
                <div className="flex gap-1.5">
                  <span className="cursor-pointer rounded-[7px] border border-[#E5E8EC] bg-[#F1F3F6] px-2.5 py-1 text-[12px] font-medium text-[#0E1116]">All</span>
                  <span className="cursor-pointer rounded-[7px] px-2.5 py-1 text-[12px] font-medium text-[#5A6472] transition hover:bg-[#F4F5F7]">Attention</span>
                  <span className="cursor-pointer rounded-[7px] px-2.5 py-1 text-[12px] font-medium text-[#5A6472] transition hover:bg-[#F4F5F7]">Open</span>
                </div>
              </div>
              <div className="grid grid-cols-[1.5fr_1fr_auto] border-b border-[#EEF0F3] px-[18px] py-[9px] font-mono text-[10px] uppercase tracking-[.06em] text-[#A6ADB8]">
                <span>Matter</span><span>Status</span><span className="text-right">Updated</span>
              </div>
              {cases.map((c) => (
                <div key={c.title} className="grid cursor-pointer grid-cols-[1.5fr_1fr_auto] items-center border-b border-[#F4F5F7] px-[18px] py-[13px] transition-colors last:border-0 hover:bg-[#FAFBFC]">
                  <div className="min-w-0 pr-2">
                    <div className="text-[13.5px] font-semibold text-[#0E1116]">{c.title}</div>
                    <div className="mt-px text-[12px] text-[#9AA2AF]">{c.client} · {c.area}</div>
                  </div>
                  <div><span className="rounded-[6px] px-2 py-[3px] font-mono text-[10.5px] font-semibold" style={{ color: c.sc, background: c.sb }}>{c.status}</span></div>
                  <div className="text-right font-mono text-[11px] text-[#8B93A1]">{c.updated}</div>
                </div>
              ))}
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <div className="rounded-[14px] border border-[#E8EAEE] bg-white p-[18px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <h3 className="text-[14.5px] font-semibold text-[#0E1116]">Payouts</h3>
                <div className="mt-2 text-[30px] font-semibold tracking-[-.02em] text-[#0E1116]">₹84,200</div>
                <div className="mt-0.5 text-[12.5px] text-[#16794A]">+18% vs last month</div>
                <div className="my-[15px] h-px bg-[#EEF0F3]" />
                <div className="mb-[9px] flex justify-between text-[13px] text-[#5A6472]"><span>Cleared</span><span className="font-mono font-medium text-[#0E1116]">₹71,400</span></div>
                <div className="flex justify-between text-[13px] text-[#5A6472]"><span>Pending</span><span className="font-mono font-medium text-[#0E1116]">₹12,800</span></div>
                <Link href="/dashboard/lawyer/invoices" className="mt-4 block cursor-pointer rounded-[8px] border border-[#E5E8EC] p-[9px] text-center text-[13px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA]">View invoices</Link>
              </div>
              <div className="rounded-[14px] border border-[#E8EAEE] bg-white p-[18px] shadow-[0_1px_2px_rgba(14,17,22,.03)]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#D2EEDD] bg-[#E9F7EF]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16794A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                  <div><div className="text-[13.5px] font-semibold text-[#0E1116]">Bar Council verified</div><div className="text-[11.5px] text-[#9AA2AF]">Enrolment AP/1432/2013</div></div>
                </div>
                <div className="mt-3.5 text-[12.5px] leading-[1.55] text-[#5A6472]">Your profile is live and accepting consultations. Keep your availability up to date to rank higher.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickAction({ href, tint, border, stroke, label, icon }: { href: string; tint: string; border: string; stroke: string; label: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-[11px] rounded-[9px] p-2.5 transition-colors hover:bg-[#F4F5F7]">
      <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[8px]" style={{ background: tint, border: `1px solid ${border}` }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <span className="flex-1 text-[13.5px] font-medium text-[#1B2027]">{label}</span>
      <ArrowRight />
    </Link>
  );
}
