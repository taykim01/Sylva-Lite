import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

function Textarea({
  className,
  onChange,
  onEnter,
  label,
  ...props
}: Omit<React.ComponentProps<"textarea">, "onChange"> & {
  onChange?: (value: string) => void;
  onEnter?: () => void;
  label?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange?.(value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      onEnter?.();
    }
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Label className="text-14m text-slate-600 flex gap-0.5">{label}</Label>}
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export { Textarea };
