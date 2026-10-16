"use client";

import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
  placeholder?: string;
}

export function Select({
  id,
  label,
  hint,
  error,
  required,
  disabled,
  className,
  wrapperClassName,
  placeholder,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  const describedBy =
    [
      ariaDescribedBy,
      hint && !error ? hintId : undefined,
      error ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-10 w-full appearance-none rounded-[8px] border bg-surface",
            "py-2 pl-3 pr-10 text-sm text-foreground",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-1",
            "focus-visible:outline-primary-accent",
            "disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60",
            error
              ? "border-error focus-visible:outline-error"
              : "border-border hover:border-primary-accent",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <ChevronDown
          aria-hidden="true"
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>

      {error ? (
        <p id={errorId} className="text-xs leading-5 text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}