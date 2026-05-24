import { apiRequest } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LetterType = "review" | "recall" | "deepen" | "pattern" | "shift" | "absent";

export type LetterListItem = {
  id: string;
  type: LetterType;
  content: string;
  is_read: boolean;
  // read_at is null until the letter is first read (confirmed in lettersService.ts)
  read_at: string | null;
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

// ⚠ NO BACKEND ROUTE: GET /v1/letters/:id does not exist in the backend router.
// LetterDetailScreen must receive data via props (from the list) until the
// backend team adds this endpoint. Do NOT call this in production code.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getLetter(_id: string): Promise<LetterListItem> {
  return Promise.reject(new Error("GET /v1/letters/:id is not yet implemented by the backend"));
}
