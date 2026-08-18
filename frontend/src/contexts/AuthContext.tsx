"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiClient } from "@/lib/api-client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "lawyer" | "consultant" | "admin";
  preferredLanguage: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  /** Sign in with email/password. Returns error message or null on success. */
  signIn: (email: string, password: string) => Promise<string | null>;
  /** Register a new account. Returns error message or null on success. */
  signUp: (fullName: string, email: string, password: string, role?: string) => Promise<string | null>;
  /** Clear session */
  signOut: () => void;
};

// ── Cookie helpers ─────────────────────────────────────────────────────────────

const COOKIE_NAME = "vs_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds (must match JWT_EXPIRES_IN)

/**
 * Write the auth token to a cookie with security attributes.
 * - SameSite=Strict : prevents CSRF — cookie is NOT sent on cross-site requests
 * - Secure          : cookie only sent over HTTPS in production
 * The cookie is also read by Next.js middleware (proxy.ts) for SSR route protection.
 */
function setAuthCookie(token: string) {
  const isProduction = process.env.NODE_ENV === "production";
  const secureFlag = isProduction ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict${secureFlag}`;
}

/** Remove the auth cookie on sign-out */
function clearAuthCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Strict`;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  loading: true,
  signIn: async () => null,
  signUp: async () => null,
  signOut: () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("vs_token");
    if (!storedToken) {
      setLoading(false);
      return;
    }
    setToken(storedToken);
    apiClient
      .get<{ user: AuthUser }>("/auth/me", { token: storedToken })
      .then(({ user }) => setUser(user))
      .catch(() => {
        // Token is expired or invalid — clear both stores
        localStorage.removeItem("vs_token");
        clearAuthCookie();
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      const data = await apiClient.post<{ token: string; user: AuthUser }>("/auth/login", {
        email,
        password,
      });
      // Store in localStorage (for API Bearer header) and in cookie (for SSR middleware)
      localStorage.setItem("vs_token", data.token);
      setAuthCookie(data.token);
      setToken(data.token);
      setUser(data.user);
      return null;
    } catch (err: unknown) {
      return err instanceof Error ? err.message : "Sign in failed.";
    }
  }, []);

  const signUp = useCallback(
    async (fullName: string, email: string, password: string, role = "user"): Promise<string | null> => {
      try {
        const data = await apiClient.post<{ token: string; user: AuthUser }>("/auth/register", {
          fullName,
          email,
          password,
          role,
        });
        // Store in localStorage (for API Bearer header) and in cookie (for SSR middleware)
        localStorage.setItem("vs_token", data.token);
        setAuthCookie(data.token);
        setToken(data.token);
        setUser(data.user);
        return null;
      } catch (err: unknown) {
        return err instanceof Error ? err.message : "Registration failed.";
      }
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("vs_token");
    clearAuthCookie();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
