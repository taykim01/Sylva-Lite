"use client";

import AuthPaper from "@/components/auth/auth-paper";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function SignUpForm() {
  const { signUp, loading, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword } = useAuth();

  return (
    <AuthPaper
      title="Welcome to Sylva"
      subtitle="Create your personal bulletin board now!"
      cta={{
        text: "Sign Up",
        onClick: signUp,
        disabled: !email || !password || !confirmPassword,
        loading,
      }}
    >
      <div className="flex flex-col gap-5">
        <Input placeholder="Enter Email" label="Email" onChange={setEmail} onEnter={signUp} />
        <Input placeholder="Enter password" label="Password" type="password" onChange={setPassword} onEnter={signUp} />
        <Input
          placeholder="Confirm password"
          label="Confirm Password"
          type="password"
          onChange={setConfirmPassword}
          onEnter={signUp}
        />
      </div>
    </AuthPaper>
  );
}
