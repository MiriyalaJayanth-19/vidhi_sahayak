import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Legal Topics</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          All <span className="gradient-text">Categories</span>
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
          Browse legal topics to find guidance, templates, and submission steps.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c.slug} id={c.slug} className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 premium-shadow hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                <Link href={`/documents/${c.slug}`} className="rounded-xl gradient-bg-primary px-3.5 py-1.5 text-xs font-medium text-white shadow-sm shadow-blue-500/20 hover:shadow-md transition-all duration-300">
                  View Details
                </Link>
                <Link href={`/documents/new?category=${encodeURIComponent(c.slug)}`} className="rounded-xl border border-slate-200 dark:border-slate-600 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300">
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
