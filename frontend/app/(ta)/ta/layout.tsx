import type { ReactNode } from "react";
import TAShell from "@/components/layout/ta-shell";
import { TARouteGuard } from "@/components/auth/route-guard";

export default function TALayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TARouteGuard>
      <TAShell>{children}</TAShell>
    </TARouteGuard>
  );
}
