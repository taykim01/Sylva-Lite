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
import Wrapper from "./wrapper";
import { Tables } from "@/database.types";

interface BaseSideDrawerProps {
  currentNote: Tables<"note"> | null;
  onDeleteNote: (id: string) => Promise<void>;
  onEditNoteContent: (id: string, updates: Partial<{ title: string; content: string }>) => Promise<void>;
  redirectPath: string;
  textEditorComponent: React.ComponentType<{ noteId: string; isSideDrawer?: boolean }>;
}

export function BaseSideDrawer({
  currentNote,
  onDeleteNote,
  redirectPath,
  textEditorComponent: TextEditor,
}: BaseSideDrawerProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const { resetFocus } = useClickOutside({
    ref: divRef,
    redirectPath,
  });

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

  if (!currentNote) return null;

  return (
    <div
      ref={divRef}
      className="fixed right-0 top-10 w-full sm:w-[500px] h-[calc(100vh-40px)] bg-white border-l border-slate-200 z-10"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-5 px-5 sm:px-10 pt-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChevronsRight size={20} className="text-slate-300" />
              <div className="text-m14 text-slate-500 polymath">Note</div>
            </div>
            <AlertDialog open={dialog} onOpenChange={setDialog}>
              <AlertDialogTrigger asChild>
                <Wrapper>
                  <TrashIcon size={20} className="text-slate-300" />
                </Wrapper>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this note? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button variant="outline" onClick={() => setDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await onDeleteNote(currentNote.id);
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
          <TextEditor noteId={currentNote.id} isSideDrawer />
        </div>
      </div>
    </div>
  );
}
