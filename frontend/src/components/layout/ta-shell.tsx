
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Bell,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import TANavigation from "./navigation/ta-navigation";

interface TAShellProps {
  children: ReactNode;
}

export default function TAShell({ children }: TAShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="ta-sidebar"
        aria-label="Talent Acquisition sidebar"
        className={`fixed inset-y-0 left-0 z-[70] flex w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center border-b border-slate-100 px-5">
          <Link
            href="/ta"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-w-0 items-center gap-3"
            aria-label="EIGER Talent Quest - Talent Acquisition"
          >
            <Image
              src="/images/eigerindompi-logo.png"
              alt="Eigerindo MPI"
              width={150}
              height={45}
              priority
              className="h-9 w-auto max-w-[125px] object-contain"
            />
            <span className="min-w-0 border-l border-slate-200 pl-3">
              <span className="block text-xs font-extrabold text-[#0B1B3D]">
                Talent Quest
              </span>
              <span className="mt-0.5 block text-[9px] text-slate-500">
                TA Workspace
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup sidebar"
            className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <TANavigation onNavigate={() => setMobileMenuOpen(false)} />
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
              <ShieldCheck size={20} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#0B1B3D]">
                Talent Acquisition
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Recruitment management
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            title="Logout diaktifkan setelah integrasi autentikasi"
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400"
          >
            <LogOut size={17} />
            <span>Logout</span>
            <span className="ml-auto text-[9px]">Soon</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="ta-sidebar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#0B1B3D] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0B1B3D] sm:text-base">
                Talent Acquisition Workspace
              </p>
              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                Manage candidates and recruitment
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:inline-flex">
              TA Portal
            </span>

            <button
              type="button"
              aria-label="Notifikasi"
              title="Notifikasi akan tersedia pada tahap berikutnya"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-132px)] w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-bold text-[#0B1B3D]">EIGER</span>{" "}
              Talent Quest
            </p>
            <p>Talent Acquisition Workspace</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
