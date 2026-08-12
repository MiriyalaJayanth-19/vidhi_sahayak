import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="section-shell">
      {/* Header */}
      <div className="section-header">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Legal Topics</p>
        <h1 className="section-title">
          All <span className="gradient-text">Categories</span>
        </h1>
        <p className="section-lead">
          Browse legal topics to find guidance, templates, and submission steps.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c.slug} id={c.slug} className="group overflow-hidden card-surface hover:-translate-y-1 transition-all duration-300">
            {c.image && (
              <div className="relative h-32 w-full overflow-hidden">
                <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-base">{c.name}</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500">#{c.slug}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {c.createHint || "Guidance, templates, and where to submit."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/documents/${c.slug}`} className="btn-primary px-3.5 py-1.5 text-xs font-medium">
                  View Details
                </Link>
                <Link href={`/documents/new?category=${encodeURIComponent(c.slug)}`} className="btn-outline px-3.5 py-1.5 text-xs font-medium">
                  Create Document
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
