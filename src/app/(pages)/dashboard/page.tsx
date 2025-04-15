import Container from "@/components/layout/container";
import SideDrawer from "@/components/notes/side-drawer";
import BottomItems from "@/components/layout/bottom-bar";
import Board from "./board";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { handleGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: user } = await handleGetUser();
  if (!user) redirect("/sign-in");

  return (
    <Suspense fallback={<Spinner />}>
      <Container className="relative" teamCard teammateCard>
        <Board />
        <SideDrawer />
        <BottomItems />
      </Container>
    </Suspense>
  );
}
