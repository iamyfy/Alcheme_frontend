import { useState, useCallback } from "react";
import type { LetterListItem } from "../api/letters";

type MailboxState = {
  letters: LetterListItem[];
  loading: boolean;
  error: string | null;
};

export function useMailbox() {
  const [state, setState] = useState<MailboxState>({
    letters: [],
    loading: false,
    error: null,
  });

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    // TODO (phase 2): listLetters().then(res => setState({ letters: res.items, loading: false, error: null }))
    //                              .catch(err => setState(s => ({ ...s, loading: false, error: err.message })))
  }, []);

  const markRead = useCallback((id: string) => {
    // TODO (phase 2): markLetterRead(id).then(() => setState(s => ({
    //   ...s,
    //   letters: s.letters.map(l => l.id === id ? { ...l, is_read: true } : l),
    // })))
    void id;
  }, []);

  return { ...state, reload, markRead };
}
