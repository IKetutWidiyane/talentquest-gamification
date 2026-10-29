
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";
import CandidatePagePlaceholder from "@/components/layout/candidate-page-placeholder";

export default function CandidateJobsPage() {
  return (
    <CandidatePagePlaceholder
      eyebrow="Career opportunities"
      title="Explore Opportunities"
      description="Temukan peluang karier dan posisi yang sesuai dengan minat serta potensi kamu."
      icon={BriefcaseIcon}
    />
  );
}
