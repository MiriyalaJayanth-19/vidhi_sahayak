import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";

export default function DocumentsIndexPage() {
  return (
    <div className="section-shell">
      {/* Header */}
      <div className="section-header">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Document Center</p>
        <h1 className="section-title">
          Legal <span className="gradient-text">Documents</span>
        </h1>
        <p className="section-lead">
          Choose a category to view detailed guidance or start creating a document. All templates follow Indian legal standards.
        </p>
      </div>

      {/* Quick Create Bar */}
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 premium-shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Create</h2>
            <p className="text-sm text-blue-100/80 mt-1">Start generating a legal document right now — fill in the form and print.</p>
          </div>
          <Link
            href="/documents/new"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            Create New Document
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div
            key={c.slug}
            className="group overflow-hidden card-surface"
          >
            {c.image && (
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 glass-card rounded-full px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  Template
                </div>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-base">{c.name}</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">#{c.slug}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {c.createHint || "Guidance, templates, and step-by-step instructions."}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/documents/${c.slug}`}
                  className="flex-1 text-center btn-outline py-2 text-xs font-medium"
                >
                  View Details
                </Link>
                <Link
                  href={`/documents/new?category=${encodeURIComponent(c.slug)}`}
                  className="flex-1 text-center btn-primary py-2 text-xs font-medium"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
