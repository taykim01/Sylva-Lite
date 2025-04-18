import { NodeProps } from "@xyflow/react";
import { Tables } from "@/database.types";
import { DemoNote } from "./demo-note";

export function DemoNoteNode({ data }: NodeProps) {
  const note = data as Tables<"note"> & { isConnecting?: boolean };

  return <DemoNote {...note} handle />;
}
