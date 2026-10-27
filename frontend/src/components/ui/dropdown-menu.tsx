"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface DropdownMenuItem {
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger?: ReactNode;
  items: DropdownMenuItem[];
  align?: "start" | "end";
  className?: string;
  triggerClassName?: string;
  label?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "end",
  className,
  triggerClassName,
  label = "Buka menu",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex min-h-9 items-center justify-center gap-2",
          "rounded-[6px] border border-border bg-surface px-3 py-2",
          "text-sm font-medium text-foreground transition-colors",
          "hover:bg-background focus-visible:outline-2 focus-visible:outline-primary-accent",
          triggerClassName
        )}
      >
        {trigger ?? (
          <>
            Menu
            <CaretDown size={16} aria-hidden="true" />
          </>
        )}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={cn(
            "absolute top-full z-50 mt-2 min-w-48",
            "rounded-[8px] border border-border bg-surface p-1.5",
            "shadow-[0_8px_24px_rgb(29_33_30_/_10%)]",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setOpen(false);
                item.onSelect();
              }}
              className={cn(
                "flex min-h-9 w-full items-center gap-2 rounded-[6px]",
                "px-2.5 py-2 text-left text-sm transition-colors",
                "focus-visible:outline-2 focus-visible:outline-primary-accent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                item.destructive
                  ? "text-error hover:bg-[#FAECEB]"
                  : "text-foreground hover:bg-background"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}