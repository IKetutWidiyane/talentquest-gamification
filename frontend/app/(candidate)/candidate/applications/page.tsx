
import { ClipboardList } from "lucide-react";
import CandidatePagePlaceholder from "@/components/layout/candidate-page-placeholder";

export default function CandidateApplicationsPage() {
  return (
    <CandidatePagePlaceholder
      eyebrow="Your career journey"
      title="My Applications"
      description="Pantau daftar lamaran dan perkembangan proses rekrutmen kamu."
      icon={ClipboardList}
    />
  );
}
