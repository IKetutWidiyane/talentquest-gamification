
import {
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Users,
  UserRound,
  Trophy,
  ChartNoAxesCombined,
  Settings,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppRole = "Candidate" | "Talent Acquisition";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const roleNavigation: Record<AppRole, NavigationItem[]> = {
  Candidate: [
    {
    label: "Overview",
    href: "/candidate",
    icon: LayoutDashboard,
    description: "Your candidate dashboard and activity overview",
    },
    {
      label: "Find Jobs",
      href: "/candidate/jobs",
      icon: BriefcaseBusiness,
      description: "Discover and apply for your dream job",
    },
    {
      label: "Talent Quest",
      href: "/candidate/talent-quest",
      icon: Trophy,
    },
    {
      label: "My Applications",
      href: "/candidate/applications",
      icon: FileText,
    },
    {
      label: "My Profile",
      href: "/candidate/profile",
      icon: UserRound,
    },
  ],

  "Talent Acquisition": [
    {
      label: "Overview",
      href: "/ta",
      icon: LayoutDashboard,
    },
    {
      label: "Candidates",
      href: "/ta/candidates",
      icon: Users,
    },
    {
      label: "Job Management",
      href: "/ta/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Assessments",
      href: "/ta/assessments",
      icon: ClipboardCheck,
    },
    {
      label: "Competencies",
      href: "/ta/competencies",
      icon: Target,
    },
    {
      label: "User Management",
      href: "/ta/users",
      icon: UserRound,
    },
    {
      label: "Talent Pool",
      href: "/ta/talent-pool",
      icon: Trophy,
    },
    {
      label: "Analytics",
      href: "/ta/analytics",
      icon: ChartNoAxesCombined,
    },
    {
      label: "Settings",
      href: "/ta/settings",
      icon: Settings,
    },
  ],
};

export function getDashboardPath(role: AppRole): string {
  return role === "Candidate" ? "/candidate" : "/ta";
}
