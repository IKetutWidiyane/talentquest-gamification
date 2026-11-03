"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { PublicLayout } from "@/components/layout/public-layout";
import JobListing from "@/features/jobs/job-listing";

export default function JobsPage() {
  const { isAuthenticated, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role === "CANDIDATE") {
      router.replace("/candidate/jobs");
    }
  }, [isLoading, isAuthenticated, role, router]);

  if (!isLoading && isAuthenticated && role === "CANDIDATE") {
    return null;
  }

  return (
    <PublicLayout>
      <JobListing />
    </PublicLayout>
  );
}
