import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { LAWYERS } from "@/lib/lawyers";
import { GUIDANCE } from "@/lib/guidance";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const queryRaw = searchParams.q ?? "";
  const query = queryRaw.toLowerCase().trim();

  // Search categories by name/slug and also inside GUIDANCE text blocks
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Results for: <span className="font-medium">{queryRaw || "(empty)"}</span>
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {filteredCategories.map((c) => {
              const g = GUIDANCE[c.slug as keyof typeof GUIDANCE];
              const snippet = g
                ? (g.steps?.[0] || g.whereToGet?.[0] || g.typeRequired?.[0] || "Guidance and templates")
                : "Guidance and templates";
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="rounded-lg border bg-white p-4 text-sm shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{c.name}</p>
                    <span className="text-zinc-400">→</span>
                  </div>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">{snippet}</p>
                </Link>
              );
            })}
            {filteredCategories.length === 0 && (
              <div className="rounded-lg border bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                No matching categories.
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Lawyers</h2>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {filteredLawyers.map((l) => (
              <div key={l.id} className="rounded-lg border bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{l.name}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {l.practices.join(", ")} • {l.experienceYears}+ years • {l.location}
                    </p>
                  </div>
                  <span className="text-zinc-500">₹{l.fee}/session</span>
                </div>
              </div>
            ))}
            {filteredLawyers.length === 0 && (
              <div className="rounded-lg border bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                No matching lawyers.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
