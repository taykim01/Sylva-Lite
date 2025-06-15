"use server"

import { createClient } from "@/infrastructures/supabase/server";
import { Tables } from "@/database.types";

export async function updateSettings(id: string, newSettings: Partial<Tables<"settings">>){
    const supabase = await createClient();
    const { data: updatedSettings, error: settingsError } = await supabase
      .from("settings")
      .update(newSettings)
      .eq("id", id)
      .select("*")
      .single();
    if (settingsError) {
      console.error("Error updating settings:", settingsError.message);
      throw new Error(settingsError.message);
    }
    return { data: updatedSettings as Tables<"settings">, error: null };
}