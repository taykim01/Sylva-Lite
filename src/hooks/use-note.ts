"use client";

import { useNoteStore } from "@/core/states";
import { handleCreateEmptyNote, handleDeleteNote, handleGetMyNotes, handleUpdateNote } from "@/features/note-features";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useNote() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id") as string | undefined;
  const { notes, _setNotes, _addNote, _updateNote, _deleteNote } = useNoteStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const moveNote = async (id: string, updates: Partial<{ title: string; content: string; x: number; y: number }>) => {
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

  const deleteNote = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await handleDeleteNote(id);
      if (error) throw error;
      _deleteNote(id);
      toast("Note deleted successfully");
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const editNoteContent = async (id: string, updates: Partial<{ title: string; content: string }>) => {
    _updateNote(id, updates);
    const debouncedUpdateNote = debounce(async (id: string, updates: Partial<{ title: string; content: string }>) => {
      try {
        const { error } = await handleUpdateNote(id, updates);
        if (error) throw error;
      } catch (error) {
        setError(error as string);
      }
    }, 500);
    debouncedUpdateNote(id, updates);
  };

  const debounceUpdate = useRef(
    debounce(async (id: string, updates: Partial<{ title: string; content: string }>) => {
      _updateNote(id, updates);
      try {
        const { error } = await handleUpdateNote(id, updates);
        if (error) throw error;
      } catch (error) {
        setError(error as string);
      }
    }, 300),
  ).current;

  const selectNote = (id: string) => {
    if (id === noteId) return;
    router.push(`/dashboard?note_id=${id}`);
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
    moveNote,
    deleteNote,
    currentNote,
    editNoteContent,
    selectNote,
    debounceUpdate,
  };
}
