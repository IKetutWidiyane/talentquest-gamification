"use client";

import type { ReactNode } from "react";
import { CheckCircle, Info, Warning, X, XCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  variant?: ToastVariant;
  onClose: () => void;
  action?: ReactNode;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-[#C7DCCB] bg-[#EDF5EF] text-[#285D36]",
  error: "border-[#E8C6C3] bg-[#FAECEB] text-[#913B36]",
  warning: "border-[#E6D5AC] bg-[#FBF4E3] text-[#795719]",
  info: "border-[#CCD8CF] bg-[#EEF2EE] text-[#354C3B]",
};

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: Warning,
  info: Info,
};

export function Toast({
  open,
  title,
  description,
  variant = "success",
  onClose,
  action,
  className,
}: ToastProps) {
  if (!open) return null;

  const Icon = icons[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        "flex w-full max-w-md items-start gap-3 rounded-[10px]",
        "border p-4 shadow-[0_8px_24px_rgb(29_33_30_/_10%)]",
        variantStyles[variant],
        className
      )}
    >
      <Icon size={20} className="mt-0.5 shrink-0" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>

        {description && (
          <p className="mt-1 text-sm leading-5 opacity-90">{description}</p>
        )}

        {action && <div className="mt-3">{action}</div>}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="shrink-0 rounded-[4px] p-1 opacity-75 hover:bg-black/5 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-current"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}