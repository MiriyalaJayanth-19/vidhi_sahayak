import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white/60 py-8 dark:bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row">
        <p>© {new Date().getFullYear()} VidhiSahayak</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/support">Support</Link>
        </div>
      </div>
    </footer>
  );
}
