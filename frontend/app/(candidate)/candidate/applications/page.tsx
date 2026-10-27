
import { ClipboardText } from "@phosphor-icons/react/dist/ssr";
import CandidatePagePlaceholder from "@/components/layout/candidate-page-placeholder";

export default function CandidateApplicationsPage() {
  return (
    <CandidatePagePlaceholder
      eyebrow="Your career journey"
      title="My Applications"
      description="Pantau daftar lamaran dan perkembangan proses rekrutmen kamu."
      icon={ClipboardText}
    />
  );
}
