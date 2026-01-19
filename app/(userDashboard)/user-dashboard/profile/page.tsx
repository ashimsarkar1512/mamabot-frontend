"use client";

import React from "react";
import type { Metadata } from "next";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "User Profile - Next JS 16 Template",
  description:
    "View and manage your profile in the Next.js 16 template application",
};

export default function UserProfilePage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["USER", "ADMIN", "MODERATOR"]}>
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">
            View and manage your personal information.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Profile Information
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mr-6">
                <span className="text-gray-700 font-medium text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {user?.name || "User Name"}
                </h3>
                <p className="text-gray-600">
                  {user?.email || "user@example.com"}
                </p>
                <div className="mt-2">
                  {user?.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900">{user?.name || "N/A"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{user?.email || "N/A"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Created
                </label>
                <p className="text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-3">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
