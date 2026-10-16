"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: string;
  wrapperClassName?: string;
}

export function Checkbox({
  id,
  label,
  description,
  disabled,
  className,
  wrapperClassName,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = `${checkboxId}-description`;

  return (
    <div className={cn("flex items-start gap-2.5", wrapperClassName)}>
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-[4px]",
          "border border-border bg-surface",
          "checked:border-primary-accent checked:bg-primary-accent",
          "checked:bg-[length:11px_11px] checked:bg-center checked:bg-no-repeat",
          "checked:bg-[image:linear-gradient(45deg,transparent_44%,white_44%,white_56%,transparent_56%),linear-gradient(-45deg,transparent_40%,white_40%,white_52%,transparent_52%)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />

      {(label || description) && (
        <div className="flex min-w-0 flex-col gap-0.5">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm leading-5 text-foreground",
                disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              )}
            >
              {label}
            </label>
          )}

          {description && (
            <p id={descriptionId} className="text-xs leading-5 text-muted">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
