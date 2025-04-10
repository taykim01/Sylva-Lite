"use client";

import AuthPaper from "@/components/auth/auth-paper";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function SignUpForm() {
  const { signUp, loading, email, password, setEmail, setPassword, setConfirmPassword } = useAuth();

  return (
    <AuthPaper
      title="Welcome to Sylva"
      subtitle="Start your first co-work!"
      cta={{
        text: "Sign Up",
        onClick: signUp,
        disabled: !email || !password,
        loading,
      }}
    >
      <div className="flex flex-col gap-5">
        <Input placeholder="Enter Email" label="Email" onChange={setEmail} />
        <Input placeholder="Enter password" label="Password" type="password" onChange={setPassword} />
        <Input placeholder="Confirm password" label="Confirm Password" type="password" onChange={setConfirmPassword} />
      </div>
    </AuthPaper>
  );
}
