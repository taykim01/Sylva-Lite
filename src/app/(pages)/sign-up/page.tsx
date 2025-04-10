import AuthBackground from "@/components/auth/auth-container";
import RouteToSignIn from "./route-to-sign-in";
import SignUpForm from "./sign-up-form";

export default function Page() {
  return (
    <AuthBackground>
      <SignUpForm />
      <RouteToSignIn />
    </AuthBackground>
  );
}
