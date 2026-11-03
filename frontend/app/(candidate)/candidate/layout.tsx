import type { ReactNode } from "react";
import CandidateShell from "@/components/layout/candidate-shell";
import { CandidateRouteGuard } from "@/components/auth/route-guard";

interface CandidateLayoutProps {
  children: ReactNode;
}

export default function CandidateLayout({
  children,
}: CandidateLayoutProps) {
  return (
    <CandidateRouteGuard>
      <CandidateShell>{children}</CandidateShell>
    </CandidateRouteGuard>
  );
}
