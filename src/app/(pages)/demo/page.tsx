import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { DemoBoard } from "../../../components/demo/demo-board";
import { DemoList } from "../../../components/demo/demo-list";
import { DemoBottomBar } from "../../../components/demo/demo-bottom-bar";
import { DemoSideDrawer } from "../../../components/demo/demo-side-drawer";
import { DemoContainer } from "@/components/demo/demo-container";
import { handleDemoSignIn } from "@/features/demo-features";

export default async function Page() {
  const {} = await handleDemoSignIn();

  return (
    <Suspense fallback={<Spinner />}>
      <DemoContainer className="relative">
        <DemoBoard />
        <DemoList />
        <DemoSideDrawer />
        <DemoBottomBar />
      </DemoContainer>
    </Suspense>
  );
}
