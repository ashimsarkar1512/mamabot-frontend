"use client";

import { Menu, X, Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLogOutMutation } from "@/redux/features/api/auth/authApi";
import Cookies from "js-cookie";


import {
  useGetUserDashboardQuery,
} from "@/redux/features/api/user/profile";

import {
  useGetLoggedInNotificationsQuery,
  useMarkAsReadMutation,
} from "@/redux/features/api/user/notification";
import { toast } from "sonner";

export default function UserHomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileAuthOpen, setIsMobileAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

  const [logout] = useLogOutMutation();

  const router = useRouter();
 
  const { data } = useGetUserDashboardQuery(undefined);
  const profile = data?.data;

  const { data: notificationsResponse } =
    useGetLoggedInNotificationsQuery(undefined);
  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();

  const notifications = notificationsResponse?.data || [];

  console.log(notifications,"notification")
  // Inside your component
const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

// Filter notifications based on tab
const filteredNotifications =
  activeTab === "all"
    ? notifications
    : notifications.filter((n: any) => n.read_at === null);


  const navItems = [
    { label: "Home", href: "/user-dashboard" },
    { label: "About Us", href: "/user-dashboard/about-us" },
    { label: "Blog", href: "/user-dashboard/blog" },
    { label: "Contact Us", href: "/user-dashboard/contact-us" },
    // { label: "Saved Items", href: "/user-dashboard/saved-items" },
  ];

  const links = [
    { name: "profile", label: "My Profile", href: "/user-dashboard/profile" },
    {
      name: "saved",
      label: "Saved Recommends",
      href: "/user-dashboard/saved-items",
      icon: <BookOpen size={18} />,
    },
    {
      name: "subscription",
      label: "Subscription & Plan",
      href: "/user-dashboard/subscription-plan",
    },
    { name: "settings", label: "Settings", href: "/user-dashboard/settings" },
  ];

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
      if (
        authDropdownRef.current &&
        !authDropdownRef.current.contains(e.target as Node)
      ) {
        setIsAuthOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      Cookies.remove("token");
      Cookies.remove("role");

      router.replace("/login");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAsRead({ all: true }).unwrap();

      toast.success("All notifications marked as read ✅");
    } catch (error: any) {
      console.error("Mark all read failed", error);

      toast.error(
        error?.data?.message ||
          "Failed to mark notifications as read. Please try again.",
      );
    }
  };

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
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors
          ${
            isActive
              ? "text-[#229ECF]" // active
              : "text-gray-500 hover:text-[#229ECF]"
          }
        `}
                >
                  {item.label}
                </Link> 
              );
            })}
          </div>

          {/* 3. Right Side Actions (User Profile & Notifications) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Info Group */}
                <div className="relative flex items-center gap-3">
                  {/* User Info Text */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-[#0ea5e9] leading-tight">
                      {`${profile?.first_name} ${profile?.last_name}`}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {profile?.email}
                    </p>
                  </div>

                  {/* Profile Button */}
                  <button
                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                    className={`h-10 w-10 rounded-full overflow-hidden  transition-all cursor-pointer ${
                      isAuthOpen ? "border-[#D82479]" : "border-transparent"
                    }`}
                  >
                    <Image
                      src="/images/avatar.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </button>

                  {/* Dropdown Menu with Framer Motion */}
                  <AnimatePresence>
                    {isAuthOpen && (
                      <motion.div
                        ref={authDropdownRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-4 w-64 rounded-[2rem] bg-white/90 backdrop-blur-sm p-3 shadow-2xl border border-pink-50 z-50 overflow-hidden"
                      >
                        {/* Decorative Flower Background */}
                        <div className="absolute bottom-5 right-3  pointer-events-none">
                          <Image
                            src="/images/flower.png"
                            alt="bg"
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className="relative z-10 space-y-1">
                          {links.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsAuthOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-[15px] transition-colors rounded-2xl
                    ${
                      isActive
                        ? "font-bold text-[#D82479] bg-white shadow-sm border border-pink-50 rounded-full"
                        : "font-medium text-gray-700 hover:bg-pink-50/50"
                    }
                  `}
                              >
                                {link.icon && (
                                  <span
                                    className={
                                      isActive
                                        ? "text-[#D82479]"
                                        : "text-gray-700"
                                    }
                                  >
                                    {link.icon}
                                  </span>
                                )}
                                {link.label}
                              </Link>
                            );
                          })}

                          <button
                            onClick={handleLogout}
                            className="cursor-pointer flex w-full items-center gap-3 px-4 py-4 text-[15px] font-bold text-red-500 hover:bg-red-50/50 rounded-2xl transition-colors mt-2"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Notification Bell */}
                <button
                  onClick={() => setIsNotificationsOpen(true)}
                  className="text-[#0ea5e9] hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <Bell size={22} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#D82479] px-6 py-2 text-sm font-medium text-white hover:bg-[#b01d63] transition-all"
              >
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mt-4 flex flex-col gap-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl lg:hidden overflow-hidden"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-medium transition-colors
                ${
                  isActive
                    ? "text-[#0ea5e9]" // active
                    : "text-gray-600 hover:text-[#D82479]"
                }
              `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {isAuthenticated && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setIsMobileAuthOpen(!isMobileAuthOpen)}
                    className="flex w-full items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        src="/images/avatar.png"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full border border-pink-100"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-[#0ea5e9] group-hover:text-[#D82479] transition-colors leading-tight">
                        {profile ? `${profile.first_name} ${profile.last_name}` : user.name}
                      </p>
                      <p className="text-xs text-gray-400">{profile?.email || user.email}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isMobileAuthOpen ? 180 : 0 }}
                      className="text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isMobileAuthOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 space-y-1 pl-4 overflow-hidden"
                      >
                        {links.map((link) => {
                          const isActive = pathname === link.href;

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileAuthOpen(false);
                              }}
                              className={`flex items-center gap-3 px-4 py-3 text-[15px] transition-colors rounded-2xl
                        ${
                          isActive
                            ? "font-bold text-[#D82479] bg-pink-50/50"
                            : "font-medium text-gray-700 hover:bg-pink-50/30"
                        }
                      `}
                            >
                              {link.icon && (
                                <span className={isActive ? "text-[#D82479]" : "text-gray-500"}>
                                  {link.icon}
                                </span>
                              )}
                              {link.label}
                            </Link>
                          );
                        })}

                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="cursor-pointer flex w-full items-center gap-3 px-4 py-4 text-[15px] font-bold text-red-500 hover:bg-red-50/50 rounded-2xl transition-colors mt-2"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NOTIFICATIONS MODAL */}
    <AnimatePresence>
  {isNotificationsOpen && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] p-8 md:p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#E91E63] text-2xl font-bold">
            Notifications
          </h2>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 font-bold text-sm transition-colors cursor-pointer ${
              activeTab === "all"
                ? "text-[#3EB1E4] border-b-2 border-[#3EB1E4]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`pb-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "unread"
                ? "text-[#3EB1E4] border-b-2 border-[#3EB1E4]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Unread ({notifications.filter((n: any) => n.read_at === null).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
          {filteredNotifications.map((item: any) => (
            <div
              key={item.id}
              className="p-4 bg-[#F8FBFF] border border-blue-50 rounded-2xl"
            >
              <h3 className="text-[#3EB1E4] font-bold text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.message}
              </p>
              <p className="text-gray-400 text-[10px] mt-1">
                {item.created_at_formatted}
              </p>
            </div>
          ))}
          {filteredNotifications.length === 0 && (
            <p className="text-center text-gray-400 text-sm">
              No notifications yet
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-8">
          <button
            onClick={handleMarkAllAsRead}
            disabled={isMarking}
            className="w-full py-3.5 rounded-xl bg-[#E91E63] text-white font-bold shadow-lg hover:bg-pink-700 transition-colors cursor-pointer disabled:opacity-60"
          >
            {isMarking ? "Marking..." : "Mark all as read"}
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </nav>
  );
}
