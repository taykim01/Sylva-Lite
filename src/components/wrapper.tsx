/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export default function Wrapper(props: {
  children?: ReactNode;
  onClick?: (e?: any) => void;
}) {
  return (
    <div
      className="rounded-lg hover:bg-slate-100 duration-200 p-1 cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
