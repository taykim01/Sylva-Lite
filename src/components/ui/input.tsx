import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

function Input({
  className,
  type,
  label,
  onChange,
  ...props
}: Omit<React.ComponentProps<"input">, "onChange"> & { onChange: (value: string) => void; label?: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Label className="text-14m text-slate-600 flex gap-0.5">{label}</Label>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
        onChange={handleChange}
      />
    </div>
  );
}

export { Input };
