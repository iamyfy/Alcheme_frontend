export type DistillNotePayload = {
  raw_input_type: "text" | "voice";
  raw_input: string;
  second_input_type?: "text" | "voice";
  second_input?: string;
};

// 第二轮接真实接口时在这里封装 /v1/notes/distill、/v1/notes、/v1/notes/:id。
