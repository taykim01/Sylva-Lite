"use client";

import { useUserStore } from "@/core/states";
import { handleSignIn, handleSignOut, handleSignUp } from "@/features/auth-features";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function useAuth() {
  const { user, _setUser, _resetUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await handleSignIn(email, password);
      if (error) throw error;
      _setUser(data!);
      router.push("/dashboard");
      toast("Signed in successfully");
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await handleSignOut();
      _resetUser();
      router.push("/sign-in");
      toast("Signed out successfully");
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) throw new Error("Passwords do not match");
      const { data, error } = await handleSignUp(email, password);
      if (error) throw error;
      _setUser(data!);
      router.push("/dashboard");
      toast("Signed up successfully");
    } catch (error) {
      setError(error as string);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp,
    setEmail,
    setPassword,
    email,
    password,
    setConfirmPassword,
    confirmPassword,
  };
}
