import { Tables } from "@/database.types";
import { ChangeEvent, useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DemoTextEditor } from "./demo-text-editor";
import { useSearchParams } from "next/navigation";
import { useDemo } from "@/hooks/use-demo";
import { Handles } from "../notes/handles";
import Wrapper from "../notes/wrapper";

export function DemoNote(props: Tables<"note"> & { handle?: boolean }) {
  const { selectNote, deleteNote, debounceUpdate, createEdge } = useDemo();
  const [isHovered, setIsHovered] = useState(false);
  const [noteSelected, setNoteSelected] = useState(false);
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id");

  const dateToLocaleString = new Date(props.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (noteSelected) {
      setShowOverlay(true);
    } else {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [noteSelected]);

  useEffect(() => {
    if (noteId === props.id) {
      setNoteSelected(true);
    } else {
      setNoteSelected(false);
    }
  }, [noteId]);

  const [title, setTitle] = useState(props?.title);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debounceUpdate(props.id, { title: newTitle });
  };
  useEffect(() => {
    setTitle(props?.title);
  }, [props?.title]);

  return (
    <>
      <div
        data-note-node
        onClick={() => selectNote(props.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-shrink-0 w-full sm:w-[240px] h-[240px] bg-white border-t-4 border-slate-500 p-3 pb-4 cursor-pointer shadow relative"
      >
        {props.handle && <Handles note={props} isHovered={isHovered} createEdge={createEdge} />}
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
                <DropdownMenuItem variant="destructive" onClick={async () => await deleteNote(props.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-3 h-full nowheel overflow-scroll">
            <input
              className="text-b18 text-slate-800 outline-none w-full polymath"
              placeholder="New Note"
              value={title}
              onChange={handleTitleChange}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-grow relative">
              <DemoTextEditor noteId={props.id} />
            </div>
          </div>
          <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
        </div>
      </div>
      {showOverlay && <div className="fixed sm:hidden inset-0 bg-black opacity-50 z-10 pointer-events-auto" />}
    </>
  );
}
