"use client";

import { useState } from "react";

export default function SupportPage() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    // Placeholder: just simulate success
    setStatus("Thanks! We will get back to you within 24 hours.");
    form.reset();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Support</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Contact us for assistance with documents, guidance, or consultations.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea name="message" required rows={4} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Send</button>
          {status && <span className="text-sm text-green-600 dark:text-green-400">{status}</span>}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">FAQs</h2>
        <ul className="mt-3 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
          <li>How do I create a document? Go to Documents/New and pick a category.</li>
          <li>How do I book a consultation? Visit the Consultation page and choose a lawyer.</li>
          <li>Can I get guidance in my language? Yes, we are adding multilingual support soon.</li>
        </ul>
      </div>
    </div>
  );
}
