import AuthBackground from "@/components/auth/auth-container";
import RouteToSignIn from "./route-to-sign-in";
import SignUpForm from "./sign-up-form";
import { redirect } from "next/navigation";
import { handleGetUser } from "@/features/auth-features";

export default async function Page() {
  const { data: user } = await handleGetUser();
  if (user) redirect("/dashboard");

  return (
    <AuthBackground>
      <SignUpForm />
      <RouteToSignIn />
    </AuthBackground>
  );
}
