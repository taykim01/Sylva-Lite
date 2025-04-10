"use client";

import AuthPaper from "@/components/auth/auth-paper";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function SignInForm() {
  const { loading, signIn, setEmail, setPassword, email, password } = useAuth();

  return (
    <AuthPaper
      title="Welcome back!"
      cta={{
        text: "Sign In",
        onClick: signIn,
        disabled: !email || !password,
        loading,
      }}
    >
      <div className="flex flex-col gap-5">
        <Input placeholder="Enter Email" label="Email" onChange={setEmail} value={email} />
        <Input placeholder="Enter password" label="Password" type="password" onChange={setPassword} value={password} />
      </div>
    </AuthPaper>
  );
}
