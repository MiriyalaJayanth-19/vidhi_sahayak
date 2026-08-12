"use client";

import { useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

const faqs = [
  {
    q: "How do I create a legal document?",
    a: "Go to the Documents section, select a category (e.g., Rental Agreement, Affidavit), and fill in the form. A live preview will update as you type, and you can print or save as PDF.",
  },
  {
    q: "How do I book a lawyer consultation?",
    a: "Visit the Consultation page, browse verified lawyers by practice area, location, and fee range. Click \"Book\" to start the process.",
  },
  {
    q: "Is the AI legal advice legally binding?",
    a: "No. VidhiSahayak provides general legal information and guidance only. It is not a substitute for professional legal advice. Always consult a qualified lawyer for specific legal matters.",
  },
  {
    q: "Which languages are supported?",
    a: "The AI assistant supports 12+ Indian languages including English, Hindi, Telugu, Tamil, Bengali, Malayalam, Kannada, Gujarati, Punjabi, Marathi, and Urdu — both text and voice.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All communications are encrypted. Chat sessions are stored securely and are only accessible to you. We never share your data with third parties.",
  },
  {
    q: "How are lawyers verified?",
    a: "Lawyers on our platform submit their Bar Council enrollment number and documents. Our team verifies credentials before granting 'Verified' status.",
  },
];

const contactCards = [
  {
    title: "AI Chat Support",
    description: "Get instant answers from our AI assistant, available 24/7.",
    href: "/chat",
    cta: "Chat Now",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Email Support",
    description: "For detailed queries, reach out via email. We respond within 24 hours.",
    href: "mailto:support@vidhisahayak.in",
    cta: "Send Email",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Browse Help Topics",
    description: "Find step-by-step guides for all legal categories and features.",
    href: "/categories",
    cta: "View Categories",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function SupportPage() {
  const [status, setStatus] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = String(fd.get("message") || "");

    try {
      await apiClient.post("/support", { name, email, message });
      setStatus("✅ Your message has been sent. We'll get back to you within 24 hours.");
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setStatus(`Error sending message: ${msg}`);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">We&apos;re Here to Help</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Support <span className="gradient-text">Center</span>
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
          Get help with documents, guidance, consultations, or anything else. We&apos;re available 24/7 through AI chat.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
        {contactCards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-6 premium-shadow hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
          >
            <div className={`mx-auto inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} text-white mb-4 shadow-lg shadow-blue-500/10`}>
              {c.icon}
            </div>
            <h3 className="font-semibold text-base">{c.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-cyan-400 group-hover:gap-2.5 transition-all duration-300">
              {c.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold mb-1">Send a Message</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">We typically respond within 24 hours.</p>

          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-6 premium-shadow">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                placeholder="Describe how we can help..."
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-xl gradient-bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
              </button>
              {status && (
                <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  {status}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-bold mb-1">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Quick answers to common questions.</p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
