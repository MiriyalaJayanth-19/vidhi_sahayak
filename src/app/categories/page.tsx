import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">All Categories</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Browse legal topics to find guidance, templates, and submission steps.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c.slug} id={c.slug} className="rounded-lg border bg-white p-0 overflow-hidden shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {c.image && (
              <div className="relative h-28 w-full">
                <Image src={c.image} alt={c.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{c.name}</h2>
                <span className="text-zinc-400">#{c.slug}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {c.createHint || "Guidance, templates, and where to submit."}
              </p>
              <div className="mt-3 flex gap-3">
                <Link href={`/documents/${c.slug}`} className="text-sm underline underline-offset-4">
                  View details
                </Link>
                <Link href={`/documents/new?category=${encodeURIComponent(c.slug)}`} className="text-sm underline underline-offset-4">
                  Create document
                </Link>
                {c.image && (
                  <a href={c.image} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
                    Preview template
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
