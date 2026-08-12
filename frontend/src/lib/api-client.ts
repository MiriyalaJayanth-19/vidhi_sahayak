/**
 * Centralised fetch helper for the VidhiSahayak backend API.
 *
 * Usage:
 *   import { apiClient } from "@/lib/api-client";
 *   const data = await apiClient.post("/chat", { message, sessionId, lang });
 */

const BACKEND_URL =
  (typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL) || "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  token?: string | null;
  cache?: RequestCache;
};

async function request<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, cache } = opts;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Attach stored JWT if not explicitly passed
  const storedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("vs_token") : null);
  if (storedToken) {
    headers["Authorization"] = `Bearer ${storedToken}`;
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  // TTS returns audio/mpeg — handle non-JSON responses
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("audio")) {
    return res.blob() as unknown as T;
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...opts, method: "GET" }),

  post: <T = unknown>(path: string, body?: Record<string, unknown>, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...opts, method: "POST", body }),

  patch: <T = unknown>(path: string, body?: Record<string, unknown>, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...opts, method: "PATCH", body }),

  delete: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};

export const BACKEND_BASE = BACKEND_URL;
