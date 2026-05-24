import { apiRequest } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LetterType = "review" | "recall" | "deepen" | "pattern" | "shift" | "absent";

export type LetterListItem = {
  id: string;
  type: LetterType;
  content: string;
  is_read: boolean;
  created_at: string;
};

export type LetterListResponse = {
  items: LetterListItem[];
  next_cursor: string | null;
};

export type MarkReadResult = {
  id: string;
  is_read: true;
  read_at: string;
};

// ── API functions (wired in phase 2) ─────────────────────────────────────────

export function listLetters(): Promise<LetterListResponse> {
  return apiRequest<LetterListResponse>("/v1/letters");
}

export function markLetterRead(id: string): Promise<MarkReadResult> {
  return apiRequest<MarkReadResult>(`/v1/letters/${id}/read`, { method: "POST" });
}

// Not explicitly defined in the contract — LetterDetailScreen uses list data
// passed down as props for phase 1. Add GET /v1/letters/:id if backend defines it.
export function getLetter(id: string): Promise<LetterListItem> {
  return apiRequest<LetterListItem>(`/v1/letters/${id}`);
}
