import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { LAWYERS } from "@/lib/lawyers";
import { GUIDANCE } from "@/lib/guidance";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const queryRaw = searchParams.q ?? "";
  const query = queryRaw.toLowerCase().trim();

  const filteredCategories = CATEGORIES.filter((c) => {
    const basicMatch = [c.name, c.slug].join(" ").toLowerCase().includes(query);
    if (basicMatch || !query) return basicMatch || !query;
    const g = GUIDANCE[c.slug as keyof typeof GUIDANCE];
    if (!g) return false;
    const haystack = [
      ...(g.whereToGet || []),
      ...(g.typeRequired || []),
      ...(g.verificationContacts || []),
      ...(g.submissionOffices || []),
      ...(g.printGuidance || []),
      ...(g.steps || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
  const filteredLawyers = LAWYERS.filter((l) =>
    [l.name, l.location, ...l.practices].join(" ").toLowerCase().includes(query)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">Search Results</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Results for: <span className="gradient-text">{queryRaw || "(empty)"}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <svg className="text-blue-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <h2 className="text-lg font-bold">Categories</h2>
            <span className="ml-auto text-xs font-medium text-slate-400">{filteredCategories.length} found</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filteredCategories.map((c) => {
              const g = GUIDANCE[c.slug as keyof typeof GUIDANCE];
              const snippet = g
                ? (g.steps?.[0] || g.whereToGet?.[0] || g.typeRequired?.[0] || "Guidance and templates")
                : "Guidance and templates";
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="group rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-5 text-sm premium-shadow hover:premium-shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{c.name}</p>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-slate-500 dark:text-slate-400 leading-relaxed">{snippet}</p>
                </Link>
              );
            })}
            {filteredCategories.length === 0 && (
              <div className="rounded-2xl glass-card p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No matching categories.
              </div>
            )}
          </div>
        </div>

        {/* Lawyers */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <svg className="text-cyan-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h2 className="text-lg font-bold">Lawyers</h2>
            <span className="ml-auto text-xs font-medium text-slate-400">{filteredLawyers.length} found</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filteredLawyers.map((l) => (
              <div key={l.id} className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-5 text-sm premium-shadow hover:premium-shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      {l.name}
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Verified
                      </span>
                    </p>
                    <p className="mt-1 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {l.practices.join(", ")} • {l.experienceYears}+ years • {l.location}
                    </p>
                  </div>
                  <span className="text-sm font-semibold gradient-text">₹{l.fee}/session</span>
                </div>
              </div>
            ))}
            {filteredLawyers.length === 0 && (
              <div className="rounded-2xl glass-card p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No matching lawyers.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
