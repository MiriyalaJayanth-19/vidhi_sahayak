import Image from "next/image";

const TEMPLATES: Array<{ src: string; title: string; slug: string }> = [
  { src: "/images/categories/affidavit.jpg", title: "Affidavit", slug: "affidavit" },
  { src: "/images/categories/copyright.jpg", title: "Copyright Notice", slug: "copyright" },
  { src: "/images/categories/rental.jpg", title: "Lease / Rental Agreement", slug: "rental" },
  { src: "/images/categories/land.jpg", title: "Land Purchase Agreement", slug: "land" },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Templates (Preview)</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Preview the uploaded template images in the specified order. Click any image to open the full-sized file in a new tab.
      </p>

      <ol className="mt-6 grid list-decimal grid-cols-1 gap-4 pl-5 sm:grid-cols-2 md:grid-cols-3">
        {TEMPLATES.map((t, idx) => (
          <li key={t.slug} className="rounded-lg border bg-white p-0 overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
            <a href={t.src} target="_blank" rel="noreferrer" className="block">
              <div className="relative h-56 w-full">
                <Image src={t.src} alt={t.title} fill className="object-contain bg-zinc-50 dark:bg-zinc-900" />
              </div>
            </a>
            <div className="flex items-center justify-between p-3 text-sm">
              <div className="font-medium">{idx + 1}. {t.title}</div>
              <div className="text-xs text-zinc-500">{t.slug}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
