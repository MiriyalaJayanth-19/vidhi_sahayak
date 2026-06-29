"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Routes that render their own <AppShell> (sidebar + topbar). On these we hide
 * the marketing navbar/footer/chat-widget. Grows as each screen is converted to
 * the redesign. Exact matches only — un-converted sub-routes keep the site chrome.
 */
const APP_ROUTES = new Set<string>(["/dashboard"]);

export function SiteChrome({
  navbar,
  footer,
  widget,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  widget: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const isApp = APP_ROUTES.has(pathname);

  if (isApp) {
    // AppShell supplies its own <main id="main-content"> and full-height layout.
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main id="main-content" className="flex-1">{children}</main>
      {footer}
      {widget}
    </>
  );
}
