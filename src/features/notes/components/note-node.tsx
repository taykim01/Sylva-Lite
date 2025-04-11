import { NodeProps, Handle, Position, Connection } from "@xyflow/react";
import { Tables } from "@/database.types";
import { useNote } from "@/hooks/use-note";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import Wrapper from "./wrapper";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEdge } from "@/hooks/use-edge";

export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note"> & { isConnecting?: boolean };
  const { editNoteContent, selectNote, deleteNote } = useNote();
  const { createEdge } = useEdge();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const debounceTitle = useRef(
    debounce(async (newTitle) => {
      await editNoteContent(note.id, { title: newTitle });
    }, 300),
  ).current;

  const debounceContent = useRef(
    debounce(async (newContent) => {
      await editNoteContent(note.id, { content: newContent });
    }, 300),
  ).current;

  const dateToLocaleString = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

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
    <div
      onClick={() => selectNote(note.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-leaf-sm h-leaf-sm bg-white border-t-4 border-slate-500 flex flex-col gap-8 justify-between p-3 pb-4 cursor-pointer shadow relative"
    >
      <Handle
        id="node-right"
        type="source"
        position={Position.Right}
        onConnect={onConnect}
        style={{
          ...handleStyle,
          right: "-4px",
        }}
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
      />

      <div className="flex flex-col gap-2 h-full">
        <div className="w-full flex justify-between items-center">
          <div className="text-m14 text-slate-500 polymath">Note</div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Wrapper onClick={(e) => e.stopPropagation()}>
                <Ellipsis size={20} className="text-slate-300" />
              </Wrapper>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem variant="destructive" onClick={async () => await deleteNote(note.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <input
            className="text-m18 text-slate-800 outline-none w-full polymath"
            placeholder="New Note"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setTitle(newTitle);
              debounceTitle(newTitle);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <textarea
            className="text-r16 text-gray-700 resize-none outline-none w-full h-full overflow-hidden"
            value={content}
            onChange={(e) => {
              const newContent = e.target.value;
              setContent(newContent);
              debounceContent(newContent);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
    </div>
  );
}
