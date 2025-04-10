import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useNote } from "@/hooks/use-note";
import { debounce } from "lodash";

export default function Note(props: { id: string; createdAt: string; children: ReactNode; onExpand: () => void }) {
  const { currentNote, updateNote } = useNote();
  const [title, setTitle] = useState("");
  const dateToLocaleString = new Date(props.createdAt).toLocaleString("en-US", {
    dateStyle: "short",
  });

  const size = "w-leaf-sm h-leaf-sm";

  const handleExpand = () => {
    props.onExpand();
  };

  useEffect(() => {
    setTitle(currentNote?.title ?? "");
  }, [currentNote?.title]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    debounce(() => updateNote(props.id, { title: value }), 500);
  };

  return (
    <div
      onClick={handleExpand}
      className={`flex-shrink-0 ${size} bg-white border-t-4 border-slate-500 flex flex-col gap-8 justify-between p-3 pb-4 shadow-leaf cursor-pointer`}
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="text-m14 text-slate-500">Note</div>
        <div className="flex flex-col gap-3 h-full">
          <input
            className="text-m18 text-slate-800 outline-none w-full"
            placeholder="Enter title"
            onClick={(e) => e.stopPropagation()}
            value={title}
            onChange={handleChange}
          />
          {props.children}
        </div>
      </div>
      <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
    </div>
  );
}
