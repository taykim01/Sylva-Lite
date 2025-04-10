"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useNote } from "@/hooks/use-note";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { ChevronsRight, TrashIcon } from "lucide-react";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import { debounce } from "lodash";

export default function DrawerContainer() {
  const divRef = useRef<HTMLDivElement>(null);
  const { resetFocus } = useClickOutside({
    ref: divRef,
    redirectPath: `/dashboard`,
  });

  const { currentNote, deleteNote, updateNote } = useNote();
  const [dialog, setDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    debouncedUpdateTitle(currentNote?.id!, value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    debouncedUpdateContent(currentNote?.id!, value);
  };

  useEffect(() => {
    setTitle(currentNote?.title || "");
    setContent(currentNote?.content || "");
  }, [currentNote]);

  const date = new Date(currentNote?.created_at || "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const closeDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div
      ref={divRef}
      className={`fixed right-0 bg-white border-t-8 border-slate-500
      ${currentNote ? "translate-x-0" : "translate-x-full"}
      top-0 transition-all duration-500 bottom-0 w-1/2 max-w-[720px] flex flex-col`}
      style={{
        zIndex: 50,
        boxShadow: "-4px 0px 8px 0px #DADADA",
        visibility: currentNote ? "visible" : "hidden",
      }}
    >
      {currentNote && (
        <>
          <div className="pr-10 pl-4 pt-3 flex items-center justify-between">
            <Wrapper onClick={resetFocus}>
              <ChevronsRight size={20} className="text-slate-500" />
            </Wrapper>
          </div>
          <div className="px-10 pt-12 border-b border-slate-200">
            <div className="flex justify-between">
              <input
                className="text-sb28 text-slate-900 outline-none"
                defaultValue={title || ""}
                onChange={handleChange}
                placeholder="New Note"
              />
              <AlertDialog open={dialog} onOpenChange={setDialog}>
                <AlertDialogTrigger asChild>
                  <Wrapper>
                    <TrashIcon size={20} className="text-slate-500" />
                  </Wrapper>
                </AlertDialogTrigger>
                <AlertDialogContent style={{ zIndex: 9999 }}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button size="sm" variant="secondary" onClick={closeDialog}>
                      Cancel
                    </Button>
                    <Button size="sm" variant="destructive" onClick={deleteNote}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex gap-20 text-r14 pt-8 pb-7">
              <div className="text-slate-500">created at</div>
              <div className="text-slate-700">{date}</div>
            </div>
          </div>
          <div className="px-10 pt-8">
            <textarea
              className="text-r16 text-gray-900 resize-none outline-none w-full h-full overflow-hidden"
              value={content}
              onChange={handleContentChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </>
      )}
    </div>
  );
}
