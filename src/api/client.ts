const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// ── Typed error ───────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Auth token (phase 2: replace stub with Supabase session getter) ───────────

let _getAccessToken: (() => string | null) | null = null;

export function setTokenGetter(fn: () => string | null) {
  _getAccessToken = fn;
}

// ── Core request ──────────────────────────────────────────────────────────────

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = _getAccessToken?.();
  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
