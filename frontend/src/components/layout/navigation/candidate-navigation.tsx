"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  ClipboardList,
  Trophy,
  UserRound,
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

interface CandidateNavigationProps {
  onNavigate?: () => void;
}

export default function CandidateNavigation({
  onNavigate,
}: CandidateNavigationProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label="Candidate navigation" className="space-y-1.5">
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Candidate Menu
      </p>

      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
              active
                ? "bg-[#0B1B3D] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            <Icon
              size={19}
              strokeWidth={active ? 2.2 : 1.8}
              aria-hidden="true"
              className={
                active
                  ? "text-[#F59E0B]"
                  : "text-slate-400 group-hover:text-[#0B1B3D]"
              }
            />

            <span>{item.label}</span>

            {item.label === "Talent Quest" && (
              <span
                className={`ml-auto rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                  active
                    ? "bg-[#F59E0B] text-[#0B1B3D]"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                Quest
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}