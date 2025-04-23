import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { DemoStart } from "@/components/demo/demo-start";
import { DemoContent } from "./demo-content";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <DemoContent />
      <DemoStart />
    </Suspense>
  );
}
