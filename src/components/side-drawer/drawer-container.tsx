import { ReactNode, useRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useNote } from "@/hooks/use-note";

export default function DrawerContainer(props: { children: ReactNode }) {
  const { currentNote } = useNote();
  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: divRef,
    redirectPath: `/dashboard`,
  });

  return (
    <div
      ref={divRef}
      className={`fixed right-0 bg-white border-t-8 border-slate-500
      ${currentNote ? "translate-x-0" : "translate-x-full"}
      top-0 transition-all duration-500 bottom-0 w-1/2 max-w-[720px] flex flex-col`}
      style={{
        zIndex: 50,
        boxShadow: "-4px 0px 8px 0px #DADADA",
      }}
    >
      {props.children}
    </div>
  );
}
