"use server";

import { User } from "./../../node_modules/@supabase/auth-js/dist/module/lib/types.d";
import { createClient } from "@/infrastructures/supabase/server";
import { Tables } from "@/database.types";
import { Response } from "@/core/types";

export async function handleSignIn(email: string, password: string): Promise<Response<Tables<"user">>> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    const isInvalidCredentials = error.message.includes("Invalid login credentials");
    if (isInvalidCredentials) return { data: null, error: "Invalid email or password" };
    else return { data: null, error: error.message };
  }
  const userID = data?.user?.id;
  if (!userID) return { data: null, error: "User ID not found" };

  const { data: userData, error: userError } = await supabase.from("user").select("*").eq("id", userID).single();
  if (userError || !userData) return { data: null, error: userError?.message || "User not found" };
  return { data: userData as Tables<"user">, error: null };
}

export async function handleSignUp(email: string, password: string): Promise<Response<Tables<"user">>> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    const isEmailTaken = error.message.includes("unique constraint");
    if (isEmailTaken) return { data: null, error: "Email is already taken" };
    else return { data: null, error: error.message };
  }
  const userID = user?.id;
  if (!userID) return { data: null, error: "User ID not found" };

  const newUser: Omit<Tables<"user">, "created_at"> = {
    id: userID,
    email,
  };
  const { data: createdUser, error: userError } = await supabase.from("user").insert(newUser).select("*").single();
  if (userError) return { data: null, error: userError.message };
  return { data: createdUser as Tables<"user">, error: null };
}

export async function handleSignOut(): Promise<Response<void>> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { data: null, error: error.message };
  return { data: null, error: null };
}

export async function handleGetUser(): Promise<Response<User>> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const userData = user?.user;
  if (!userData) return { data: null, error: "User not found" };
  return { data: userData, error: null };
}
