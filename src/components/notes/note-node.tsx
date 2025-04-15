import { NodeProps } from "@xyflow/react";
import { Tables } from "@/database.types";
import Note from "./note";
export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note"> & { isConnecting?: boolean };

  return <Note {...note} handle />;
}
