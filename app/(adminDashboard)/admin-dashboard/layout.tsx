"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AdminSidebar from "@/components/layout/dashboard/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <DashboardLayout sidebar={<AdminSidebar />}>{children}</DashboardLayout>
    </RoleGuard>
  );
}
