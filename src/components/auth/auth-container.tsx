import { ReactNode } from "react";
import { Logo } from "../common/logo";

export default function AuthContainer(props: { children: ReactNode }) {
  return (
    <div
      className="w-full h-screen px-4 py-3 flex flex-col gap-[20%] items-center"
      style={{
        backgroundImage: "linear-gradient(-138deg, rgba(238, 249, 165, 0.2) 0%, rgba(0, 116, 253, 0.2) 100%)",
      }}
    >
      <div className="w-full">
        <Logo size={48} />
      </div>
      <div className="flex flex-col items-center gap-5">{props.children}</div>
    </div>
  );
}
