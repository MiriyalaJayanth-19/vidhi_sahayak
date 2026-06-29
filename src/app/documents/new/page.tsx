"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { AppShell } from "@/components/app-shell";

type CommonFields = {
  applicantName: string;
  address: string;
  date: string;
  city: string;
};

type CategorySpecific = Record<string, Record<string, string>>;

const DEFAULTS: Record<string, Partial<CommonFields>> = {
  land: { city: "", date: new Date().toISOString().slice(0, 10) },
  rental: { date: new Date().toISOString().slice(0, 10) },
  affidavit: { date: new Date().toISOString().slice(0, 10) },
  "income-declaration": { date: new Date().toISOString().slice(0, 10) },
  agreement: { date: new Date().toISOString().slice(0, 10) },
  copyright: { date: new Date().toISOString().slice(0, 10) },
};

const SPEC_FIELDS: Record<string, Array<{ key: string; label: string; placeholder?: string }>> = {
  land: [
    { key: "seller", label: "Seller Name" },
    { key: "buyer", label: "Buyer Name" },
    { key: "propertyDesc", label: "Property Description", placeholder: "Survey/Plot no., area, location" },
    { key: "consideration", label: "Consideration (Amount)" },
  ],
  rental: [
    { key: "landlord", label: "Landlord Name" },
    { key: "tenant", label: "Tenant Name" },
    { key: "premises", label: "Premises Address" },
    { key: "term", label: "Term (months)" },
    { key: "rent", label: "Monthly Rent" },
  ],
  affidavit: [
    { key: "purpose", label: "Affidavit Purpose", placeholder: "Name change / Lost document / Address proof" },
    { key: "statement1", label: "Statement 1" },
    { key: "statement2", label: "Statement 2" },
  ],
  "income-declaration": [
    { key: "relation", label: "Relation (Self/Parent/Guardian)" },
    { key: "annualIncome", label: "Annual Income (INR)" },
    { key: "forUse", label: "Purpose/Institution" },
  ],
  agreement: [
    { key: "partyA", label: "Party A" },
    { key: "partyB", label: "Party B" },
    { key: "scope", label: "Scope/Services" },
    { key: "payment", label: "Payment/Fees" },
  ],
  copyright: [
    { key: "owner", label: "Owner/Website Name" },
    { key: "work", label: "Work/Content Description" },
    { key: "year", label: "Year of Publication" },
  ],
};

function titleFor(slug: string) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat?.name || slug;
}

function Template({
  slug,
  common,
  spec,
}: { slug: string; common: CommonFields; spec: Record<string, string> }) {
  const lines = useMemo(() => {
    switch (slug) {
      case "land":
        return [
          `SALE/TRANSFER AGREEMENT — ${common.city || ""}, dated ${common.date}`,
          `Seller: ${spec.seller || ""}  Buyer: ${spec.buyer || ""}`,
          `Property: ${spec.propertyDesc || ""}`,
          `Consideration: ₹${spec.consideration || ""}`,
          `Both parties agree to execute and register the final deed at the Sub‑Registrar office.`,
        ];
      case "rental":
        return [
          `RENTAL AGREEMENT — dated ${common.date}`,
          `Landlord: ${spec.landlord || ""}  Tenant: ${spec.tenant || ""}`,
          `Premises: ${spec.premises || ""}`,
          `Term: ${spec.term || ""} months  Rent: ₹${spec.rent || ""}/month`,
          `Tenant shall maintain the premises; either party may terminate with notice as per terms.`,
        ];
      case "affidavit":
        return [
          `AFFIDAVIT — ${common.city || ""}, dated ${common.date}`,
          `${common.applicantName || ""}, residing at ${common.address || ""}, solemnly declares:`,
          `1) ${spec.purpose || ""}`,
          `2) ${spec.statement1 || ""}`,
          `3) ${spec.statement2 || ""}`,
          `I affirm the above are true to the best of my knowledge and belief.`,
        ];
      case "income-declaration":
        return [
          `INCOME SELF‑DECLARATION — dated ${common.date}`,
          `I, ${common.applicantName || ""}, as ${spec.relation || ""}, declare my/our annual income is ₹${spec.annualIncome || ""}.`,
          `This declaration is submitted to ${spec.forUse || ""}.`,
        ];
      case "agreement":
        return [
          `SERVICE AGREEMENT — dated ${common.date}`,
          `Parties: ${spec.partyA || ""} and ${spec.partyB || ""}`,
          `Scope: ${spec.scope || ""}`,
          `Payment: ${spec.payment || ""}`,
          `Term & termination as mutually agreed; disputes subject to local jurisdiction.`,
        ];
      case "copyright":
        return [
          `COPYRIGHT NOTICE — ${spec.year || ""} ${spec.owner || ""}. All rights reserved.`,
          `This notice covers: ${spec.work || ""}. Unauthorized copying, reproduction or distribution is prohibited.`,
        ];
      default:
        return [
          `${titleFor(slug)} — ${common.date}`,
          `Applicant: ${common.applicantName || ""}, ${common.address || ""}`,
        ];

    }
  }, [slug, common, spec]);

  return (
    <div className="whitespace-pre-wrap text-sm leading-6">
      {lines.join("\n")}
    </div>
  );
}

function NewDocumentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const initialSlug = params.get("category") || "affidavit";

  const [slug, setSlug] = useState<string>(initialSlug);
  const [common, setCommon] = useState<CommonFields>({
    applicantName: "",
    address: "",
    date: DEFAULTS[initialSlug]?.date || new Date().toISOString().slice(0, 10),
    city: DEFAULTS[initialSlug]?.city || "",
  });
  const [spec, setSpec] = useState<CategorySpecific>({});

  // Ensure URL reflects current selection
  useEffect(() => {
    const search = new URLSearchParams(Array.from(params.entries()));
    search.set("category", slug);
    router.replace(`/documents/new?${search.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fields = SPEC_FIELDS[slug] || [];
  const specState = spec[slug] || {};

  const setSpecValue = (k: string, v: string) => {
    setSpec((prev) => ({ ...prev, [slug]: { ...prev[slug], [k]: v } }));
  };

  const resetForSlug = (s: string) => {
    setSlug(s);
    setCommon((c) => ({
      ...c,
      date: DEFAULTS[s]?.date || c.date,
      city: DEFAULTS[s]?.city || c.city,
    }));
  };

  const [isSaving, setIsSaving] = useState(false);
  const saveDocument = async () => {
    setIsSaving(true);
    try {
      const sb = supabaseBrowser();
      if (!sb) {
        alert("Supabase not configured.");
        return;
      }
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        alert("Please sign in to save documents.");
        router.push("/auth/signin?redirectTo=/documents/new?category=" + slug);
        return;
      }

      const { data: catData } = await sb.from("categories").select("id").eq("slug", slug).single();
      
      const { error } = await sb.from("documents").insert({
        user_id: user.id,
        category_id: catData?.id || null,
        title: `${titleFor(slug)} - ${common.applicantName || 'Untitled'}`,
        content: { common, spec: specState },
        status: "draft"
      });

      if (error) throw error;
      alert("Document saved to your dashboard!");
    } catch (e: unknown) {
      alert("Error saving document: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setIsSaving(false);
    }
  };

  const categoryOptions = CATEGORIES.map((c) => (
    <option key={c.slug} value={c.slug}>
      {c.name}
    </option>
  ));

  const inputCls =
    "w-full rounded-[9px] border border-[#E1E4E9] bg-white px-[11px] py-[9px] text-[13.5px] text-[#0E1116] outline-none transition focus:border-[#1F6FEB] focus:shadow-[0_0_0_3px_rgba(31,111,235,.13)]";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-[#5A6472]";
  const stepCls = "font-mono text-[10.5px] uppercase tracking-[.08em] text-[#9AA2AF]";

  return (
    <AppShell active="documents" title="Documents" desc="Draft, manage and file legal documents">
      <div className="flex flex-col md:h-full md:flex-row">
        {/* ── Config panel ───────────────────────────────────────────────── */}
        <div className="vs-scroll w-full flex-shrink-0 border-b border-[#E8EAEE] bg-white p-[22px] md:w-[340px] md:overflow-y-auto md:border-b-0 md:border-r">
          <div className={stepCls}>Step 1 · Choose type</div>
          <select
            value={slug}
            onChange={(e) => resetForSlug(e.target.value)}
            className={`mt-2.5 cursor-pointer ${inputCls}`}
            aria-label="Document type"
          >
            {categoryOptions}
          </select>

          <div className={`mt-[22px] ${stepCls}`}>Step 2 · Party details</div>
          <div className="mt-3 flex flex-col gap-[13px]">
            <div>
              <label className={labelCls}>Applicant / Party name</label>
              <input className={inputCls} value={common.applicantName} onChange={(e) => setCommon({ ...common, applicantName: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Address</label>
              <input className={inputCls} value={common.address} onChange={(e) => setCommon({ ...common, address: e.target.value })} />
            </div>
            <div className="flex gap-[11px]">
              <div className="flex-1">
                <label className={labelCls}>City</label>
                <input className={inputCls} value={common.city} onChange={(e) => setCommon({ ...common, city: e.target.value })} />
              </div>
              <div className="flex-1">
                <label className={labelCls}>Date</label>
                <input type="date" className={inputCls} value={common.date} onChange={(e) => setCommon({ ...common, date: e.target.value })} />
              </div>
            </div>

            {fields.map((f) => (
              <div key={f.key}>
                <label className={labelCls}>{f.label}</label>
                <input
                  className={inputCls}
                  placeholder={f.placeholder}
                  value={specState[f.key] || ""}
                  onChange={(e) => setSpecValue(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-[18px] flex items-start gap-2.5 rounded-[11px] border border-[#DCE7FD] bg-[#ECF2FE] px-[13px] py-[11px]">
            <svg className="mt-px flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1856C9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
            <div className="text-[12px] leading-[1.5] text-[#1B3A82]">Templates follow Indian legal standards. Edit anything in the preview before downloading.</div>
          </div>

          <div className="mt-[18px] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-[9px] bg-[#0E1116] px-4 py-[11px] text-[14px] font-medium text-white transition hover:bg-[#23282F]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="m6 11 6 4 6-4" /><path d="M19 21H5" /></svg>
              Download PDF
            </button>
            <button
              type="button"
              onClick={saveDocument}
              disabled={isSaving}
              className="rounded-[9px] border border-[#E1E4E9] bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#0E1116] transition hover:bg-[#F7F8FA] disabled:opacity-50"
            >
              {isSaving ? "Saving…" : "Save to documents"}
            </button>
          </div>
        </div>

        {/* ── Preview ────────────────────────────────────────────────────── */}
        <div className="vs-scroll flex-1 bg-[#F1F2F4] p-5 md:overflow-y-auto md:p-8">
          <div className="mx-auto max-w-[660px]">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#8B93A1]">Live preview · A4</span>
              <span className="rounded-[6px] border border-[#DCE7FD] bg-[#ECF2FE] px-2 py-[3px] font-mono text-[10.5px] font-semibold text-[#1856C9]">{titleFor(slug)}</span>
            </div>

            <div className="rounded-[6px] border border-[#E1E3E7] bg-white p-7 shadow-[0_8px_30px_rgba(14,17,22,.10)] sm:p-[52px]">
              <h1 className="text-center text-[19px] font-bold uppercase tracking-[.02em] text-[#0E1116]">{titleFor(slug)}</h1>
              <div className="mx-auto my-3 mb-6 h-0.5 w-[42px] bg-[#0E1116]" />
              <div className="text-[13px] leading-[1.85] text-[#1B2027]">
                <Template slug={slug} common={common} spec={specState} />
              </div>
            </div>

            {/* Filing guidance */}
            <div className={`mt-5 ${stepCls}`}>Before you file</div>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[
                { t: "Stamp paper", x: "Execute on the stamp-paper value required in your state.", tint: "#FBF1E4", border: "#F2E2C9", stroke: "#9A6A1A", icon: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /></> },
                { t: "Registration", x: "Register at the Sub-Registrar office where applicable.", tint: "#E9F7EF", border: "#D2EEDD", stroke: "#16794A", icon: <><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></> },
                { t: "Attestation", x: "Notarise or attest as required for this document type.", tint: "#ECF2FE", border: "#DCE7FD", stroke: "#1856C9", icon: <><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></> },
              ].map((g) => (
                <div key={g.t} className="rounded-[11px] border border-[#E8EAEE] bg-white p-[13px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[8px]" style={{ background: g.tint, border: `1px solid ${g.border}` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={g.stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{g.icon}</svg>
                  </div>
                  <div className="mt-2.5 text-[13px] font-semibold text-[#0E1116]">{g.t}</div>
                  <div className="mt-0.5 text-[12px] leading-[1.45] text-[#8B93A1]">{g.x}</div>
                </div>
              ))}
            </div>

            <div className="mt-2.5 flex items-center gap-3.5 rounded-[12px] bg-[#0E1116] px-[18px] py-[15px]">
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-white">Want a lawyer to review it?</div>
                <div className="mt-0.5 text-[12px] text-[#9AA2AF]">A verified advocate can vet your draft before you sign.</div>
              </div>
              <Link href="/consultation" className="flex-shrink-0 rounded-[8px] bg-white px-[15px] py-[9px] text-[13px] font-medium text-[#0E1116] transition hover:bg-[#F1F3F6]">Get it reviewed · ₹31/min</Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function NewDocumentPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#F6F7F9]">
        <div className="flex items-center gap-2 text-sm text-[#5A6472]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1F6FEB] border-t-transparent" />
          Loading document builder…
        </div>
      </div>
    }>
      <NewDocumentContent />
    </Suspense>
  );
}
