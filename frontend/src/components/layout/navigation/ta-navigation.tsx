
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  ClipboardCheck,
  Target,
  UserCog,
  Trophy,
  ChartNoAxesCombined,
} from "lucide-react";

const navigationItems = [
  { label: "Overview", href: "/ta", icon: LayoutDashboard },
  { label: "Candidates", href: "/ta/candidates", icon: Users },
  { label: "Jobs", href: "/ta/jobs", icon: BriefcaseBusiness },
  { label: "Assessments", href: "/ta/assessments", icon: ClipboardCheck },
  { label: "Competencies", href: "/ta/competencies", icon: Target },
  { label: "Users", href: "/ta/users", icon: UserCog },
  { label: "Talent Pool", href: "/ta/talent-pool", icon: Trophy },
  { label: "Analytics", href: "/ta/analytics", icon: ChartNoAxesCombined },
];

interface TANavigationProps {
  onNavigate?: () => void;
}

export default function TANavigation({ onNavigate }: TANavigationProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/ta") return pathname === "/ta";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label="Talent Acquisition navigation" className="space-y-1.5">
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Talent Acquisition
      </p>

      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
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
          </Link>
        );
      })}
    </nav>
  );
}
