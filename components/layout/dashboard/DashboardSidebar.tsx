import React from "react";
import { Home, Users, BarChart3, Settings, LogOut, User } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <div className="h-full flex flex-col pt-16 md:pt-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <Home className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/Dashboard-dashboard/users"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <Users className="w-5 h-5" />
              <span className="ml-3">Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="ml-3">Analytics</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <Settings className="w-5 h-5" />
              <span className="ml-3">Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Dashboard User</p>
            <p className="text-xs text-gray-500">Dashboard@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
