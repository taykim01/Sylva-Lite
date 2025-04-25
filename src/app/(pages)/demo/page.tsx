import { Suspense } from "react";
import Spinner from "@/components/common/spinner";
import { DemoStart } from "@/app/(pages)/demo/demo-start";
import { DemoContent } from "./demo-content";
import { BaseOverlay } from "@/components/base/base-overlay";
export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <DemoContent />
      <DemoStart />
      <BaseOverlay />
    </Suspense>
  );
}
