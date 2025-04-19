import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { DemoBoard } from "../../../components/demo/demo-board";
import { DemoList } from "../../../components/demo/demo-list";
import { DemoBottomBar } from "../../../components/demo/demo-bottom-bar";
import { DemoSideDrawer } from "../../../components/demo/demo-side-drawer";
import { DemoContainer } from "@/components/demo/demo-container";
import { DemoStart } from "@/components/demo/demo-start";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <DemoContainer className="relative">
        <DemoBoard />
        <DemoList />
        <DemoSideDrawer />
        <DemoBottomBar />
      </DemoContainer>
      <DemoStart />
    </Suspense>
  );
}
