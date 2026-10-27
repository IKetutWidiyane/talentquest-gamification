
import {
  BriefcaseIcon,
  ClipboardTextIcon,
  FileTextIcon,
  SquaresFourIcon,
  UsersIcon,
  UserIcon,
  TrophyIcon,
  ChartLineUpIcon,
  GearIcon,
  TargetIcon,
} from "@phosphor-icons/react";
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
    icon: SquaresFourIcon,
    description: "Your candidate dashboard and activity overview",
    },
    {
      label: "Find Jobs",
      href: "/candidate/jobs",
      icon: BriefcaseIcon,
      description: "Discover and apply for your dream job",
    },
    {
      label: "Talent Quest",
      href: "/candidate/talent-quest",
      icon: TrophyIcon,
    },
    {
      label: "My Applications",
      href: "/candidate/applications",
      icon: FileTextIcon,
    },
    {
      label: "My Profile",
      href: "/candidate/profile",
      icon: UserIcon,
    },
  ],

  "Talent Acquisition": [
    {
      label: "Overview",
      href: "/ta",
      icon: SquaresFourIcon,
    },
    {
      label: "Candidates",
      href: "/ta/candidates",
      icon: UsersIcon,
    },
    {
      label: "Job Management",
      href: "/ta/jobs",
      icon: BriefcaseIcon,
    },
    {
      label: "Assessments",
      href: "/ta/assessments",
      icon: ClipboardTextIcon,
    },
    {
      label: "Competencies",
      href: "/ta/competencies",
      icon: TargetIcon,
    },
    {
      label: "User Management",
      href: "/ta/users",
      icon: UserIcon,
    },
    {
      label: "Talent Pool",
      href: "/ta/talent-pool",
      icon: TrophyIcon,
    },
    {
      label: "Analytics",
      href: "/ta/analytics",
      icon: ChartLineUpIcon,
    },
    {
      label: "Settings",
      href: "/ta/settings",
      icon: GearIcon,
    },
  ],
};

export function getDashboardPath(role: AppRole): string {
  return role === "Candidate" ? "/candidate" : "/ta";
}
