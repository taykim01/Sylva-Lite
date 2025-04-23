import AuthBackground from "@/components/auth/auth-container";
import RouteToSignIn from "./route-to-sign-in";
import SignUpForm from "./sign-up-form";
import { redirect } from "next/navigation";
import { handleGetUser } from "@/features/auth-features";
import RouteToDemo from "@/components/auth/route-to-demo";
export default async function Page() {
  const { data: user } = await handleGetUser();
  if (user) redirect("/dashboard");

  return (
    <AuthBackground>
      <SignUpForm />
      <div className="flex flex-col items-center gap-2">
        <RouteToSignIn />
        <RouteToDemo />
      </div>
    </AuthBackground>
  );
}
