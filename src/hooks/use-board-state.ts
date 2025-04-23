"use client";

import {
  applyNodeChanges,
  NodeChange,
  Node,
  Edge,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import { Tables } from "@/database.types";
import { NoteNode } from "@/core/types";

const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: "#D0D5DD" },
};

interface UseBoardStateProps {
  notes: Tables<"note">[] | null;
  edges: Tables<"edge">[] | null;
  onMoveNote: (id: string, position: { x: number; y: number }) => Promise<void>;
  onCreateEdge: (
    sourceNoteId: string,
    targetNoteId: string,
    sourceHandle: Position,
    targetHandle: Position,
  ) => Promise<void>;
  onDeleteEdge: (id: string) => Promise<void>;
}

export function useBoardState({ notes, edges, onMoveNote, onCreateEdge, onDeleteEdge }: UseBoardStateProps) {
  const [nodes, setNodes] = useState<NoteNode[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (notes) {
      const noteNodes = notes.map((note: Tables<"note">) => ({
        id: note.id,
        type: "note",
        position: { x: note.x, y: note.y },
        data: { ...note },
      }));
      setNodes(noteNodes);
    }
  }, [notes]);

  useEffect(() => {
    if (edges) {
      const formattedEdges = edges.map((edge) => ({
        id: edge.id,
        source: edge.source_note_id || "",
        target: edge.target_note_id || "",
        sourceHandle: edge.source_handle,
        targetHandle: edge.target_handle,
        ...defaultEdgeOptions,
      }));
      setFlowEdges(formattedEdges);
    }
  }, [edges]);

  const onNodesChange = useCallback((changes: NodeChange<NoteNode>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onNodeDragStop = useCallback(
    async (e: React.MouseEvent, node: Node<Record<string, unknown>>) => {
      const { position, id } = node;
      const { x, y } = position;
      await onMoveNote(id, { x, y });
    },
    [onMoveNote],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setFlowEdges((eds) => applyEdgeChanges(changes, eds));
      changes.forEach((change) => {
        if (change.type === "remove") {
          onDeleteEdge(change.id);
        }
      });
    },
    [onDeleteEdge],
  );

  const onConnectStart = useCallback(() => {
    setIsConnecting(true);
  }, []);

  const onConnectEnd = useCallback(() => {
    setIsConnecting(false);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      setFlowEdges((eds) => addEdge({ ...params, ...defaultEdgeOptions }, eds));
      onCreateEdge(params.source!, params.target!, params.sourceHandle as Position, params.targetHandle as Position);
    },
    [onCreateEdge],
  );

  return {
    nodes,
    flowEdges,
    isConnecting,
    mounted,
    onNodesChange,
    onNodeDragStop,
    onEdgesChange,
    onConnectStart,
    onConnectEnd,
    onConnect,
  };
}
