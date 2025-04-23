"use server";

import { createClient } from "@/infrastructures/supabase/server";

export async function handleCreateFeatureRequest(request: string): Promise<{
  data: null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { error } = await supabase.from("feature_request").insert({
    request,
  });
  if (error) return { data: null, error: error.message };
  return { data: null, error: null };
}
