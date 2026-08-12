export type Guidance = {
  whereToGet: string[];
  typeRequired: string[];
  verificationContacts: string[];
  submissionOffices: string[];
  printGuidance: string[];
  steps: string[];
};

// Minimal starter guidance derived from legaltech.txt structure.
// Extend these items as you provide more detailed content.
export const GUIDANCE: Record<string, Guidance> = {
  land: {
    whereToGet: ["Local sub-registrar office", "Revenue department website"],
    typeRequired: ["Sale deed / Gift deed / Partition deed (as applicable)", "ID proofs of parties"],
    verificationContacts: ["Licensed advocate", "Sub-registrar office"],
    submissionOffices: ["Sub-registrar office", "Municipal/Revenue department"],
    printGuidance: ["A4 bond paper", "Black ink, legible fonts"],
    steps: [
      "Collect ownership documents and encumbrance certificate",
      "Draft deed as per purpose (sale/gift/lease)",
      "Get stamp duty estimation",
      "Book appointment at sub-registrar",
      "Execute and register deed with witnesses",
    ],
  },
  agreement: {
    whereToGet: ["Template from legal services website", "Drafted by an advocate"],
    typeRequired: ["Parties' details", "Scope/terms, consideration, timelines"],
    verificationContacts: ["Advocate/Notary"],
    submissionOffices: ["Not required unless registration mandatory"],
    printGuidance: ["A4 paper", "Both party signatures on all pages"],
    steps: ["Draft terms", "Review risks", "Sign and notarize if needed"],
  },
  rental: {
    whereToGet: ["State's rent agreement portal", "Notary/Advocate"],
    typeRequired: ["Owner and tenant KYC", "Property details, rent, tenure"],
    verificationContacts: ["Notary public", "Lawyer"],
    submissionOffices: ["E-registration portal (state-wise)", "Sub-registrar if tenure>11 months (varies by state)"],
    printGuidance: ["Non-judicial stamp paper as per state", "Two witnesses"],
    steps: ["Draft agreement", "Calculate stamp duty", "E-register or notarize", "Share copies with parties"],
  },
  affidavit: {
    whereToGet: ["Notary office", "District court complex"],
    typeRequired: ["Declarant details", "Statement of facts"],
    verificationContacts: ["Notary public"],
    submissionOffices: ["As per use-case: university, bank, govt dept"],
    printGuidance: ["Non-judicial stamp paper (denomination varies)", "Sign before notary"],
    steps: ["Prepare draft", "Visit notary with ID", "Sign and notarize", "Submit to requesting authority"],
  },
  "income-declaration": {
    whereToGet: ["Chartered accountant", "Government forms"],
    typeRequired: ["Income sources", "Bank statements (if needed)"],
    verificationContacts: ["CA/Notary"],
    submissionOffices: ["As specified by requesting authority"],
    printGuidance: ["A4 paper", "Attest supporting documents"],
    steps: ["Collect proofs", "Draft declaration", "Notarize if required", "Submit"],
  },
  ipr: {
    whereToGet: ["IP India portal", "Patent/design/trademark agent"],
    typeRequired: ["Type: patent/design/trademark", "Owner details, description"],
    verificationContacts: ["Registered IP agent", "Lawyer"],
    submissionOffices: ["https://ipindia.gov.in"],
    printGuidance: ["Follow portal formats", "Annex drawings/specifications"],
    steps: ["Choose category", "Prepare specification", "File online", "Track examination"],
  },
  "application-form-creation": {
    whereToGet: ["Concerned department website", "CSC/e-Seva"],
    typeRequired: ["Applicant details", "Purpose-specific attachments"],
    verificationContacts: ["Helpline of department", "Facilitator"],
    submissionOffices: ["Online portal", "Local office"],
    printGuidance: ["A4 paper", "Attach photocopies as per checklist"],
    steps: ["Download latest form", "Fill carefully", "Attach required docs", "Submit online/offline"],
  },
  "design-patents": {
    whereToGet: ["IP India Designs Office", "Registered patent/design agent"],
    typeRequired: ["Novel design details", "Drawings/images"],
    verificationContacts: ["IP agent"],
    submissionOffices: ["IP India portal"],
    printGuidance: ["As per design rules", "High-quality prints of drawings"],
    steps: ["Prior art search", "Prepare drawings", "File application", "Respond to examination"],
  },
  copyright: {
    whereToGet: ["Copyright Office of India", "Online portal"],
    typeRequired: ["Work details (literary/artistic/software)", "Author/owner details"],
    verificationContacts: ["Lawyer/Agent"],
    submissionOffices: ["https://copyright.gov.in"],
    printGuidance: ["Digital submission preferred", "Attach source code extracts for software"],
    steps: ["Prepare work samples", "File online", "Track diary number", "Respond to objections"],
  },
  mou: {
    whereToGet: ["Advocate-drafted", "Templates reviewed by lawyer"],
    typeRequired: ["Party details", "Scope, deliverables, term"],
    verificationContacts: ["Lawyer"],
    submissionOffices: ["Not mandatory (kept between parties)"],
    printGuidance: ["A4 paper", "Initial every page"],
    steps: ["Draft terms", "Review", "Sign by both parties", "Notarize if needed"],
  },
  security: {
    whereToGet: ["Bank-prescribed formats", "Lawyer-drafted"],
    typeRequired: ["Type: pledge/mortgage/hypothecation", "Asset and borrower details"],
    verificationContacts: ["Bank/legal advisor"],
    submissionOffices: ["Bank/Registrar depending on instrument"],
    printGuidance: ["Stamp duty as per state", "Witness signatures"],
    steps: ["Choose instrument", "Draft terms", "Execute and register if applicable"],
  },
  surety: {
    whereToGet: ["Bank/company formats", "Notary"],
    typeRequired: ["Surety and principal details", "Obligations and limits"],
    verificationContacts: ["Bank/legal advisor"],
    submissionOffices: ["Bank/company"],
    printGuidance: ["Non-judicial stamp paper (as required)", "Witness signatures"],
    steps: ["Collect KYC", "Draft surety terms", "Execute and notarize if required"],
  },
};
