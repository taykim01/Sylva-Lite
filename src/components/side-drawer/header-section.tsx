import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/wrapper";
import { useNote } from "@/hooks/use-note";
import { ChevronsRight, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function HeaderSection() {
  const { currentNote, deleteNote, editingTitle, setEditingTitle } = useNote();
  const [dialog, setDialog] = useState(false);

  const date = new Date(currentNote?.created_at || "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const closeDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  if (!currentNote) return null;

  return (
    <>
      <div className="pr-10 pl-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wrapper onClick={() => {}}>
            <ChevronsRight size={20} className="text-slate-500" />
          </Wrapper>
          <div className="text-m16">{currentNote?.title}</div>
        </div>
      </div>
      <div className="px-10 pt-12 mb-6 border-b border-slate-200">
        <div className="flex justify-between">
          <Input
            className="text-sb28 text-slate-900 outline-none"
            value={editingTitle || ""}
            onChange={setEditingTitle}
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
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
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
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-r14 pt-8 pb-7">
          <div className="text-slate-500">created at</div>
          <div className="text-slate-700">{date}</div>
        </div>
      </div>
    </>
  );
}
