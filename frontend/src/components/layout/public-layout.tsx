
import type { ReactNode } from "react";
import { PublicNavbar } from "@/components/navigation/public-navbar";
import { PublicFooter } from "@/components/navigation/public-footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}
