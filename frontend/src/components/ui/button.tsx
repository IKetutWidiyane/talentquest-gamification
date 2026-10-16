import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-primary text-white hover:bg-primary-accent",
  secondary:
    "border border-transparent bg-primary-accent text-white hover:bg-primary",
  outline:
    "border border-border bg-surface text-foreground hover:bg-background",
  destructive:
    "border border-transparent bg-error text-white hover:bg-[#963B35]",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:bg-background",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 px-3 text-xs",
  md: "min-h-10 gap-2 px-4 text-sm",
  lg: "min-h-12 gap-2.5 px-5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-[6px]",
        "font-medium leading-5 transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-primary-accent",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
