"use client";

import {
  applyNodeChanges,
  NodeChange,
  NodeDimensionChange,
  ReactFlow,
  Node,
  Edge,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback, useEffect, Suspense } from "react";
import { Tables } from "@/database.types";
import { useDemo } from "@/hooks/use-demo";
import { NoteNode } from "@/core/types";
import { DemoNoteNode } from "./demo-note-node";
import Spinner from "@/components/common/spinner";

const nodeTypes = { note: DemoNoteNode };

const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: "#D0D5DD" },
};

function BoardContent() {
  const { notes, moveNote, edges, deleteEdge, createEdge } = useDemo();
  const [nodes, setNodes] = useState<NoteNode[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (notes) {
      const noteNodes = notes.map((note: Tables<"note">) => ({
        id: note.id,
        type: "note",
        position: { x: note.x, y: note.y },
        data: { ...note, isConnecting },
      }));
      setNodes(noteNodes);
    }
  }, [notes, isConnecting]);

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
    await moveNote(id, { x, y });
  }, []);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setFlowEdges((eds) => applyEdgeChanges(changes, eds));
      changes.forEach((change) => {
        if (change.type === "remove") {
          deleteEdge(change.id);
        }
      });
    },
    [deleteEdge],
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
      createEdge(params.source!, params.target!, params.sourceHandle as Position, params.targetHandle as Position);
    },
    [createEdge],
  );

  return (
    <div style={{ width: "100%" }} className="h-[calc(100vh-40px)]">
      <ReactFlow
        style={{
          backgroundColor: "#FAFAFA",
          width: "100%",
          height: "100%",
        }}
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edges={flowEdges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeDragStop={onNodeDragStop}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

export function DemoBoard() {
  const { viewMode } = useDemo();
  if (viewMode === "list") return;

  return (
    <Suspense fallback={<Spinner />}>
      <BoardContent />
    </Suspense>
  );
}
