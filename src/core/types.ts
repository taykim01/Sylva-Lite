import { Tables } from "../../database.types";

// User Store Types
export interface UserState {
  user: Tables<"user">;
  _setUser: (user: Tables<"user">) => void;
  _resetUser: () => void;
}

export interface NoteState {
  notes: Tables<"note">[];
  _setNotes: (notes: Tables<"note">[]) => void;
  _addNote: (note: Tables<"note">) => void;
  _updateNote: (id: string, note: Partial<Tables<"note">>) => void;
  _deleteNote: (id: string) => void;
  _resetNotes: () => void;
}

export interface Response<T> {
  data: T | null;
  error: string | null;
}

export interface NoteNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Tables<"note">;
}

export interface NoteNodeProps {
  data: Tables<"note">;
  isConnectable: boolean;
}
