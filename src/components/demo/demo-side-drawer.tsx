"use client";

import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
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
import { DemoTextEditor } from "./demo-text-editor";
import { useDemo } from "@/hooks/use-demo";
import Wrapper from "../notes/wrapper";

export function DemoSideDrawer() {
  const divRef = useRef<HTMLDivElement>(null);
  const { resetFocus } = useClickOutside({
    ref: divRef,
    redirectPath: `/demo`,
  });

  const { currentNote, deleteNote, editNoteContent } = useDemo();
  const [dialog, setDialog] = useState(false);

  const date = new Date(currentNote?.created_at || "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!currentNote) setDialog(false);
  }, [currentNote]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentNote) {
        resetFocus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentNote, resetFocus]);

  return (
    <div
      ref={divRef}
      className={`
        fixed right-0 bg-white border-t-8 border-slate-500
        ${
          currentNote
            ? "translate-y-[10%] sm:translate-x-0 sm:translate-y-0"
            : "translate-y-full sm:translate-x-full sm:translate-y-0"
        }
        top-0 transition-all duration-500 bottom-0 w-full sm:w-1/2 max-w-[720px] flex flex-col shadow-lg
      `}
      style={{
        zIndex: 50,
        visibility: currentNote ? "visible" : "hidden",
      }}
    >
      {currentNote && (
        <>
          <div className="sm:pr-10 sm:pl-4 sm:pt-3 flex items-center justify-between">
            <Wrapper onClick={resetFocus} className="hidden sm:block">
              <ChevronsRight className="text-slate-500 max-w-4 max-h-4 sm:max-w-5 sm:max-h-5" />
            </Wrapper>
          </div>
          <div className="px-5 sm:px-10 pt-8 sm:pt-12 border-b border-slate-200">
            <div className="flex justify-between">
              <input
                className="text-b18 sm:text-b32 text-slate-900 outline-none polymath"
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
            <div className="flex gap-10 sm:gap-20 text-r12 sm:text-r14 pt-8 pb-7">
              <div className="text-slate-500">created at</div>
              <div className="text-slate-700">{date}</div>
            </div>
          </div>
          <div className="px-5 sm:px-10 pt-5 h-full my-8 overflow-scroll" data-dropdown-menu>
            <DemoTextEditor noteId={currentNote.id} isSideDrawer />
          </div>
        </>
      )}
    </div>
  );
}
