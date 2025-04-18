"use client";

import { useEffect, useState } from "react";
import { handleGetSubscription, subscribeUser, unsubscribeUser } from "@/features/web-push-features";

export function useWebPush() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getSubscription = async () => {
    try {
      setLoading(true);
      const { data, error } = await handleGetSubscription();
      if (error) {
        setError(error);
        return;
      }
      setSubscription(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  const subscribe = async (sub: PushSubscription) => {
    try {
      setLoading(true);
      const { error } = await subscribeUser(sub);
      if (error) {
        setError(error);
        return;
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    try {
      setLoading(true);
      const { error } = await unsubscribeUser();
      if (error) {
        setError(error);
        return;
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return { subscription, error, subscribe, unsubscribe, loading };
}
