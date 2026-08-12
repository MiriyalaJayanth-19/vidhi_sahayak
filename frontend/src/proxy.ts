import { NextResponse, type NextRequest } from "next/server";

/**
 * Routes that require authentication.
 * Unauthenticated users hitting these paths are redirected to /auth/signin.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/documents"];

/**
 * Routes that authenticated users should NOT see (redirect to /dashboard).
 */
const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];

/**
 * Decode a JWT payload without verifying the signature.
 * Verification is done server-side in the Express backend.
 * Here we only need to check if a token *exists* and is *not expired* to
 * decide whether to redirect or not.
 */
function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;
    const decoded = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (payload.exp && payload.exp * 1000 < Date.now()) return false;
  return true;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read JWT from cookie (set on login) or Authorization header
  // Note: localStorage is not accessible in middleware — we rely on a cookie.
  const token =
    request.cookies.get("vs_token")?.value ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  const isAuthenticated = isTokenValid(token);

  // ── Protected routes: redirect to sign-in if not authenticated ──────────
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (isProtected && !isAuthenticated) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/auth/signin";
    signInUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // ── Auth routes: redirect to dashboard if already authenticated ─────────
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run middleware on all routes EXCEPT:
     *  - _next/static (static files)
     *  - _next/image (image optimization)
     *  - favicon.ico, icon.svg, sitemap, robots
     *  - Public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|images/).*)",
  ],
};
