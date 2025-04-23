"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Spinner from "../common/spinner";
import { useDemo } from "@/hooks/use-demo";

export function DemoStart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { readEdges, readMyNotes } = useDemo();

  useEffect(() => {
    readEdges();
    readMyNotes();
  }, []);

  // const handleStart = async () => {
  //   setLoading(true);
  //   try {
  //     await readEdges();
  //     await readMyNotes();
  //     setOpen(false);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Dialog open={open}>
      <DialogContent className="w-100" noX>
        <DialogHeader>
          <DialogTitle>Start Demo</DialogTitle>
          <DialogDescription>You can start a demo session without signing up.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            // onClick={handleStart}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Start"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
