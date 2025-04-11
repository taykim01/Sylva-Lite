"use client";

import { useRouter } from "next/navigation";

export default function RouteToSignIn() {
  const router = useRouter();
  const toSignIn = () => router.push("/sign-in");
  return (
    <div className="flex gap-2 polymath">
      <div className="text-r14 text-slate-700">Already have an account?</div>
      <div className="text-m14 text-slate-500 underline cursor-pointer" onClick={toSignIn}>
        Sign In
      </div>
    </div>
  );
}
