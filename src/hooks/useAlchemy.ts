import { useState, useCallback } from "react";
import type { DistillNotePayload, DistillNoteResult } from "../api/notes";

type AlchemyState = {
  loading: boolean;
  result: DistillNoteResult | null;
  error: string | null;
};

const INITIAL: AlchemyState = { loading: false, result: null, error: null };

export function useAlchemy() {
  const [state, setState] = useState<AlchemyState>(INITIAL);

  const submit = useCallback((payload: DistillNotePayload) => {
    setState({ loading: true, result: null, error: null });
    // TODO (phase 2): replace with distillNote(payload).then/catch
    void payload;
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { ...state, submit, reset };
}
