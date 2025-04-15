import { handleGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";

export default async function Page() {
  const { error } = await handleGetUser();
  if (error) redirect("/sign-in");
  else redirect("/dashboard");
}
