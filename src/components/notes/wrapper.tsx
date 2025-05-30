import { ReactNode } from "react";

export default function Wrapper(props: {
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg hover:bg-slate-100 duration-200 p-1 h-fit cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
