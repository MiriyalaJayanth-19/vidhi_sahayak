import { createBrowserClient } from "@supabase/ssr";

/**
 * Singleton Supabase client for browser/client components.
 *
 * Uses @supabase/ssr which handles cookie-based auth automatically,
 * keeping sessions in sync across tabs and preventing token-refresh races.
 *
 * Returns `null` only when env vars are missing (dev without Supabase).
 */
let client: ReturnType<typeof createBrowserClient> | null = null;

export function supabaseBrowser() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  client = createBrowserClient(url, anonKey);
  return client;
}
