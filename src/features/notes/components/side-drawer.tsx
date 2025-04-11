"use client";

import { useEffect, useRef, useState } from "react";
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
import Wrapper from "./wrapper";

export default function DrawerContainer() {
  const divRef = useRef<HTMLDivElement>(null);
  const { resetFocus } = useClickOutside({
    ref: divRef,
    redirectPath: `/dashboard`,
  });

  const { currentNote, deleteNote, editNoteContent } = useNote();
  const [dialog, setDialog] = useState(false);

  const date = new Date(currentNote?.created_at || "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!currentNote) setDialog(false);
  }, [currentNote]);

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
                className="text-sb28 text-slate-900 outline-none polymath"
                value={currentNote.title || ""}
                onChange={async (e) => await editNoteContent(currentNote.id, { title: e.target.value })}
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
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDialog(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await deleteNote(currentNote.id);
                        setDialog(false);
                      }}
                    >
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
              value={currentNote.content}
              onChange={async (e) => await editNoteContent(currentNote.id, { content: e.target.value })}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </>
      )}
    </div>
  );
}
