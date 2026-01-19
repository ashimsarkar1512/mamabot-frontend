"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ("ADMIN" | "USER" | "MODERATOR")[];
  fallbackRedirect?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallbackRedirect = "/unauthorized",
}: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (user && !hasAllowedRole(user.roles, allowedRoles)) {
      // Redirect if user doesn't have required role
      router.push(fallbackRedirect);
    }
  }, [isAuthenticated, user, allowedRoles, fallbackRedirect, router, pathname]);

  // Show loading while checking authentication
  if (!isAuthenticated || (user && !hasAllowedRole(user.roles, allowedRoles))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking permissions...</div>
      </div>
    );
  }

  // Check role-based access
  if (user && !hasAllowedRole(user.roles, allowedRoles)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Unauthorized access</div>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper function to check if user has any of the allowed roles
function hasAllowedRole(
  userRoles: string[],
  allowedRoles: ("ADMIN" | "USER" | "MODERATOR")[]
): boolean {
  if (!userRoles || !Array.isArray(userRoles)) {
    return false;
  }

  // Convert user roles to uppercase to match allowedRoles
  const normalizedUserRoles = userRoles.map((role) => role.toUpperCase());

  // Check if any of the user's roles match the allowed roles
  return allowedRoles.some((allowedRole) =>
    normalizedUserRoles.includes(allowedRole)
  );
}
