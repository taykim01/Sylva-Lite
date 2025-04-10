"use client";

import { useRouter } from "next/navigation";

export default function RouteToSignUp() {
  const router = useRouter();
  const toSignUp = () => router.push("/sign-up");
  return (
    <div className="flex gap-2">
      <div className="text-r14 text-slate-700">Don&apos;t have an account?</div>
      <div className="text-m14 text-slate-500 underline cursor-pointer" onClick={toSignUp}>
        Sign Up
      </div>
    </div>
  );
}
