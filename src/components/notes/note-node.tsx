import { NodeProps } from "@xyflow/react";
import { Tables } from "@/database.types";
import { useNote } from "@/hooks/use-note";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEdge } from "@/hooks/use-edge";
import Wrapper from "./wrapper";
import { TextEditor } from "./text-editor";
import { Handles } from "./handles";

export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note"> & { isConnecting?: boolean };
  const { selectNote, deleteNote, selectiveDebounce } = useNote();
  const { createEdge } = useEdge();
  const [isHovered, setIsHovered] = useState(false);

  const dateToLocaleString = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

  return (
    <div
      data-note-node
      onClick={() => selectNote(note.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[240px] h-[240px] bg-white border-t-4 border-slate-500 p-3 pb-4 cursor-pointer shadow relative"
    >
      <Handles note={note} isHovered={isHovered} createEdge={createEdge} />
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
        <div className="flex flex-col gap-3 h-full nowheel overflow-scroll">
          <input
            className="text-b18 text-slate-800 outline-none w-full polymath"
            placeholder="New Note"
            value={note?.title}
            onChange={(e) => {
              const newTitle = e.target.value;
              selectiveDebounce(note.id, { title: newTitle });
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-grow relative">
            <TextEditor noteId={note.id} editorId={`note-node-editor-${note.id}`} />
          </div>
        </div>
        <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
      </div>
    </div>
  );
}
