"use client";

import { Tables } from "@/database.types";
import { ChangeEvent, useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { Handles } from "../notes/handles";
import Wrapper from "../notes/wrapper";
import { Position } from "@xyflow/react";
import { DebouncedFunc } from "lodash";
import { BaseTextEditorProps } from "./base-text-editor";

type BaseNoteProps = {
  note: Tables<"note">;
  handle?: boolean;
  selectNote: (id: string) => void;
  deleteNote: (id: string) => Promise<void>;
  debounceUpdate: DebouncedFunc<
    (
      id: string,
      updates: Partial<{
        title: string;
        content: string;
      }>,
    ) => Promise<void>
  >;
  createEdge: (
    sourceNoteId: string,
    targetNoteId: string,
    sourceHandle: Position,
    targetHandle: Position,
  ) => Promise<void>;
  textEditorComponent: React.ComponentType<BaseTextEditorProps>;
  notes: Tables<"note">[];
  currentNote: Tables<"note"> | undefined;
};

export function BaseNote({
  note,
  handle,
  selectNote,
  deleteNote,
  debounceUpdate,
  createEdge,
  textEditorComponent: TextEditor,
  notes,
  currentNote,
}: BaseNoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [noteSelected, setNoteSelected] = useState(false);
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id");
  const [title, setTitle] = useState(note.title);
  const [showOverlay, setShowOverlay] = useState(false);

  const dateToLocaleString = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

  useEffect(() => {
    if (noteSelected) setShowOverlay(true);
    else setShowOverlay(false);
  }, [noteSelected]);

  useEffect(() => {
    setNoteSelected(noteId === note.id);
  }, [noteId, note.id]);

  useEffect(() => {
    setTitle(note.title);
  }, [note.title]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debounceUpdate(note.id, { title: newTitle });
  };

  return (
    <>
      <div
        data-note-node
        onClick={() => selectNote(note.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-shrink-0 w-full sm:w-[240px] h-[240px] bg-white border-t-4 border-slate-500 p-3 pb-4 cursor-pointer shadow relative"
      >
        {handle && <Handles note={note} isHovered={isHovered} createEdge={createEdge} />}
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
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteNote(note.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-3 h-full nowheel overflow-scroll no-scrollbar">
            <input
              className="text-b18 text-slate-800 outline-none w-full polymath"
              placeholder="New Note"
              value={title || ""}
              onChange={handleTitleChange}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-grow relative">
              <TextEditor noteId={note.id} notes={notes} debounceUpdate={debounceUpdate} currentNote={currentNote} />
            </div>
          </div>
          <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
        </div>
      </div>
      {showOverlay && <div className="fixed sm:hidden inset-0 bg-black opacity-50 z-10 pointer-events-auto" />}
    </>
  );
}
