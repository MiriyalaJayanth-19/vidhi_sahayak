"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

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
          `SALE/TRANSFER AGREEMENT — ${common.city}, dated ${common.date}`,
          `Seller: ${spec.seller}  Buyer: ${spec.buyer}`,
          `Property: ${spec.propertyDesc}`,
          `Consideration: ₹${spec.consideration}`,
          `Both parties agree to execute and register the final deed at the Sub‑Registrar office.`,
        ];
      case "rental":
        return [
          `RENTAL AGREEMENT — dated ${common.date}`,
          `Landlord: ${spec.landlord}  Tenant: ${spec.tenant}`,
          `Premises: ${spec.premises}`,
          `Term: ${spec.term} months  Rent: ₹${spec.rent}/month`,
          `Tenant shall maintain the premises; either party may terminate with notice as per terms.`,
        ];
      case "affidavit":
        return [
          `AFFIDAVIT — ${common.city || ""}, dated ${common.date}`,
          `${common.applicantName}, residing at ${common.address}, solemnly declares:`,
          `1) ${spec.purpose}`,
          `2) ${spec.statement1}`,
          `3) ${spec.statement2}`,
          `I affirm the above are true to the best of my knowledge and belief.`,
        ];
      case "income-declaration":
        return [
          `INCOME SELF‑DECLARATION — dated ${common.date}`,
          `I, ${common.applicantName}, as ${spec.relation}, declare my/our annual income is ₹${spec.annualIncome}.`,
          `This declaration is submitted to ${spec.forUse}.`,
        ];
      case "agreement":
        return [
          `SERVICE AGREEMENT — dated ${common.date}`,
          `Parties: ${spec.partyA} and ${spec.partyB}`,
          `Scope: ${spec.scope}`,
          `Payment: ${spec.payment}`,
          `Term & termination as mutually agreed; disputes subject to local jurisdiction.`,
        ];
      case "copyright":
        return [
          `COPYRIGHT NOTICE — ${spec.year} ${spec.owner}. All rights reserved.`,
          `This notice covers: ${spec.work}. Unauthorized copying, reproduction or distribution is prohibited.`,
        ];
      default:
        return [
          `${titleFor(slug)} — ${common.date}`,
          `Applicant: ${common.applicantName}, ${common.address}`,
        ];
    }
  }, [slug, common, spec]);

  return (
    <div className="whitespace-pre-wrap text-sm leading-6">
      {lines.join("\n")}
    </div>
  );
}

export default function NewDocumentPage() {
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

  const categoryOptions = CATEGORIES.map((c) => (
    <option key={c.slug} value={c.slug}>
      {c.name}
    </option>
  ));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create a Document</h1>
        <Link href="/documents" className="text-sm underline underline-offset-4">Back to Documents</Link>
      </div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Select a category and fill in the details. A live preview is shown on the right. Use Print to save as PDF.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Form */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm">Category
              <select className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900" value={slug} onChange={(e) => resetForSlug(e.target.value)}>
                {categoryOptions}
              </select>
            </label>

            <label className="text-sm">Applicant/Party Name
              <input className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900" value={common.applicantName} onChange={(e) => setCommon({ ...common, applicantName: e.target.value })} />
            </label>
            <label className="text-sm">Address
              <input className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900" value={common.address} onChange={(e) => setCommon({ ...common, address: e.target.value })} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm">City
                <input className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900" value={common.city} onChange={(e) => setCommon({ ...common, city: e.target.value })} />
              </label>
              <label className="text-sm">Date
                <input type="date" className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900" value={common.date} onChange={(e) => setCommon({ ...common, date: e.target.value })} />
              </label>
            </div>

            {/* Category-specific */}
            {fields.length > 0 && <div className="mt-2 border-t pt-3 text-sm dark:border-zinc-800">Category fields</div>}
            {fields.map((f) => (
              <label key={f.key} className="text-sm">
                {f.label}
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
                  placeholder={f.placeholder}
                  value={specState[f.key] || ""}
                  onChange={(e) => setSpecValue(f.key, e.target.value)}
                />
              </label>
            ))}

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                onClick={() => window.print()}
              >
                Print / Save PDF
              </button>
              <Link href={`/documents/${slug}`} className="text-sm underline underline-offset-4">View category details</Link>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-2 text-lg font-medium">Preview — {titleFor(slug)}</h2>
          <div className="rounded-md border p-3 text-sm leading-6 dark:border-zinc-800">
            <Template slug={slug} common={common} spec={specState} />
          </div>
          <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
            Note: This is a basic template for guidance only. For critical matters, consult a verified lawyer.
          </p>
        </div>
      </div>
    </div>
  );
}
