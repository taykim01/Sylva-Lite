import { ReactNode } from "react";
import Header from "./header";

export default function Container(props: {
  children: ReactNode;
  className?: string;
  teamCard?: boolean;
  teammateCard?: boolean;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className={"flex-grow relative " + props.className}>{props.children}</div>
    </div>
  );
}
