
import type { ReactNode } from "react";
import TAShell from "@/components/layout/ta-shell";

export default function TALayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TAShell>{children}</TAShell>;
}
