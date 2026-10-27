
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy } from "@phosphor-icons/react";

import { roleNavigation } from "@/components/layout/navigation/role-navigation";

interface CandidateNavigationProps {
  onNavigate?: () => void;
}

export default function CandidateNavigation({
  onNavigate,
}: CandidateNavigationProps) {
  const pathname = usePathname();
  const navigationItems = roleNavigation.Candidate;

  function isActive(href: string) {
    if (href === "/candidate") {
      return pathname === "/candidate";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label="Candidate navigation">
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Menu
      </p>

      <ul className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const isQuest = item.href === "/candidate/talent-quest";

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                title={item.label}
                className={`group relative flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2 ${
                  active
                    ? "bg-slate-100 text-[#0B1B3D]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0B1B3D]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#F59E0B] transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />

                <Icon
                  size={18}
                  weight={active ? "bold" : "regular"}
                  aria-hidden="true"
                  className={
                    active
                      ? "shrink-0 text-[#0B1B3D]"
                      : "shrink-0 text-slate-400 group-hover:text-[#0B1B3D]"
                  }
                />

                <span className={active ? "font-semibold" : undefined}>
                  {item.label}
                </span>

                {isQuest && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                    <Trophy size={11} aria-hidden="true" />
                    Quest
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
