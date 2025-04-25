"use client";

import AuthPaper from "@/components/auth/auth-paper";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { sendGAEvent } from "@next/third-parties/google";
export default function SignUpForm() {
  const { signUp, loading, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword } = useAuth();

  const handleSignUp = async () => {
    sendGAEvent("sign_up");
    await signUp();
  };

  return (
    <AuthPaper
      title="Welcome to Sylva"
      subtitle="Create your personal bulletin board now!"
      cta={{
        text: "Sign Up",
        onClick: handleSignUp,
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
