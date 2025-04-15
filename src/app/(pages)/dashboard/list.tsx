"use client";

import Note from "@/components/notes/note";
import { useNote } from "@/hooks/use-note";

export default function List() {
  const { notes } = useNote();

  return (
    <div className="flex sm:hidden flex-col gap-2 p-5">
      {notes?.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
}
