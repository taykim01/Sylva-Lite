"use client";

import { useDemo } from "@/hooks/use-demo";
import { DemoNote } from "./demo-note";

export function DemoList() {
  const { notes, viewMode } = useDemo();
  if (viewMode === "board") return;

  return (
    <div className="absolute inset-0 flex sm:flex-wrap flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 content-start p-5 overflow-y-auto bg-gray-50">
      {notes?.map((note) => (
        <DemoNote key={note.id} {...note} />
      ))}
    </div>
  );
}
