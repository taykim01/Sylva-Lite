import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LogoSymbol } from "../common/logo";

export default function AuthPaper(props: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  cta?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    loading: boolean;
  };
}) {
  return (
    <div
      className="w-[384px] p-9 pt-12 bg-white rounded-[16px] flex flex-col gap-8"
      style={{
        boxShadow: "0px 4px 8px 0px #DADADA",
      }}
    >
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-6 items-center">
          <LogoSymbol />
          <div className="flex flex-col gap-1 text-center items-center">
            <div className="text-sb22 text-slate-700 polymath">{props.title}</div>
            {props.subtitle && <div className="text-m14 text-slate-600 polymath">{props.subtitle}</div>}
          </div>
        </div>
        {props.children}
      </div>
      {props.cta && (
        <Button size="lg" onClick={props.cta.onClick} disabled={props.cta.disabled} loading={props.cta.loading}>
          {props.cta.text}
        </Button>
      )}
    </div>
  );
}
