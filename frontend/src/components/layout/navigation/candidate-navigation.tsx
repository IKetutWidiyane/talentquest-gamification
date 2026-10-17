
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  ClipboardList,
  Menu,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

const navigationItems = [
  {
    label: "Jobs",
    href: "/candidate/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Talent Quest",
    href: "/candidate/talent-quest",
    icon: Trophy,
  },
  {
    label: "My Applications",
    href: "/candidate/applications",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    href: "/candidate/profile",
    icon: UserRound,
  },
];

export default function CandidateNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Desktop navigation */}
      <nav
        aria-label="Candidate navigation"
        className="hidden items-center gap-1 lg:flex"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors xl:px-4 ${
                active
                  ? "bg-[#0B1B3D] text-white"
                  : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0B1B3D]"
              }`}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{item.label}</span>

              {item.label === "Talent Quest" && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                    active
                      ? "bg-[#F59E0B] text-[#0B1B3D]"
                      : "bg-[#FEF3C7] text-[#92400E]"
                  }`}
                >
                  Quest
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label={mobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
        aria-expanded={mobileMenuOpen}
        aria-controls="candidate-mobile-navigation"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#0B1B3D] transition-colors hover:bg-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] lg:hidden"
      >
        {mobileMenuOpen ? (
          <X size={21} aria-hidden="true" />
        ) : (
          <Menu size={21} aria-hidden="true" />
        )}
      </button>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav
          id="candidate-mobile-navigation"
          aria-label="Mobile candidate navigation"
          className="absolute inset-x-0 top-full border-t border-[#E2E8F0] bg-white px-4 py-3 shadow-lg sm:px-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#0B1B3D] text-white"
                      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0B1B3D]"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
