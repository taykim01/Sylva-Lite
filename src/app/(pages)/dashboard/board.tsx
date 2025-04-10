"use client";

import { applyNodeChanges, NodeChange, NodeDimensionChange, ReactFlow, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback, useEffect, Suspense } from "react";
import { Tables } from "../../../../database.types";
import { useNote } from "@/hooks/use-note";
import { NoteNode } from "@/core/types";
import NoteNodeComponent from "@/components/note-node";
import Spinner from "@/components/spinner";

const nodeTypes = { note: NoteNodeComponent };

function BoardContent() {
  const { notes, updateNote } = useNote();
  const [nodes, setNodes] = useState<NoteNode[]>([]);
  useEffect(() => {
    const noteNodes =
      notes?.map((note: Tables<"note">) => ({
        id: note.id,
        type: "note",
        position: { x: note.x, y: note.y },
        data: note,
      })) || [];
    setNodes(noteNodes);
  }, [notes]);

  const onNodesChange = useCallback(
    async (changes: NodeChange<NoteNode>[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      const newPosition = (
        changes[0] as NodeDimensionChange & {
          position: { x: number; y: number };
        }
      ).position;
      if (!newPosition) return;
    },
    [setNodes],
  );

  const onNodeDragStop = useCallback(async (e: React.MouseEvent, node: Node<Record<string, unknown>>) => {
    const { position, id } = node;
    const { x, y } = position;
    await updateNote(id, { x, y });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      onNodeDragStop={onNodeDragStop}
      fitView
    />
  );
}

export default function Board() {
  return (
    <Suspense fallback={<Spinner />}>
      <BoardContent />
    </Suspense>
  );
}
