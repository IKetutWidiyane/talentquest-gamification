"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Bell,
  LogOut,
  Menu,
  Mountain,
  X,
} from "lucide-react";
import CandidateNavigation from "@/components/layout/navigation/candidate-navigation";

interface CandidateShellProps {
  children: ReactNode;
}

export default function CandidateShell({
  children,
}: CandidateShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      {/* Mobile backdrop */}
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
        id="candidate-sidebar"
        className={`fixed inset-y-0 left-0 z-[70] flex w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Candidate sidebar"
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <Link
            href="/candidate/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-w-0 items-center gap-3"
            aria-label="EIGER Talent Quest"
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
                Candidate Portal
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <CandidateNavigation
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>

        {/* Footer sidebar */}
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
              <Mountain size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#0B1B3D]">
                Your next adventure
              </p>
              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                Explore your potential.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            title="Logout akan diaktifkan saat integrasi autentikasi"
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400"
          >
            <LogOut size={17} />
            <span>Logout</span>
            <span className="ml-auto text-[9px]">Soon</span>
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="min-h-screen lg:pl-[270px]">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="candidate-sidebar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#0B1B3D] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0B1B3D] sm:text-base">
                Candidate Workspace
              </p>
              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                Your career journey starts here
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:inline-flex">
              Candidate Portal
            </span>

            <button
              type="button"
              aria-label="Notifikasi"
              title="Notifikasi akan tersedia pada tahap berikutnya"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D97706]" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto min-h-[calc(100vh-132px)] w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-bold text-[#0B1B3D]">EIGER</span>
              {" "}Talent Quest
            </p>
            <p>Explore your potential. Build your next adventure.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}