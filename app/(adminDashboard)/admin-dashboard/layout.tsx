"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AdminSidebar from "@/components/layout/dashboard/AdminSidebar";


type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    
      <DashboardLayout sidebar={<AdminSidebar />}>{children}</DashboardLayout>
    
  );
}
