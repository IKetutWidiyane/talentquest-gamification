
import { PublicLayout } from "@/components/layout/public-layout";
import JobListing from "@/features/jobs/job-listing";

export default function JobsPage() {
  return (
    <PublicLayout>
      <JobListing />
    </PublicLayout>
  );
}
