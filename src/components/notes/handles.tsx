"use client";

import { Tables } from "@/database.types";
import { Connection, Position, Handle } from "@xyflow/react";

interface HandlesProps {
  note: Tables<"note"> & { isConnecting?: boolean };
  isHovered: boolean;
  createEdge: (source: string, target: string, sourceHandle: Position, targetHandle: Position) => void;
}

export function Handles({ note, isHovered, createEdge }: HandlesProps) {
  const onConnect = (params: Connection) => {
    const { source, target, sourceHandle, targetHandle } = params;

    if (source === note.id) {
      createEdge(note.id, target, sourceHandle as Position, targetHandle as Position);
    } else if (target === note.id) {
      createEdge(source, note.id, sourceHandle as Position, targetHandle as Position);
    }
  };

  const handleStyle = {
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.2s ease-in-out",
    background: "#64748b",
    width: "8px",
    height: "8px",
  };

  const targetHandleStyle = {
    ...handleStyle,
    opacity: note.isConnecting && isHovered ? 1 : 0,
  };

  return (
    <>
      <Handle
        id="node-right"
        type="source"
        position={Position.Right}
        onConnect={onConnect}
        style={{
          ...handleStyle,
          right: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-left"
        type="source"
        position={Position.Left}
        onConnect={onConnect}
        style={{
          ...handleStyle,
          left: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-top"
        type="source"
        position={Position.Top}
        onConnect={onConnect}
        style={{
          ...handleStyle,
          top: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-bottom"
        type="source"
        position={Position.Bottom}
        onConnect={onConnect}
        style={{
          ...handleStyle,
          bottom: "-4px",
        }}
        className="hidden sm:block"
      />

      {/* Target Handles */}
      <Handle
        id="node-target-right"
        type="target"
        position={Position.Right}
        onConnect={onConnect}
        style={{
          ...targetHandleStyle,
          right: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-target-left"
        type="target"
        position={Position.Left}
        onConnect={onConnect}
        style={{
          ...targetHandleStyle,
          left: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-target-top"
        type="target"
        position={Position.Top}
        onConnect={onConnect}
        style={{
          ...targetHandleStyle,
          top: "-4px",
        }}
        className="hidden sm:block"
      />
      <Handle
        id="node-target-bottom"
        type="target"
        position={Position.Bottom}
        onConnect={onConnect}
        style={{
          ...targetHandleStyle,
          bottom: "-4px",
        }}
        className="hidden sm:block"
      />
    </>
  );
}
