import { ReactNode } from "react";
import Header from "./header";

export default function Container(props: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className={"flex-grow relative overflow-auto " + props.className}>{props.children}</div>
    </div>
  );
}
