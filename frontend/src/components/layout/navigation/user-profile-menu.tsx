
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CaretDownIcon,
  SignOutIcon,
  UserIcon,
  GearIcon,
} from "@phosphor-icons/react";

interface UserProfileMenuProps {
  name?: string;
  email?: string;
  role: "Candidate" | "Talent Acquisition";
  profileHref: string;
  onLogout?: () => void;
}

export default function UserProfileMenu({
  name = "Demo User",
  email = "user@example.com",
  role,
  profileHref,
  onLogout,
}: UserProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] sm:gap-3 sm:px-2"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3D] text-xs font-bold text-[#F59E0B]">
          {initials || "U"}
        </span>

        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-[140px] truncate text-xs font-bold text-[#0B1B3D]">
            {name}
          </span>
          <span className="mt-0.5 block text-[10px] text-slate-500">
            {role}
          </span>
        </span>

        <CaretDownIcon
          size={16}
          className={`hidden text-slate-400 transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[80] mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="border-b border-slate-100 px-4 py-4">
            <p className="truncate text-sm font-bold text-[#0B1B3D]">
              {name}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {email}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">
              {role}
            </span>
          </div>

          <div className="p-2">
            <Link
              href={profileHref}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              <UserIcon size={17} />
              My Profile
            </Link>

            <button
              type="button"
              role="menuitem"
              disabled
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400"
              title="Pengaturan akan tersedia pada tahap berikutnya"
            >
              <GearIcon size={17} />
              Settings
              <span className="ml-auto text-[10px]">Soon</span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              disabled={!onLogout}
              title={!onLogout ? "Menunggu integrasi autentikasi" : "Logout"}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
            >
              <SignOutIcon size={17} />
              Logout
              {!onLogout && (
                <span className="ml-auto text-[10px]">Soon</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
