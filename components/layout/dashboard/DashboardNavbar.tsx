import React from "react";
import { Bell, User } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 md:hidden">
          Dashboard Panel
        </h1>
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          Dashboard Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-700" />
          </div>
          <span className="hidden md:inline text-gray-700 font-medium">
            Dashboard User
          </span>
        </div>
      </div>
    </div>
  );
}
