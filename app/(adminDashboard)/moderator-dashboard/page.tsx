"use client";

import React from "react";
import type { Metadata } from "next";
import RoleGuard from "@/components/auth/RoleGuard";

export const metadata: Metadata = {
  title: "Moderator Dashboard - Next JS 16 Template",
  description: "Moderator dashboard for the Next.js 16 template application",
};

export default function ModeratorDashboard() {
  return (
    <RoleGuard allowedRoles={["MODERATOR", "ADMIN"]}>
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Moderator Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome moderator! Here&apos;s an overview of your moderation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Pending Reviews
            </h3>
            <p className="text-3xl font-bold text-gray-900">24</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              User Reports
            </h3>
            <p className="text-3xl font-bold text-gray-900">18</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Content Flags
            </h3>
            <p className="text-3xl font-bold text-gray-900">7</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Moderation Activity
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-4">
              No recent moderation activity to display.
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
