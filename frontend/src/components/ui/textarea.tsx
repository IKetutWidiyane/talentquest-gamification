"use client";

import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  required,
  disabled,
  className,
  wrapperClassName,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;
  const errorId = `${textareaId}-error`;

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
          htmlFor={textareaId}
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

      <textarea
        id={textareaId}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "min-h-28 w-full resize-y rounded-[8px] border bg-surface px-3 py-2.5",
          "text-sm leading-6 text-foreground placeholder:text-muted",
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
      />

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