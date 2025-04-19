"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleGetUser } from "@/features/auth-features";
import { handleDemoSignIn } from "@/features/demo-features";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Spinner from "../common/spinner";

export function DemoStart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const { error } = await handleDemoSignIn();
      if (error) return alert(error);
      setOpen(false);
      window.location.href = "/demo";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    const { data, error } = await handleGetUser();
    if (error || !data) setOpen(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>Start Demo</DialogTitle>
          <DialogDescription>You can start a demo session without signing up.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleStart} disabled={loading}>
            {loading ? <Spinner /> : "Start"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
