import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";
import { GUIDANCE } from "@/lib/guidance";

interface Props {
  params: { slug: string };
}

export default function CategoryDetailPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const g = GUIDANCE[params.slug];

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">The category you are looking for does not exist.</p>
        <div className="mt-4">
          <Link href="/categories" className="text-sm underline underline-offset-4">Back to categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{category.name}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Guidance, templates, verification, and submission steps for {category.name}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Guidance</h2>
          <div className="mt-2 grid grid-cols-1 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Where to get document</p>
              <ul className="list-inside list-disc">
                {(g?.whereToGet ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Type required</p>
              <ul className="list-inside list-disc">
                {(g?.typeRequired ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Whom to contact to verify</p>
              <ul className="list-inside list-disc">
                {(g?.verificationContacts ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Where to submit</p>
              <ul className="list-inside list-disc">
                {(g?.submissionOffices ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Print guidance</p>
              <ul className="list-inside list-disc">
                {(g?.printGuidance ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Steps</p>
              <ol className="list-inside list-decimal">
                {(g?.steps ?? ["To be provided"]).map((x, i) => (<li key={i}>{x}</li>))}
              </ol>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Actions</h2>
          <div className="mt-2 flex gap-2">
            <Link href="/documents/new" className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              Create document
            </Link>
            <Link href="/consultation" className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Book lawyer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
