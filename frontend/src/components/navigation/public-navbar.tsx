
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";

const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Cari Lowongan", href: "/jobs" },
  { label: "Talent Quest", href: "/talent-quest" },
];

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="EIGER Talent Quest - Beranda"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
            <Mountain size={23} strokeWidth={2.2} />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-[0.12em] text-primary">
              EIGER
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-muted">
              TALENT QUEST
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-background"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-accent"
          >
            Daftar
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="public-mobile-menu"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-primary-accent md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="public-mobile-menu"
          aria-label="Navigasi mobile"
          className="border-t border-border bg-surface px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-background"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-primary"
              >
                Masuk
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Daftar
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
