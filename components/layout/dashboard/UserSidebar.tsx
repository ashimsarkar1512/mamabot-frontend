import React from "react";
import { Home, User as UserIcon, Settings, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";

export default function UserSidebar() {
  return (
    <div className="h-full flex flex-col pt-16 md:pt-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">User Dashboard</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/user-dashboard"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <Home className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user-dashboard/profile"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <UserIcon className="w-5 h-5" />
              <span className="ml-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user-dashboard/billing"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <CreditCard className="w-5 h-5" />
              <span className="ml-3">Billing</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user-dashboard/settings"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <Settings className="w-5 h-5" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <UserIcon className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">User</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
