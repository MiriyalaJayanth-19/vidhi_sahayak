import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Auth Callback Handler
 *
 * Handles the token exchange when a user:
 *  - Clicks a Magic Link from their email
 *  - Returns from an OAuth provider (Google, GitHub, etc.)
 *  - Confirms their email after sign-up
 *
 * The `code` query param is exchanged for a session, which is stored
 * as HTTP-only cookies by the Supabase SSR client.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  if (code) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && anonKey) {
      const cookieStore = await cookies();

      const supabase = createServerClient(url, anonKey, {
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
              // Cookies can't be set in certain contexts — this is handled
              // by the proxy on the next request.
            }
          },
        },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Ensure the user has a profile row
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase.from("profiles").upsert(
            {
              id: user.id,
              email: user.email,
              role: "user",
            },
            { onConflict: "id", ignoreDuplicates: true }
          );
        }

        // Redirect to the intended destination
        const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/dashboard";
        return NextResponse.redirect(`${origin}${safeRedirect}`);
      }
    }
  }

  // If code exchange fails, redirect to sign-in with error hint
  return NextResponse.redirect(`${origin}/auth/signin?error=auth_callback_failed`);
}
