import { NodeProps } from "@xyflow/react";
import { Tables } from "../../database.types";
import { useNote } from "@/hooks/use-note";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note">;
  const { editNoteContent, selectNote } = useNote();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const debounceTitle = useRef(
    debounce(async (newTitle) => {
      await editNoteContent(note.id, { title: newTitle });
    }, 300),
  ).current;

  const debounceContent = useRef(
    debounce(async (newContent) => {
      await editNoteContent(note.id, { content: newContent });
    }, 300),
  ).current;

  const dateToLocaleString = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

  return (
    <div
      onClick={() => selectNote(note.id)}
      className="flex-shrink-0 w-leaf-sm h-leaf-sm bg-white border-t-4 border-slate-500 flex flex-col gap-8 justify-between p-3 pb-4 cursor-pointer shadow"
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="text-m14 text-slate-500 polymath">Note</div>
        <div className="flex flex-col gap-3 h-full">
          <input
            className="text-m18 text-slate-800 outline-none w-full polymath"
            placeholder="New Note"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setTitle(newTitle);
              debounceTitle(newTitle);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <textarea
            className="text-r16 text-gray-700 resize-none outline-none w-full h-full overflow-hidden"
            value={content}
            onChange={(e) => {
              const newContent = e.target.value;
              setContent(newContent);
              debounceContent(newContent);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
    </div>
  );
}
