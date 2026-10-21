
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { roleNavigation } from "@/components/layout/navigation/role-navigation";

interface TANavigationProps {
  onNavigate?: () => void;
}

export default function TANavigation({
  onNavigate,
}: TANavigationProps) {
  const pathname = usePathname();
  const navigationItems = roleNavigation["Talent Acquisition"];

  function isActive(href: string) {
    // Overview hanya aktif pada halaman utama TA.
    if (href === "/ta") {
      return pathname === "/ta";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label="Talent Acquisition navigation" className="space-y-1.5">
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Talent Acquisition
      </p>

      <ul className="space-y-1.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={item.label}
                className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2 ${
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
                      ? "shrink-0 text-[#F59E0B]"
                      : "shrink-0 text-slate-400 group-hover:text-[#0B1B3D]"
                  }
                />

                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
