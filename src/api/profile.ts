import { apiRequest } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type UserProfile = {
  id: string;
  onboarding_completed: boolean;
  // nullable in DB schema (no NOT NULL constraint) — treat null as "not yet set"
  timezone: string | null;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
};

// ── API functions ─────────────────────────────────────────────────────────────
//
// ⚠ ARCHITECTURE NOTE: The Express backend has NO /v1/profile route.
// The profiles table is accessed directly via the Supabase JS client using RLS:
//   • SELECT own row: authenticated role can read profiles
//   • UPDATE own row: authenticated role can update timezone, onboarding_completed,
//     last_active_at (RLS policy restricts to auth.uid() = id)
//
// All functions below must be rewritten in phase 2 to use the Supabase JS client
// (supabase.from("profiles").select/update) rather than apiRequest().
// They are stubs here so callers compile; calling them will 404.
//
// Phase 2 rewrite target (supabase-js):
//   getProfile()         → supabase.from("profiles").select("*").single()
//   updateTimezone()     → supabase.from("profiles").update({ timezone }).eq("id", userId)
//   completeOnboarding() → supabase.from("profiles").update({ onboarding_completed: true })
//   touchLastActiveAt()  → supabase.from("profiles").update({ last_active_at: new Date().toISOString() })

export function getProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile"); // stub — replace with supabase-js in phase 2
}

export function updateTimezone(timezone: string): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ timezone }),
  }); // stub — replace with supabase-js in phase 2
}

export function completeOnboarding(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ onboarding_completed: true }),
  }); // stub — replace with supabase-js in phase 2
}

// Contract §3.1: call on login and on each note submission.
export function touchLastActiveAt(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/v1/profile", {
    method: "PATCH",
    body: JSON.stringify({ last_active_at: new Date().toISOString() }),
  }); // stub — replace with supabase-js in phase 2
}
