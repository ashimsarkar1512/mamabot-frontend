"use client";

import {
  Menu,
  X,
  User,
  Settings,
  CreditCard,
  LogOut,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function UserHomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Mock state for demonstration (matching the image provided)
  const [isAuthenticated] = useState(true);
  const [user] = useState({
    name: "Sarah Collins",
    email: "sarah@mamabot.com",
    avatar: "/images/user-avatar.png", // Replace with actual path
  });

  const authDropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(e.target as Node)) {
        setIsAuthOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 ">
      <div className="mx-auto container">
        <div className="relative flex items-center justify-between rounded-full border border-gray-100 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md">
          
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#fce7f3] p-1">
              <Image 
                src="/images/icon.png" 
                alt="Mamabot Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-[#D82479]">Mamabot</span>
          </Link>

          {/* 2. Desktop Navigation (Centered) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {["Home", "About Us", "Blog", "Contact Us"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className=" text-gray-500 hover:text-[#D82479] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 3. Right Side Actions (User Profile & Notifications) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Info Group */}
                <div className="relative flex items-center gap-3 ">
                   <div className="text-right hidden sm:block">
                     <p className="text-sm font-semibold text-[#0ea5e9] leading-tight">{user.name}</p>
                     <p className="text-[11px] text-gray-400">{user.email}</p>
                   </div>
                   <button 
                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                    className="h-10 w-10 rounded-full overflow-hidden  hover:border-[#D82479] transition-all"
                   >
                     <Image 
                        src="/images/avatar.png" // The woman in your image
                        alt="Profile" 
                        width={40} 
                        height={40} 
                        className="object-cover"
                      />
                   </button>

                   {/* Dropdown Menu */}
                   {isAuthOpen && (
                    <div ref={authDropdownRef} className="absolute right-0 top-full mt-4 w-48 rounded-2xl bg-white p-2 shadow-xl border border-gray-50">
                        <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl"><User size={16}/> Profile</Link>
                        <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl"><Settings size={16}/> Settings</Link>
                        <div className="border-t my-1 border-gray-50" />
                        <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl"><LogOut size={16}/> Logout</button>
                    </div>
                   )}
                </div>
                
                {/* Notification Bell */}
                <button className="text-[#0ea5e9] hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Bell size={22} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="rounded-full bg-[#D82479] px-6 py-2 text-sm font-medium text-white hover:bg-[#b01d63] transition-all">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mt-4 flex flex-col gap-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl lg:hidden">
            {["Home", "About Us", "Blog", "Contact Us"].map((item) => (
              <Link
                key={item}
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-600 hover:text-[#D82479]"
              >
                {item}
              </Link>
            ))}
           
            <div className="flex items-center gap-3">
               <Image src="/images/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
               <div>
                  <p className="font-bold text-[#0ea5e9]">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}