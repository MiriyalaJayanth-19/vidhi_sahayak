/**
 * Re-export the secure server client.
 *
 * Old code imported `getSupabaseClient()` from here — this wrapper
 * keeps backward compatibility while routing to the new cookie-aware
 * server client under the hood.
 *
 * Prefer importing from `@/lib/supabase-server` directly in new code.
 */
export { createSupabaseServer as getSupabaseClient } from "./supabase-server";
