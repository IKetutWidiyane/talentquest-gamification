
import { UserRound } from "lucide-react";
import CandidatePagePlaceholder from "@/components/layout/candidate-page-placeholder";

export default function CandidateProfilePage() {
  return (
    <CandidatePagePlaceholder
      eyebrow="Your personal information"
      title="Candidate Profile"
      description="Informasi profil kandidat akan ditampilkan di sini untuk mendukung proses lamaran dan rekrutmen."
      icon={UserRound}
    />
  );
}
