"use client";

import { useRequestFeature } from "@/hooks/use-request-feature";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Wrench } from "lucide-react";

export function FeatureRequestMenu() {
  const { requestFeature, loading, setFeature, disabled, requestDialog, setRequestDialog } = useRequestFeature();

  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setRequestDialog(true);
        }}
      >
        <Wrench size={16} className="text-slate-600" />
        Request a Feature
      </DropdownMenuItem>
      <Dialog open={requestDialog} onOpenChange={setRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a Feature</DialogTitle>
            <DialogDescription>
              Thank you for your feedback!
              <br />
              We will review your request and get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <Textarea onChange={setFeature} className="resize-none" placeholder="Please describe your feature request" />
          <DialogFooter>
            <Button onClick={requestFeature} loading={loading} disabled={disabled}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
