import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";

function fallbackDetails(slug: string) {
  // Generic guidance derived from legaltech.txt
  return {
    guidance: [
      "Purpose and use cases of the document",
      "Key fields to fill and common mistakes to avoid",
      "Keep copies and supporting proofs ready",
    ],
    whereToGet: [
      "Download a template from this site or state portal",
      "Visit nearby eSeva/MeeSeva/Common Service Center if offline required",
    ],
    typesRequired: ["Self-attested ID proof", "Address proof", "Any supporting case/property details"],
    verification: ["Local notary/lawyer for attestation", "Concerned department staff for acceptance"],
    submission: [
      "Submit to the appropriate department (Tehsildar/Municipal/Registration office)",
      "Take an acknowledgement receipt",
    ],
    printing: ["Use A4 white bond paper", "Black ink, clear margins (1 inch)", "Sign on each page if required"],
    filling: [
      "Write names as per ID proofs",
      "Double-check dates, addresses, survey/door numbers",
      "Strike off non-applicable clauses",
    ],
  };
}

function categorySpecific(slug: string) {
  switch (slug) {
    case "land":
      return {
        guidance: ["Sale deed / gift deed / land purchase agreement basics", "Encumbrance certificate and property identifiers (survey no./plot no.)"],
        whereToGet: ["Sub-Registrar office forms", "Download template"],
        typesRequired: ["Seller & buyer ID/address proofs", "Property documents, tax receipts"],
        verification: ["Registered document at Sub-Registrar", "Lawyer/notary review"],
        submission: ["Sub-Registrar office on appointment"],
      };
    case "rental":
      return {
        guidance: ["Leave & License vs Rental—choose correct term", "Tenant/Owner details and duration"],
        whereToGet: ["Template here", "State e-registration portal (if available)"] ,
        typesRequired: ["Owner & tenant ID proofs", "Address proof of premises"],
        verification: ["Notarization if required by locality", "Police intimation as per state rules"],
        submission: ["Keep 2 signed copies for both parties"],
      };
    case "affidavit":
      return {
        guidance: ["Affidavit purpose: name change/lost docs/address proof", "Declarant’s details and statements"],
        whereToGet: ["Template here", "Notary/lawyer counters for stamping"],
        typesRequired: ["ID proof", "Any supporting evidence"],
        verification: ["Notary attestation"],
        submission: ["Submit to the department asking the affidavit"],
      };
    case "income-declaration":
      return {
        guidance: ["Self‑declaration for scholarship/reservation/hostel"],
        whereToGet: ["Template here"],
        typesRequired: ["Applicant ID", "Parent/guardian details"],
        verification: ["Institute/office may counter‑sign"],
        submission: ["Submit to the requesting institute/office"],
      };
    case "agreement":
      return {
        guidance: ["Define parties, scope, term, payment, termination"],
        whereToGet: ["Template here"],
        typesRequired: ["Parties’ IDs", "Scope/fee details"],
        verification: ["Lawyer review recommended for high‑value contracts"],
        submission: ["Execute in duplicate; share one signed copy each"],
      };
    case "copyright":
    case "ipr":
      return {
        guidance: ["Ownership, license or assignment terms", "Notice and takedown (DMCA) where applicable"],
        whereToGet: ["Template here", "IP India portal for filings"],
        typesRequired: ["Work details", "Owner details"],
        verification: ["Lawyer/IP agent review"],
        submission: ["IP office portal (for filings)"] ,
      };
    default:
      return {};
  }
}

export default function DocumentDetailsPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const base = fallbackDetails(slug);
  const spec = categorySpecific(slug);
  const details = {
    guidance: spec.guidance || base.guidance,
    whereToGet: spec.whereToGet || base.whereToGet,
    typesRequired: spec.typesRequired || base.typesRequired,
    verification: spec.verification || base.verification,
    submission: spec.submission || base.submission,
    printing: base.printing,
    filling: base.filling,
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-start gap-4">
        {cat?.image && (
          <div className="relative h-24 w-36 overflow-hidden rounded-md border dark:border-zinc-800">
            <Image src={cat.image} alt={cat.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold">{cat?.name || slug}</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{cat?.createHint || "Guidance and templates."}</p>
          <div className="mt-3 flex gap-3 text-sm">
            <Link className="underline underline-offset-4" href={`/documents/new?category=${encodeURIComponent(slug)}`}>Create document</Link>
            <Link className="underline underline-offset-4" href="/documents">Back to Documents</Link>
          </div>
        </div>
      </div>

      {cat?.image && (
        <div className="mt-6">
          <h2 className="text-lg font-medium">Template preview</h2>
          <a href={cat.image} target="_blank" rel="noreferrer" className="mt-2 block overflow-hidden rounded-md border dark:border-zinc-800">
            <div className="relative h-[420px] w-full bg-zinc-50 dark:bg-zinc-900">
              <Image src={cat.image} alt={`${cat.name} template`} fill className="object-contain" />
            </div>
          </a>
          <p className="mt-1 text-xs text-zinc-500">Click to open full size in a new tab.</p>
        </div>
      )}

      <div className="mt-8 space-y-6">
        <Section title="Guidance" items={details.guidance} />
        <Section title="Where to get" items={details.whereToGet} />
        <Section title="Type/Proofs required" items={details.typesRequired} />
        <Section title="Whom to contact/verify" items={details.verification} />
        <Section title="Where to submit" items={details.submission} />
        <Section title="Printing instructions" items={details.printing} />
        <Section title="How to fill" items={details.filling} />
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-lg font-medium">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
