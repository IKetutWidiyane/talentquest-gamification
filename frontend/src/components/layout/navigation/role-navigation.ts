
import {
  Briefcase,
  ClipboardText,
  FileText,
  SquaresFour,
  Users,
  User,
  Trophy,
  ChartLineUp,
  Gear,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export type AppRole = "Candidate" | "Talent Acquisition";

export interface NavigationItem {
  label: string;
  href: string;
  icon: Icon;
  description?: string;
}

export const roleNavigation: Record<AppRole, NavigationItem[]> = {
  Candidate: [
    {
    label: "Overview",
    href: "/candidate",
    icon: SquaresFour,
    description: "Your candidate dashboard and activity overview",
    },
    {
      label: "Find Jobs",
      href: "/candidate/jobs",
      icon: Briefcase,
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
      icon: User,
    },
  ],

  "Talent Acquisition": [
    {
      label: "Overview",
      href: "/ta",
      icon: SquaresFour,
    },
    {
      label: "Candidates",
      href: "/ta/candidates",
      icon: Users,
    },
    {
      label: "Job Management",
      href: "/ta/jobs",
      icon: Briefcase,
    },
    {
      label: "Assessments",
      href: "/ta/assessments",
      icon: ClipboardText,
    },
    {
      label: "Competencies",
      href: "/ta/competencies",
      icon: Target,
    },
    {
      label: "User Management",
      href: "/ta/users",
      icon: User,
    },
    {
      label: "Talent Pool",
      href: "/ta/talent-pool",
      icon: Trophy,
    },
    {
      label: "Analytics",
      href: "/ta/analytics",
      icon: ChartLineUp,
    },
    {
      label: "Settings",
      href: "/ta/settings",
      icon: Gear,
    },
  ],
};

export function getDashboardPath(role: AppRole): string {
  return role === "Candidate" ? "/candidate" : "/ta";
}
