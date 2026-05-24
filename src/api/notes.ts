import { apiRequest } from "./client";

// ── Request types ────────────────────────────────────────────────────────────

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
  second_input_type?: "text" | "voice";
  second_input?: string;
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
  second_input_type?: "text" | "voice";
  second_input?: string;
  second_voice_url?: string | null;
  created_at: string;
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
