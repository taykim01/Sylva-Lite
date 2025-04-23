"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Rocket } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useDemo } from "@/hooks/use-demo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { FeatureRequestMenu } from "../layout/feature-request-menu";

export function DemoHeader() {
  const { toggleViewMode, viewMode } = useDemo();
  const { signOut } = useAuth();
  const router = useRouter();
  const toSignIn = () => {
    signOut();
    router.push("/sign-in");
  };

  return (
    <div className="h-10 py-2 px-4 bg-white flex items-center justify-between border-b border-slate-200 sticky top-0 z-10">
      <Logo size={48} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer">
            <div className="text-slate-800 text-m14 polymath">Demo Account</div>
            <ChevronDown className="w-5 text-slate-600" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Switch id="view-mode" checked={viewMode === "board"} onCheckedChange={toggleViewMode} />
              <Label htmlFor="view-mode">Board View</Label>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toSignIn}>
              <Rocket size={16} className="text-slate-600" />
              Try Sylva!
            </DropdownMenuItem>
            <FeatureRequestMenu />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
