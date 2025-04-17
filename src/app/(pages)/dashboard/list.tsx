"use client";

import Note from "@/components/notes/note";
import { useNote } from "@/hooks/use-note";

export default function List() {
  const { notes, viewMode } = useNote();
  if (viewMode === "board") return;

  return (
    <div
      className="flex sm:flex-wrap flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 p-5 overflow-y-auto h-full sm:h-fit w-full"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {notes?.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
}
