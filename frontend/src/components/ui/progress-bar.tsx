import { cn } from "@/lib/utils";

export type ProgressVariant = "primary" | "success" | "warning";
export type ProgressSize = "sm" | "md";

export interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  className?: string;
  barClassName?: string;
  ariaLabel?: string;
}

const variantStyles: Record<ProgressVariant, string> = {
  primary: "bg-primary-accent",
  success: "bg-success",
  warning: "bg-warning",
};

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  variant = "primary",
  size = "md",
  className,
  barClassName,
  ariaLabel,
}: ProgressBarProps) {
  const progress = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;

  const accessibleLabel = ariaLabel ?? label ?? "Progress";

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label ? (
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          ) : (
            <span className="sr-only">{accessibleLabel}</span>
          )}

          {showValue && (
            <span className="shrink-0 text-sm font-medium tabular-nums text-muted">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={accessibleLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={cn(
          "w-full overflow-hidden rounded-full bg-[#E8E7DF]",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            variantStyles[variant],
            barClassName
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}