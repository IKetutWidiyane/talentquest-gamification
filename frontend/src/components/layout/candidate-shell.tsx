"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, LogOut, Menu, Mountain, X } from "lucide-react";
import CandidateNavigation, {
  candidateNavigationItems,
} from "@/components/layout/navigation/candidate-navigation";
import UserProfileMenu from "./navigation/user-profile-menu";

interface CandidateShellProps {
  children: ReactNode;
}

export default function CandidateShell({ children }: CandidateShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Judul header mengikuti halaman aktif
  const currentItem = candidateNavigationItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const pageTitle = currentItem?.label ?? "Candidate Workspace";
  const pageDescription =
    currentItem?.description ?? "Your career journey starts here";

  // Tutup drawer saat pindah halaman
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Escape menutup drawer + kunci scroll body saat drawer terbuka
  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      {/* Skip link */}
      <a
        href="#candidate-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#0B1B3D] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten utama
      </a>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-slate-900/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="candidate-sidebar"
        aria-label="Candidate sidebar"
        className={`fixed inset-y-0 left-0 z-[70] flex w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/candidate/jobs"
            aria-label="EIGER Talent Quest"
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
          >
            <Image
              src="/images/eigerindompi-logo.png"
              alt="Eigerindo MPI"
              width={150}
              height={45}
              priority
              className="h-9 w-auto max-w-[120px] object-contain"
            />

            <span className="min-w-0 border-l border-slate-200 pl-3">
              <span className="block text-xs font-bold text-[#0B1B3D]">
                Talent Quest
              </span>
              <span className="mt-0.5 block text-[10px] text-slate-500">
                Candidate Portal
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <CandidateNavigation onNavigate={() => setMobileMenuOpen(false)} />
        </div>

        {/* Footer sidebar */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B1B3D] text-[#F59E0B]">
              <Mountain size={18} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#0B1B3D]">
                Your next adventure
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                Explore your potential.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            title="Logout akan diaktifkan saat integrasi autentikasi"
            className="flex h-10 w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-400"
          >
            <LogOut size={17} />
            <span>Logout</span>
            <span className="ml-auto text-[10px]">Soon</span>
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-col lg:pl-[270px]">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="candidate-sidebar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0B1B3D] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-[#0B1B3D]">
                {pageTitle}
              </h1>
              <p className="mt-0.5 hidden truncate text-xs text-slate-500 sm:block">
                {pageDescription}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 sm:inline-flex">
              Candidate Portal
            </span>

            <button
              type="button"
              aria-label="Notifikasi"
              title="Notifikasi akan tersedia pada tahap berikutnya"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
            >
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D97706]" />
            </button>
            <UserProfileMenu
              name="Candidate Demo"
              email="candidate@example.com"
              role="Candidate"
              profileHref="/candidate/profile"
            />
          </div>
        </header>

        {/* Content */}
        <main
          id="candidate-main"
          className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-bold text-[#0B1B3D]">EIGER</span> Talent
              Quest
            </p>
            <p>Explore your potential. Build your next adventure.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}