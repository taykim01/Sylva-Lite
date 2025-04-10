import { handeGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";

export default async function Page() {
  const { error } = await handeGetUser();
  if (error) redirect("/sign-in");
  else redirect("/dashboard");
}
