import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard - Next JS 16 Template",
  description: "User dashboard for the Next.js 16 template application",
};

export default function UserDashboard() {
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">My Orders</h3>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Wishlist</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Points</h3>
          <p className="text-3xl font-bold text-gray-900">450</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-4">
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}
