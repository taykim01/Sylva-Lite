import { ReactNode } from "react";
import { DemoHeader } from "./demo-header";

export function DemoContainer(props: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <DemoHeader />
      <div className={"flex-grow relative overflow-auto " + props.className}>{props.children}</div>
    </div>
  );
}
