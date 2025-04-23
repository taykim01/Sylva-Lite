import { Tables } from "@/database.types";
import { Position } from "@xyflow/react";
import { useState } from "react";

export interface BaseEdgeStore {
  edges: Tables<"edge">[] | null;
  _addEdge: (edge: Tables<"edge">) => void;
  _updateEdge: (id: string, updates: Partial<Tables<"edge">>) => void;
  _deleteEdge: (id: string) => void;
}

export interface BaseEdgeOperations {
  createEdge: (
    sourceNoteId: string,
    targetNoteId: string,
    sourceHandle: Position,
    targetHandle: Position,
  ) => Promise<void>;
  updateEdge: (id: string, updates: Partial<Tables<"edge">>) => Promise<void>;
  deleteEdge: (id: string) => Promise<void>;
}

export function useBaseEdge(store: BaseEdgeStore, operations: BaseEdgeOperations) {
  const { edges, _deleteEdge } = store;
  const { createEdge: createEdgeOp, updateEdge: updateEdgeOp, deleteEdge: deleteEdgeOp } = operations;
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
      await createEdgeOp(sourceNoteId, targetNoteId, sourceHandle, targetHandle);
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
      await updateEdgeOp(id, updates);
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
      await deleteEdgeOp(id);
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
