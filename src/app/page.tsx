import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import VoiceSearch from "@/components/voice-search";
import InlineVoiceAssistant from "@/components/inline-voice-assistant";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Hero */}
      <section className="border-b bg-linear-to-b from-zinc-50 to-white py-12 dark:from-zinc-950 dark:to-black">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Your Legal Assistant for Guidance, Documents, and Consultations
              </h1>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                Find answers faster, generate ready-to-print documents, and consult verified lawyers.
              </p>
              <div className="mt-6">
                <form action="/search" method="GET" className="flex flex-col gap-2 rounded-lg border bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:flex-row md:items-center">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search legal topics, e.g. rental agreement, affidavit"
                    className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Search
                  </button>
                  <div className="md:ml-2">
                    <VoiceSearch />
                  </div>
                </form>
                <div className="mt-3 flex gap-2">
                  <Link href="/documents/new" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Start a document</Link>
                  <Link href="/categories" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Browse categories</Link>
                  <a href="#voice" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Speak with AI</a>
                </div>
              </div>
            </div>
            <div className="relative hidden h-64 w-full overflow-hidden rounded-xl border bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 md:block">
              <Image
                src="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=1200&auto=format&fit=crop"
                alt="Professional legal assistance"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="voice" className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-semibold">Prefer speaking?</h2>
            <InlineVoiceAssistant />
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Lawyers</h2>
            <Link href="/consultation" className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                name: "Adv. R. Sharma",
                city: "Hyderabad",
                practices: "Property, Civil",
                fee: "₹1200",
                img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. S. Iyer",
                city: "Bengaluru",
                practices: "Contracts, Corporate",
                fee: "₹1500",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. P. Singh",
                city: "Mumbai",
                practices: "Criminal, Family",
                fee: "₹1000",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Adv. N. Gupta",
                city: "Delhi",
                practices: "IPR, Startup",
                fee: "₹1800",
                img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
              },
            ].map((l) => (
              <div key={l.name} className="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div className="relative h-40 w-full">
                  <Image src={l.img} alt={l.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-zinc-500">{l.city} • {l.practices}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href="/consultation" className="rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Consult</Link>
                    <Link href="/lawyers" className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Profile</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Popular Categories</h2>
            <Link href="/categories" className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/categories#${c.slug}`}
                className="group rounded-lg border bg-white p-0 overflow-hidden shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
              >
                {c.image && (
                  <div className="relative h-28 w-full">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{c.name}</p>
                    <span className="text-zinc-400 transition group-hover:text-zinc-900 dark:group-hover:text-zinc-100">→</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Guidance, templates, and submission steps</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="border-t bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold">Need help right now?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Our support team can guide you to the right document and process.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/support" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                Contact support
              </Link>
              <Link href="/consultation" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                Book consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
