
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CandidateNavigation from "@/components/layout/navigation/candidate-navigation";

interface CandidateShellProps {
  children: ReactNode;
}

export default function CandidateShell({
  children,
}: CandidateShellProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A]">
      <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white">
        <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Brand */}
          <Link
            href="/candidate/jobs"
            aria-label="EIGER Talent Quest - Candidate Portal"
            className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
          >
            <Image
              src="/images/eigerindompi-logo.png"
              alt="Eigerindo MPI"
              width={160}
              height={48}
              priority
              className="h-9 w-auto object-contain sm:h-10"
            />

            <span className="hidden border-l border-[#E2E8F0] pl-3 sm:flex sm:flex-col">
              <span className="text-sm font-extrabold text-[#0B1B3D]">
                Talent Quest
              </span>
              <span className="text-[10px] font-medium text-[#64748B]">
                Candidate Portal
              </span>
            </span>
          </Link>

          {/* Candidate navigation */}
          <CandidateNavigation />

          {/* Portal status */}
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-2 xl:flex">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#D97706]"
            />
            <span className="text-xs font-semibold text-[#475569]">
              Candidate Portal
            </span>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto min-h-[calc(100vh-137px)] w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {children}
      </main>

      {/* Candidate portal footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-5 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            <span className="font-bold text-[#0B1B3D]">EIGER</span>
            {" "}Talent Quest
          </p>
          <p>Explore your potential. Build your next adventure.</p>
        </div>
      </footer>
    </div>
  );
}
