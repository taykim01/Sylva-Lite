import { NodeProps } from "@xyflow/react";
import Note from "./note";
import { Tables } from "../../database.types";

export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note">;

  return (
    <Note id={note.id} createdAt={note.created_at} onExpand={() => {}}>
      {note.title}
    </Note>
  );
}
