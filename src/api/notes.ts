import { apiRequest } from "./client";

// ── Request types ────────────────────────────────────────────────────────────

// ⚠ Phase 1 only: backend Zod schema actively rejects raw_input_type "voice"
// (returns 422 with code "VOICE_NOT_SUPPORTED"). Send "text" until phase 2.
export type DistillNotePayload = {
  raw_input_type: "text" | "voice";
  raw_input: string;
  second_input_type?: "text" | "voice";
  second_input?: string;
};

// ── Response types (match api-contract-v2026.05.20) ──────────────────────────

export type DistillNoteResult = {
  note_id: string;
  raw_input_type: "text" | "voice";
  raw_input: string;
  ai_distilled: string[];
  // DB columns are nullable; backend returns null (not absent) when unset
  second_input_type: "text" | "voice" | null;
  second_input: string | null;
  created_at: string;
};

export type NoteListItem = {
  id: string;
  preview: string;
  created_at: string;
};

export type NoteListResponse = {
  items: NoteListItem[];
  next_cursor: string | null;
};

export type NoteDetail = {
  id: string;
  raw_input_type: "text" | "voice";
  raw_input: string;
  raw_voice_url: string | null;
  ai_distilled: string[];
  // DB columns are nullable; backend returns null (not absent) when unset
  second_input_type: "text" | "voice" | null;
  second_input: string | null;
  second_voice_url: string | null;
  created_at: string;
};

// ⚠ GAP: no backend endpoint for persisting second_input yet.
// The backend router has no PATCH /v1/notes/:id route. Confirm with the
// backend team before wiring submitSecondInput in phase 2.
export type SecondInputPayload = {
  second_input_type: "text" | "voice";
  second_input: string;
};

// ── API functions (wired in phase 2) ─────────────────────────────────────────

export function distillNote(payload: DistillNotePayload): Promise<DistillNoteResult> {
  return apiRequest<DistillNoteResult>("/v1/notes/distill", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listNotes(): Promise<NoteListResponse> {
  return apiRequest<NoteListResponse>("/v1/notes");
}

export function getNoteDetail(id: string): Promise<NoteDetail> {
  return apiRequest<NoteDetail>(`/v1/notes/${id}`);
}

// ⚠ NOT WIRED — no backend route exists yet. Do NOT call in production.
// Remove this warning once backend confirms PATCH /v1/notes/:id is deployed.
export function submitSecondInput(
  noteId: string,
  payload: SecondInputPayload,
): Promise<NoteDetail> {
  return apiRequest<NoteDetail>(`/v1/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
