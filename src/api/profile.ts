import { apiRequest } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type UserProfile = {
  id: string;
  onboarding_completed: boolean;
  timezone: string;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
};

// ── API functions (wired in phase 2) ─────────────────────────────────────────

export function getProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile");
}

export function updateTimezone(timezone: string): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ timezone }),
  });
}

export function completeOnboarding(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ onboarding_completed: true }),
  });
}

// Contract §3.1: call on login and on each note submission.
export function touchLastActiveAt(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ last_active_at: new Date().toISOString() }),
  });
}
