import { useState, useEffect, useCallback } from "react";
import type { NoteListItem, NoteDetail } from "../api/notes";

type NotebookListState = {
  notes: NoteListItem[];
  loading: boolean;
  error: string | null;
};

export function useNotebook() {
  const [state, setState] = useState<NotebookListState>({
    notes: [],
    loading: false,
    error: null,
  });

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    // TODO (phase 2): listNotes().then(res => setState({ notes: res.items, loading: false, error: null }))
    //                             .catch(err => setState(s => ({ ...s, loading: false, error: err.message })))
  }, []);

  return { ...state, reload };
}

type NoteDetailState = {
  note: NoteDetail | null;
  loading: boolean;
  error: string | null;
};

export function useNoteDetail(id: string) {
  const [state, setState] = useState<NoteDetailState>({
    note: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!id) return;
    setState({ note: null, loading: true, error: null });
    // TODO (phase 2): getNoteDetail(id).then(note => setState({ note, loading: false, error: null }))
    //                                  .catch(err => setState({ note: null, loading: false, error: err.message }))
  }, [id]);

  return state;
}
