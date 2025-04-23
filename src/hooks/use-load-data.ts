"use client";

import { handleGetEdges } from "@/features/edge-features";
import { handleGetMyNotes } from "@/features/note-features";
import { useState } from "react";
import useEdgeStore from "@/core/states/edge.store";
import useNoteStore from "@/core/states/note.store";

export function useLoadData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { _setEdges } = useEdgeStore();
  const { _setNotes } = useNoteStore();

  const readEdges = async () => {
    setLoading(true);
    try {
      const { data, error } = await handleGetEdges();
      if (error) throw error;
      _setEdges(data!);
    } catch (error) {
      setError(error as string);
      alert(error);
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

  return { readEdges, readMyNotes, loading, error };
}
