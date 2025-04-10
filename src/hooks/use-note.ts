"use client";

import { useNoteStore } from "@/core/states";
import { handleCreateEmptyNote, handleDeleteNote, handleGetMyNotes, handleUpdateNote } from "@/features/note-features";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tables } from "../../database.types";

type UseNoteReturn = {
  notes: Tables<"note">[] | null;
  loading: boolean;
  error: string | null;
  createNote: () => Promise<void>;
  readMyNotes: () => Promise<void>;
  updateNote: (id: string, updates: Partial<{ title: string; content: string; x: number; y: number }>) => Promise<void>;
  deleteNote: () => Promise<void>;
  currentNote: Tables<"note"> | undefined;
  editingTitle: string;
  editingContent: string;
  setEditingTitle: (title: string) => void;
  setEditingContent: (content: string) => void;
};

export function useNote(): UseNoteReturn {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id") as string | undefined;
  const { notes, _setNotes, _addNote, _updateNote, _deleteNote } = useNoteStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const createNote = async () => {
    setLoading(true);
    try {
      const { data, error } = await handleCreateEmptyNote();
      if (error) throw error;
      _addNote(data!);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const readMyNotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await handleGetMyNotes();
      if (error) throw error;
      _setNotes(data!);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id: string, updates: Partial<{ title: string; content: string; x: number; y: number }>) => {
    setLoading(true);
    try {
      const { data, error } = await handleUpdateNote(id, updates);
      if (error) throw error;
      _updateNote(id, data!);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    setLoading(true);
    try {
      const id = currentNote?.id;
      if (!id) throw new Error("Select a note to delete");
      const { error } = await handleDeleteNote(id);
      if (error) throw error;
      _deleteNote(id);
      toast("Note deleted successfully");
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readMyNotes();
  }, []);

  const currentNote = notes?.find((note) => note.id === noteId);

  return {
    notes,
    loading,
    error,
    createNote,
    readMyNotes,
    updateNote,
    deleteNote,
    currentNote,
    editingTitle,
    editingContent,
    setEditingTitle,
    setEditingContent,
  };
}
