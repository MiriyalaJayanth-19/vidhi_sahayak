import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for Server Components, Server Actions, and Route Handlers.
 *
 * This reads the user's auth cookies so that:
 *  - RLS policies can identify the user via auth.uid()
 *  - API routes process requests as the authenticated user, not anonymous
 *
 * Returns `null` only when env vars are missing (dev without Supabase).
 */
export async function createSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll is called from Server Components where cookies can't be set.
          // This is fine — the middleware handles refreshing tokens.
        }
      },
    },
  });
}
