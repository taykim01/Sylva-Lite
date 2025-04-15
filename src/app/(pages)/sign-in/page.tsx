import AuthBackground from "@/components/auth/auth-container";
import RouteToSignUp from "./route-to-sign-up";
import SignInForm from "./sign-in-form";
import { handleGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: user } = await handleGetUser();
  if (user) redirect("/dashboard");

  return (
    <AuthBackground>
      <SignInForm />
      <RouteToSignUp />
    </AuthBackground>
  );
}
