import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "border-[#C7DCCB] bg-[#EDF5EF] text-[#285D36]",
  warning: "border-[#E6D5AC] bg-[#FBF4E3] text-[#795719]",
  error: "border-[#E8C6C3] bg-[#FAECEB] text-[#913B36]",
  neutral: "border-border bg-background text-muted",
  info: "border-[#CCD8CF] bg-[#EEF2EE] text-[#354C3B]",
};

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.5 rounded-[6px]",
        "border px-2 py-0.5 text-xs font-medium leading-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}