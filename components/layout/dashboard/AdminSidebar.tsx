"use client";
import React from "react";
import { User, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { adminSidebarMenu } from "@/app/(adminDashboard)/admin-dashboard/sidebar-menu";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="h-full flex flex-col overflow-y-auto   ">
      <div className="flex border-b border-b-[#F3BBD5]! pb-10 items-center duration-200 cursor-pointer">
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

      <nav className="pt-10 border-b !border-b-[#F3BBD5]">
        <ul className="space-y-2">
          {adminSidebarMenu.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition ${active
                      ? "bg-[#FBE9F2] text-[#D82479]"
                      : "text-[#D82479] hover:bg-[#FBE9F2]"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3 text-lg">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-10 rounded-2xl  bg-[#F9DEEB] ">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <Image
              src="/images/Avatar.png"
              alt="Cliste"
              width={48}
              height={48}
              className="w-full h-full object-contain text-foreground "
            />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">Sarah Colins</p>
            <p className="text-base text-[#737373]">saracolins@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}






