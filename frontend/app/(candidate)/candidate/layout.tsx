
import type { ReactNode } from "react";
import CandidateShell from "@/components/layout/candidate-shell";

interface CandidateLayoutProps {
  children: ReactNode;
}

export default function CandidateLayout({
  children,
}: CandidateLayoutProps) {
  return <CandidateShell>{children}</CandidateShell>;
}
