
import Link from "next/link";
import { Mountain } from "lucide-react";

const footerLinks = [
  { label: "Beranda", href: "/" },
  { label: "Lowongan", href: "/jobs" },
  { label: "Talent Quest", href: "/talent-quest" },
  { label: "Masuk", href: "/login" },
];

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
                <Mountain size={21} />
              </span>

              <span className="text-base font-bold tracking-[0.12em] text-primary">
                EIGER
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted">
              Temukan peluang karier, kembangkan kompetensi, dan jelajahi
              potensimu bersama EIGER Talent Quest.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Navigasi
            </h2>

            <ul className="mt-3 flex flex-col gap-3">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5">
          <p className="text-xs leading-5 text-muted">
            © {new Date().getFullYear()} EIGER Talent Quest. Seluruh hak cipta
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
