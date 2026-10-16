"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  error,
  orientation = "vertical",
  disabled = false,
  required = false,
  className,
}: RadioGroupProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const groupDisabled = disabled;

  const commonProps: Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "required" | "disabled"
  > = {
    name,
    required,
    disabled: groupDisabled,
  };

  return (
    <fieldset
      className={cn("flex min-w-0 flex-col gap-3", className)}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
    >
      {label && (
        <legend className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </legend>
      )}

      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {options.map((option, index) => {
          const optionId = `${generatedId}-${index}`;
          const descriptionId = `${optionId}-description`;
          const isDisabled = groupDisabled || option.disabled;

          return (
            <div key={option.value} className="flex items-start gap-2.5">
              <input
                {...commonProps}
                id={optionId}
                type="radio"
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={
                  value === undefined
                    ? defaultValue === option.value
                    : undefined
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    onValueChange?.(event.target.value);
                  }
                }}
                disabled={isDisabled}
                aria-describedby={
                  option.description ? descriptionId : error ? errorId : undefined
                }
                className={cn(
                  "mt-0.5 size-4 shrink-0 cursor-pointer accent-primary-accent",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-primary-accent",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />

              <div className="flex min-w-0 flex-col gap-0.5">
                <label
                  htmlFor={optionId}
                  className={cn(
                    "text-sm leading-5 text-foreground",
                    isDisabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  )}
                >
                  {option.label}
                </label>

                {option.description && (
                  <p
                    id={descriptionId}
                    className="text-xs leading-5 text-muted"
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs leading-5 text-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}