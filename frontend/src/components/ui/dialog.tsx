"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = "talent-quest-dialog-title";
  const descriptionId = "talent-quest-dialog-description";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-lg",
        "rounded-[10px] border border-border bg-surface p-0 text-foreground",
        "shadow-[0_16px_48px_rgb(29_33_30_/_18%)]",
        "backdrop:bg-black/40",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
        <div className="min-w-0">
          <h2 id={titleId} className="text-lg font-semibold leading-6">
            {title}
          </h2>

          {description && (
            <p
              id={descriptionId}
              className="mt-1 text-sm leading-5 text-muted"
            >
              {description}
            </p>
          )}
        </div>

        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="rounded-[6px] p-1.5 text-muted hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </dialog>
  );
}

export function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}