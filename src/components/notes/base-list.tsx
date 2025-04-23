"use client";

import { Tables } from "@/database.types";

interface BaseListProps {
  notes: Tables<"note">[] | null;
  viewMode: "board" | "list";
  noteComponent: React.ComponentType<Tables<"note">>;
}

export function BaseList({ notes, viewMode, noteComponent: NoteComponent }: BaseListProps) {
  if (viewMode === "board") return null;

  return (
    <div className="absolute inset-0 flex sm:flex-wrap flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 content-start p-5 overflow-y-auto bg-gray-50">
      {notes?.map((note) => (
        <NoteComponent key={note.id} {...note} />
      ))}
    </div>
  );
}
