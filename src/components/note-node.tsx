import { NodeProps } from "@xyflow/react";
import { Tables } from "../../database.types";
import { useRouter } from "next/navigation";
import { useNote } from "@/hooks/use-note";
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { debounce } from "lodash";

export default function NoteNode({ data }: NodeProps) {
  const note = data as Tables<"note">;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentNote, updateNote } = useNote();

  const selectNote = () => {
    router.push(`/dashboard?note_id=${note.id}`);
  };

  const dateToLocaleString = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "short",
  });

  useEffect(() => {
    setTitle(currentNote?.title ?? "");
    setContent(currentNote?.content ?? "");
  }, [currentNote?.title, currentNote?.content]);

  const debouncedUpdateTitle = useCallback(
    debounce(async (noteId: string, newTitle: string) => {
      await updateNote(noteId, { title: newTitle });
    }, 500),
    [updateNote],
  );

  const debouncedUpdateContent = useCallback(
    debounce(async (noteId: string, newContent: string) => {
      await updateNote(noteId, { content: newContent });
    }, 500),
    [updateNote],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    debouncedUpdateTitle(note.id, value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    debouncedUpdateContent(note.id, value);
  };

  return (
    <div
      onClick={selectNote}
      className="flex-shrink-0 w-leaf-sm h-leaf-sm bg-white border-t-4 border-slate-500 flex flex-col gap-8 justify-between p-3 pb-4 shadow-leaf cursor-pointer"
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="text-m14 text-slate-500">Note</div>
        <div className="flex flex-col gap-3 h-full">
          <input
            className="text-m18 text-slate-800 outline-none w-full"
            placeholder="Enter title"
            value={title}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
          />
          <textarea
            className="text-r16 text-gray-700 resize-none outline-none w-full h-full overflow-hidden"
            value={content}
            onChange={handleContentChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="text-r12 text-slate-500 flex justify-between">{dateToLocaleString}</div>
    </div>
  );
}
