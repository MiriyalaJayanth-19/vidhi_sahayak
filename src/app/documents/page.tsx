import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";

export default function DocumentsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Choose a category to view details or create a document.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c.slug} className="rounded-lg border bg-white p-0 overflow-hidden shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {c.image && (
              <div className="relative h-28 w-full">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{c.name}</h2>
                <span className="text-zinc-400 text-xs">#{c.slug}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.createHint || "Guidance and templates."}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <Link className="underline underline-offset-4" href={`/documents/${c.slug}`}>View details</Link>
                <Link className="underline underline-offset-4" href={`/documents/new?category=${encodeURIComponent(c.slug)}`}>Create document</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
