import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteState } from "../types";

const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      _setNotes: (notes) => set({ notes: notes }),
      _addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      _updateNote: (id, note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...note } : n)),
        })),
      _deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      _resetNotes: () => set({ notes: [] }),
    }),
    {
      name: "note-store",
    },
  ),
);

export default useNoteStore;
