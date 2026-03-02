import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-700/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-bg-primary opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand + tagline */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg gradient-bg-primary text-white font-bold text-xs shadow-md shadow-blue-500/20">
                VS
              </span>
              <span className="text-base font-semibold gradient-text">VidhiSahayak</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your AI-powered Indian Legal Assistant
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
              Terms
            </Link>
            <Link href="/support" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300">
              Support
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} VidhiSahayak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
