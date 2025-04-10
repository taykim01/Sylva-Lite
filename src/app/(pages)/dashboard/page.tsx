import Container from "@/components/container";
import SideDrawer from "@/components/side-drawer";
import BottomItems from "@/components/bottom-bar";
import Board from "./board";
import { Suspense } from "react";
import Spinner from "@/components/spinner";

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Container className="px-4 py-3 bg-slate-100 relative" teamCard teammateCard>
        <Board />
        <SideDrawer />
        <BottomItems />
      </Container>
    </Suspense>
  );
}
