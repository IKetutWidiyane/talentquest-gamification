    import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-5 text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}