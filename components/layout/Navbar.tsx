"use client";

import {
  Menu,
  X,
  User,
  Settings,
  CreditCard,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import CommonButton from "../ui/Reusable/CommonButton";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserDashboardQuery } from "@/redux/features/api/user/profile";
import { useLogOutMutation } from "@/redux/features/api/auth/authApi";
import Cookies from "js-cookie";
import { AnimatePresence,motion  } from "framer-motion";

type UserType = {
  name?: string;
  email: string;
  roles?: string[];
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const authDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useGetUserDashboardQuery(undefined);
   const [logout] = useLogOutMutation();

  // Derive authentication state from API data
  const isAuthenticated = !!data?.data;
  const user: UserType | null = data?.data
    ? {
        name: `${data.data.first_name} ${data.data.last_name}`.trim(),
        email: data.data.email,
        roles: [],
      }
    : null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Community", href: "#community" },
    { label: "Service", href: "#service" },
    { label: "Pricing", href: "#pricing" },
    { label: "Newsletter", href: "#newsletter" },
  ];

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Close dropdown on outside click
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 ">
      <div className="container mx-auto">


      <div className="relative flex items-center justify-between rounded-full border border-gray-100 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/icon.png" alt="Mamabot" width={40} height={40} />
          <span className="text-lg font-semibold text-[#D82479]">Mamabot</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {menuItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`font-medium transition-colors ${
                  activeHash === item.href
                    ? "text-[#D82479] font-semibold"
                    : "text-gray-800 hover:text-[#D82479]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* <ThemeToggle /> */}

          {isAuthenticated && user ? (
            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setIsAuthOpen(!isAuthOpen)}
                className="flex items-center gap-2 rounded-full bg-gray-200 p-1 pr-3 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#D82479] text-white">
                  <User size={16} />
                </div>
                <span className="max-w-30 truncate text-sm font-medium">
                  {user.name || user.email}
                </span>
              </button>

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
      <div className="absolute bottom-5 right-3 pointer-events-none">
        <Image
          src="/images/flower.png"
          alt="bg"
          width={100}
          height={100}
        />
      </div>

      <div className="relative z-10 space-y-1">
        {/* User Info */}
        <div className="px-4 py-3 border-b rounded-2xl bg-white/80 backdrop-blur-sm mb-2">
          <p className="font-medium text-gray-900">{user.name || "User"}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        {/* Links */}
        {[
          { href: "/user-dashboard", label: "Dashboard", icon: <CreditCard size={18} /> },
          { href: "/user-dashboard/profile", label: "Profile", icon: <User size={18} /> },
          { href: "/user-dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
        ].map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsAuthOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-[15px] transition-colors rounded-2xl
                ${
                  isActive
                    ? "font-bold text-[#D82479] bg-white shadow-sm border border-pink-50 rounded-full"
                    : "font-medium text-gray-700 hover:bg-pink-50/50"
                }`}
            >
              <span className={isActive ? "text-[#D82479]" : "text-gray-700"}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="cursor-pointer flex w-full items-center gap-3 px-4 py-4 text-[15px] font-bold text-red-500 hover:bg-red-50/50 rounded-2xl transition-colors mt-2"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <CommonButton
                  className="px-6 py-2"
                  text="Login"
                  icon={<CircleUserRound size={20} />}
                />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={toggleMenu} className="sm:hidden p-1">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <div className="flex flex-col px-4 py-4 gap-3">
            {menuItems.map((item) => {
              const isActive =
                pathname === "/" && item.href === `/${activeHash}`;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={toggleMenu}
                  className={`font-medium transition-colors
        ${
          isActive
            ? "text-[#D82479] font-semibold"
            : "text-gray-800 hover:text-[#D82479]"
        }
      `}
                >
                  {item.label}
                </Link>
              );
            })}

            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="border-t mt-2 pt-2 flex flex-col gap-2">
                <div className="px-2 py-2">
                  <p className="font-medium text-gray-900">{user.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <CreditCard size={16} /> Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-left transition-colors text-red-600 cursor-pointer"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2 border-t pt-2">
                <Link href="/login" onClick={toggleMenu}>
                  <Button text="Log in" variant="outline" className="w-full" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
            </div>
    </nav>
  );
}