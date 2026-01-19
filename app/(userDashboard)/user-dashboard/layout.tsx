"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import UserSidebar from "@/components/layout/dashboard/UserSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

type UserDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  return (
    <RoleGuard allowedRoles={["USER", "ADMIN", "MODERATOR"]}>
      <DashboardLayout sidebar={<UserSidebar />}>{children}</DashboardLayout>
    </RoleGuard>
  );
}
