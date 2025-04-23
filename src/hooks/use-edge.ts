"use client";

import useEdgeStore from "@/core/states/edge.store";
import { handleCreateEdge, handleDeleteEdge, handleUpdateEdge } from "@/features/edge-features";
import { Position } from "@xyflow/react";
import { useState } from "react";
import { Tables } from "@/database.types";

export function useEdge() {
  const { edges, _addEdge, _updateEdge, _deleteEdge } = useEdgeStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEdge = async (
    sourceNoteId: string,
    targetNoteId: string,
    sourceHandle: Position,
    targetHandle: Position,
  ) => {
    setLoading(true);
    try {
      const { data, error } = await handleCreateEdge(sourceNoteId, targetNoteId, sourceHandle, targetHandle);
      if (error) throw error;
      _addEdge(data!);
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const updateEdge = async (id: string, updates: Partial<Tables<"edge">>) => {
    setLoading(true);
    try {
      const { data, error } = await handleUpdateEdge(id, updates);
      if (error) throw error;
      _updateEdge(id, data!);
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEdge = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await handleDeleteEdge(id);
      if (error) throw error;
      _deleteEdge(id);
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    edges,
    loading,
    error,
    createEdge,
    updateEdge,
    deleteEdge,
  };
}
