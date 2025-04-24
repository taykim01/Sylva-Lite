import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { handleGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";
import { DataLoader } from "./data-loader";
import { DashboardContent } from "./dashboard-content";
import { BaseOverlay } from "@/components/base/base-overlay";

export default async function Page() {
  const { data: user } = await handleGetUser();
  if (!user) redirect("/sign-in");

  return (
    <Suspense fallback={<Spinner />}>
      <DashboardContent userEmail={user.email || "User"} />
      <DataLoader />
      <BaseOverlay />
    </Suspense>
  );
}
