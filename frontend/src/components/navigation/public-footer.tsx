import Link from "next/link";
import Image from "next/image";

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

const footerLinks = [
  { label: "Beranda", href: "/" },
  { label: "Lowongan", href: "/jobs" },
  { label: "Talent Quest", href: "/talent-quest" },
  { label: "Masuk", href: "/login" },
];

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#F8F9FA]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            {/* Logo Image */}
            <Link href="/" className="inline-flex items-center gap-3 group py-1">
              <Image
                src={LOGO_CONFIG.src}
                alt={LOGO_CONFIG.alt}
                width={LOGO_CONFIG.width}
                height={LOGO_CONFIG.height}
                className={LOGO_CONFIG.className}
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Temukan peluang karier, kembangkan kompetensi, dan jelajahi
              potensimu bersama EIGER Talent Quest.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#0B1B3D] uppercase tracking-wider">
              Navigasi
            </h2>

            <ul className="mt-3.5 flex flex-col gap-2.5">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-amber-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs leading-5 text-slate-500">
            © {new Date().getFullYear()} EIGER Talent Quest. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}