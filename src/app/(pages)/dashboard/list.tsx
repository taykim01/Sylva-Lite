"use client";

import Note from "@/components/notes/note";
import { useNote } from "@/hooks/use-note";

export default function List() {
  const { notes, viewMode } = useNote();
  if (viewMode === "board") return;

  return (
    <div className="absolute inset-0 flex sm:flex-wrap flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 content-start p-5 overflow-y-auto bg-gray-50">
      {notes?.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
}
