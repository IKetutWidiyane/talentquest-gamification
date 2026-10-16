import type { ReactNode } from "react";
import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-56 flex-col items-center justify-center",
        "rounded-[10px] border border-dashed border-border bg-surface",
        "px-6 py-10 text-center",
        className
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-background text-primary-accent">
        {icon ?? <FileSearch size={22} aria-hidden="true" />}
      </div>

      <h3 className="text-base font-semibold text-foreground">{title}</h3>

      {description && (
        <p className="mt-1 max-w-md text-sm leading-6 text-muted">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}