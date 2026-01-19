"use client";
import React from "react";
import {
  Users,
  User,
  Search,
  MessagesSquare,
  TriangleAlert,
  BellIcon,
  CalendarRange,
  AppleIcon,
  TrendingUp,
  BrainCircuit,
  MenuSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="h-full flex flex-col pt-16 md:pt-0">
      <div className="flex border-b !border-b-[#F3BBD5] pb-10 items-center duration-200 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 mr-1 flex items-center justify-center">
          <Image
            src="/images/icon.png"
            alt="Cliste"
            width={36}
            height={36}
            className="w-full h-full object-contain text-foreground "
          />
        </div>
        <span className="text-3xl text-[#D82479] font-semibold text-foreground">
          Mamabot
        </span>
        <Search className="text-[#D82479] w-5 h-5 ml-auto" />
      </div>

      <nav className="flex-1 pt-10 ">
        <ul className="space-y-2 ">
          <li>
            <Link
              href="/admin-dashboard"
              className={`flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group ${
                isActive("/admin-dashboard")
                  ? "bg-[#F3BBD5] text-[#D82479]"
                  : "text-[#D82479] hover:bg-[#F3BBD5]"
              }
    `}
            >
              <Users className="w-5 h-5" />
              <span className="ml-3">User Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/users"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <MessagesSquare className="w-5 h-5" />
              <span className="ml-3">Community Monitoring</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/analytics"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <TriangleAlert className="w-5 h-5" />
              <span className="ml-3">Reported Content</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <BellIcon className="w-5 h-5" />
              <span className="ml-3">Announcements</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <CalendarRange className="w-5 h-5" />
              <span className="ml-3">Weekly Pregnancy Content</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <AppleIcon className="w-5 h-5" />
              <span className="ml-3">Diet & Hydration</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="ml-3">Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <BrainCircuit className="w-5 h-5" />
              <span className="ml-3">AI Rules</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/settings"
              className="flex items-center p-3 text-lg text-[#D82479] rounded-lg hover:bg-gray-100 group"
            >
              <MenuSquare className="w-5 h-5" />
              <span className="ml-3">Content Management</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
