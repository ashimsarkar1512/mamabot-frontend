"use client";

import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-linear-to-r from-[#FFECF4] via-[#FFF9FB] to-[#FFF9FB]"
    >
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0  my-11 rounded-3xl p-11 w-90 ml-6 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        {sidebar || <DashboardSidebar />}
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Page content */}
        <main className="flex-1 overflow-y-auto my-11 px-7">{children}</main>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white md:hidden"
        aria-label="Open menu"
      >
        ☰
      </button>
    </div>
  );
}
