"use client";

import { handleCreateFeatureRequest } from "@/features/reqeust-feature-features";
import { useState } from "react";
import { toast } from "sonner";

export function useRequestFeature() {
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState<string>("");
  const [requestDialog, setRequestDialog] = useState<boolean>(false);

  const requestFeature = async () => {
    try {
      setLoading(true);
      const { error } = await handleCreateFeatureRequest(feature);
      if (error) return alert(error);
      toast("Feature request sent successfully");
      setFeature("");
      setRequestDialog(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const disabled = loading || !feature || feature === "";

  return { requestFeature, loading, setFeature, disabled, requestDialog, setRequestDialog };
}
