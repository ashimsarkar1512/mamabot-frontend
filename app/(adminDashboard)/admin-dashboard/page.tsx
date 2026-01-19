import React from "react";
import { Check, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Next JS 16 Template",
  description:
    "Admin dashboard for managing the Next.js 16 template application",
};

export default function AdminDashboard() {
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here&#39;s what&#39;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-gray-900">1,248</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Active Sessions
          </h3>
          <p className="text-3xl font-bold text-gray-900">128</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">$4,230</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Tasks</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">U</span>
                </div>
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-gray-500">
                  John Doe joined 2 minutes ago
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className="font-medium">Task completed</p>
                <p className="text-sm text-gray-500">
                  Update user profiles completed
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
              <div>
                <p className="font-medium">System warning</p>
                <p className="text-sm text-gray-500">
                  High memory usage detected
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            User Statistics
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">
              Chart visualization would appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
