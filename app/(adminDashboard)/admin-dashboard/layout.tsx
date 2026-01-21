"use client";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AdminSidebar from "@/components/layout/dashboard/AdminSidebar";
import AdminHeader from "./AdminHeader";
import { comfortaa } from "@/app/fonts";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className={comfortaa.className}>
        <AdminHeader /> 
        {children}
      </div>
    </DashboardLayout>
  );
}
