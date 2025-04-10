import AuthBackground from "@/components/auth/auth-container";
import RouteToSignUp from "./route-to-sign-up";
import SignInForm from "./sign-in-form";

export default function Page() {
  return (
    <AuthBackground>
      <SignInForm />
      <RouteToSignUp />
    </AuthBackground>
  );
}
