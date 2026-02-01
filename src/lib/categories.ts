export type Category = { slug: string; name: string; image?: string; createHint?: string };

export const CATEGORIES: Category[] = [
  { slug: "land", name: "Land", image: "/images/categories/land.jpg", createHint: "Sale deed, land purchase/sale agreement, gift deed, PoA, encumbrance certificate requests." },
  { slug: "agreement", name: "Agreement", image: "/images/categories/agreement.jpg", createHint: "Service agreement, NDA, partnership deed, consultancy, employment/offer letter." },
  { slug: "rental", name: "Rental", image: "/images/categories/rental.jpg", createHint: "House rent agreement, leave & license, commercial lease, rent receipt, notice to vacate." },
  { slug: "affidavit", name: "Affidavit", image: "/images/categories/affidavit.jpg", createHint: "Name change, address proof, identity proof, lost document, self‑declaration affidavits." },
  { slug: "income-declaration", name: "Income Declaration", createHint: "Self‑declaration of income for scholarships/reservations/hostel/admissions." },
  { slug: "ipr", name: "IPR", createHint: "Trademark application, copyright notice, license agreements, cease & desist." },
  { slug: "application-form-creation", name: "Application Form Creation", createHint: "Custom application forms for society, school, office, tenders, and registrations." },
  { slug: "design-patents", name: "Design Patents", createHint: "Design application cover, declaration, drawings list, and class details sheets." },
  { slug: "copyright", name: "Copyright", image: "/images/categories/copyright.jpg", createHint: "Copyright notice, assignment agreement, license grant, DMCA takedown letter." },
  { slug: "mou", name: "MOU", createHint: "Memorandum of Understanding between parties outlining intent and key terms." },
  { slug: "security", name: "Security", createHint: "Security bond, indemnity, surety undertakings, background verification consent." },
  { slug: "surety", name: "Surety", createHint: "Surety bond/undertaking for employment, tenancy, loans, and government forms." },
];
