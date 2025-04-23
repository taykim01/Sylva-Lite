"use client";

import { useNoteStore } from "@/core/states";
import { handleCreateEmptyNote, handleDeleteNote, handleUpdateNote } from "@/features/note-features";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useNote() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id") as string | undefined;
  const { notes, viewMode, _addNote, _updateNote, _deleteNote, _setViewMode } = useNoteStore();
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
      router.push("/dashboard");
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
    const prevNoteId = noteId;
    if (id === noteId) return;
    if (prevNoteId) {
      router.push("/dashboard");
      setTimeout(() => {
        router.push(`/dashboard?note_id=${id}`);
      }, 500);
    } else {
      router.push(`/dashboard?note_id=${id}`);
    }
  };

  const currentNote = notes?.find((note) => note.id === noteId);

  const toggleViewMode = () => {
    _setViewMode(viewMode === "board" ? "list" : "board");
  };

  return {
    notes: notes?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    loading,
    error,
    createNote,
    moveNote,
    deleteNote,
    currentNote,
    editNoteContent,
    selectNote,
    debounceUpdate,
    toggleViewMode,
    viewMode,
  };
}
