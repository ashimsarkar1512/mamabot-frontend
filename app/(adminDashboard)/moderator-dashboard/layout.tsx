"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AdminSidebar from "@/components/layout/dashboard/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

type ModeratorDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function ModeratorDashboardLayout({
  children,
}: ModeratorDashboardLayoutProps) {
  return (
    <RoleGuard allowedRoles={["MODERATOR", "ADMIN"]}>
      <DashboardLayout sidebar={<AdminSidebar />}>{children}</DashboardLayout>
    </RoleGuard>
  );
}
