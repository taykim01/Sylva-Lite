"use server";

import { createClient } from "@/infrastructures/supabase/server";
import webpush from "web-push";
import { handleGetUser } from "./auth-features";

webpush.setVapidDetails(
  "mailto:taykim01@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function handleGetSubscription() {
  const supabase = await createClient();
  const { data, error } = await handleGetUser();
  const userId = data?.id;

  if (error || !userId) return { error: error || "No user found" };

  const { data: user, error: fetchError } = await supabase
    .from("user")
    .select("push_subscription")
    .eq("id", userId)
    .single();

  if (fetchError || !user?.push_subscription) {
    return { error: fetchError?.message || "No subscription available for this user" };
  }

  return { data: user?.push_subscription };
}

export async function subscribeUser(sub: PushSubscription) {
  const supabase = await createClient();
  const { data, error: userError } = await handleGetUser();
  const userId = data?.id;

  if (userError || !userId) return { error: userError || "No user found" };

  const subscription = {
    endpoint: sub.endpoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keys: (sub as any).keys || {},
  } as webpush.PushSubscription;

  const { error } = await supabase.from("user").update({ push_subscription: subscription }).eq("id", userId);

  if (error) {
    console.error("Error storing push subscription:", error);
    return { success: false, error: "Failed to store subscription" };
  }

  return { success: true };
}

export async function unsubscribeUser() {
  const supabase = await createClient();
  const { data, error: userError } = await handleGetUser();
  const userId = data?.id;

  if (userError || !userId) return { error: userError || "No user found" };

  const { error } = await supabase.from("user").update({ push_subscription: null }).eq("id", userId);

  if (error) {
    console.error("Error removing push subscription:", error);
    return { success: false, error: "Failed to remove subscription" };
  }

  return { success: true };
}

export async function sendNotification(title: string, body: string) {
  const supabase = await createClient();
  const { data, error: userError } = await handleGetUser();
  const userId = data?.id;

  if (userError || !userId) return { error: userError || "No user found" };

  const { data: user, error: fetchError } = await supabase
    .from("user")
    .select("push_subscription")
    .eq("id", userId)
    .single();

  if (fetchError || !user?.push_subscription) {
    throw new Error("No subscription available for this user");
  }

  try {
    await webpush.sendNotification(
      user.push_subscription,
      JSON.stringify({
        title,
        body,
        icon: "/icons/icon-512.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
