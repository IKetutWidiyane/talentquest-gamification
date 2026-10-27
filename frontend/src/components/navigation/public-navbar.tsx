"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

// ========================================
// CUSTOM LOGO CONFIGURATION
// ========================================
const LOGO_CONFIG = {
  src: "/images/eigerindompi-logo.png",
  alt: "EIGERINDO MPI CAREER",
  width: 140,
  height: 40,
  className: "h-9 w-auto object-contain",
};

const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Cari Lowongan", href: "/jobs" },
  { label: "Talent Quest", href: "/talent-quest" },
];

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 group py-2"
          aria-label="EIGER Talent Quest - Beranda"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={LOGO_CONFIG.src}
            alt={LOGO_CONFIG.alt}
            width={LOGO_CONFIG.width}
            height={LOGO_CONFIG.height}
            className={LOGO_CONFIG.className}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#0B1B3D]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0B1B3D] transition-colors hover:bg-slate-100"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#0B1B3D] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#142952]"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="public-mobile-menu"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-[#0B1B3D] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-amber-600 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <nav
          id="public-mobile-menu"
          aria-label="Navigasi mobile"
          className="border-t border-slate-200 bg-white px-4 py-5 md:hidden shadow-lg"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1.5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3.5 py-3 text-sm font-semibold text-[#0B1B3D] hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-[#0B1B3D]"
              >
                Masuk
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0B1B3D] px-4 py-3 text-center text-sm font-semibold text-white"
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