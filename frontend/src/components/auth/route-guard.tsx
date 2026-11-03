"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface RouteGuardProps {
  children: ReactNode;
}

function AuthLoadingState({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F9FA]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B1B3D]/20 border-t-[#0B1B3D]" />
        <p className="text-sm font-semibold text-[#0B1B3D]">{message}</p>
      </div>
    </div>
  );
}

export function CandidateRouteGuard({ children }: RouteGuardProps) {
  const { role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        const redirectParam = encodeURIComponent(pathname);
        router.replace(`/login?redirect=${redirectParam}`);
      } else if (role !== "CANDIDATE") {
        router.replace("/ta");
      }
    }
  }, [isLoading, isAuthenticated, role, router, pathname]);

  if (isLoading) {
    return <AuthLoadingState message="Memeriksa sesi login kandidat..." />;
  }

  if (!isAuthenticated || role !== "CANDIDATE") {
    return <AuthLoadingState message="Mengarahkan..." />;
  }

  return <>{children}</>;
}

export function TARouteGuard({ children }: RouteGuardProps) {
  const { role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        const redirectParam = encodeURIComponent(pathname);
        router.replace(`/login?redirect=${redirectParam}`);
      } else if (role !== "TALENT_ACQUISITION") {
        router.replace("/candidate");
      }
    }
  }, [isLoading, isAuthenticated, role, router, pathname]);

  if (isLoading) {
    return <AuthLoadingState message="Memeriksa sesi login Talent Acquisition..." />;
  }

  if (!isAuthenticated || role !== "TALENT_ACQUISITION") {
    return <AuthLoadingState message="Mengarahkan..." />;
  }

  return <>{children}</>;
}
