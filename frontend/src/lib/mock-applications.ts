
export type ApplicationStatus =
  | "SUBMITTED"
  | "IN_REVIEW"
  | "ASSESSMENT"
  | "INTERVIEW"
  | "ACCEPTED"
  | "REJECTED";

export interface MockApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  workplace: string;
  appliedAt: string;
  status: ApplicationStatus;
  statusLabel: string;
  summary: string;
}

export const mockApplications: MockApplication[] = [
  {
    id: "app-demo-001",
    jobId: "job-demo-001",
    jobTitle: "Junior Frontend Developer",
    department: "Technology",
    location: "Bandung, Indonesia",
    employmentType: "Internship",
    workplace: "Hybrid",
    appliedAt: "2026-10-24T09:30:00",
    status: "IN_REVIEW",
    statusLabel: "Sedang Ditinjau",
    summary:
      "Lamaran sedang ditinjau oleh tim Talent Acquisition.",
  },
  {
    id: "app-demo-002",
    jobId: "job-demo-002",
    jobTitle: "UI/UX Designer Intern",
    department: "Digital Product",
    location: "Jakarta, Indonesia",
    employmentType: "Internship",
    workplace: "On-site",
    appliedAt: "2026-10-22T14:15:00",
    status: "ASSESSMENT",
    statusLabel: "Tahap Assessment",
    summary:
      "Kamu dapat melanjutkan ke tahapan assessment sesuai instruksi rekrutmen.",
  },
  {
    id: "app-demo-003",
    jobId: "job-demo-003",
    jobTitle: "Software Engineer Intern",
    department: "Engineering",
    location: "Bandung, Indonesia",
    employmentType: "Internship",
    workplace: "Hybrid",
    appliedAt: "2026-10-18T10:00:00",
    status: "SUBMITTED",
    statusLabel: "Lamaran Terkirim",
    summary:
      "Lamaran berhasil disimulasikan dan menunggu proses peninjauan.",
  },
];

export function getApplicationStatusStyle(status: ApplicationStatus) {
  switch (status) {
    case "SUBMITTED":
      return "bg-slate-100 text-slate-700";

    case "IN_REVIEW":
      return "bg-amber-100 text-amber-800";

    case "ASSESSMENT":
      return "bg-blue-100 text-blue-800";

    case "INTERVIEW":
      return "bg-violet-100 text-violet-800";

    case "ACCEPTED":
      return "bg-emerald-100 text-emerald-800";

    case "REJECTED":
      return "bg-rose-100 text-rose-800";

    default:
      return "bg-slate-100 text-slate-700";
  }
}
