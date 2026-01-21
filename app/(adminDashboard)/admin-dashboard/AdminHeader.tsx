"use client";
import { usePathname } from "next/navigation";
import { adminSidebarMenu } from "./sidebar-menu";


export default function AdminHeader() {
  const pathname = usePathname();

  const activeItem = adminSidebarMenu.find((item) => item.href === pathname);

  return (
    <header className="mb-8">
      <h1 className="text-[#229ECF] font-bold" style={{ fontSize: "40px" }}>
        {activeItem?.label ?? "Dashboard"}
      </h1>
    </header>
  );
}
