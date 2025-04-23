import Container from "@/components/layout/container";
import SideDrawer from "@/components/notes/side-drawer";
import BottomItems from "@/components/layout/bottom-bar";
import Board from "./board";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { handleGetUser } from "@/features/auth-features";
import { redirect } from "next/navigation";
import List from "./list";

export default async function Page() {
  const { data: user } = await handleGetUser();
  const userId = user?.id;
  if (!user || userId === process.env.NEXT_PUBLIC_DEMO_ID) redirect("/sign-in");

  return (
    <Suspense fallback={<Spinner />}>
      <Container className="relative">
        <Board />
        <List />
        <SideDrawer />
        <BottomItems />
      </Container>
    </Suspense>
  );
}
