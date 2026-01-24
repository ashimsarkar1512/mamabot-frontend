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

type UserType = {
  name?: string;
  email: string;
  roles?: string[];
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // TEMP auth state (replace later with real auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const authDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAuthOpen(false);
  };

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
    <nav className="fixed top-0 right-0 left-0 z-50 px-5 md:px-20 py-4  ">
      <div className="relative mx-auto flex container items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 border ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/icon.png" alt="Mamabot" width={40} height={40} />
          <span className="text-lg font-semibold text-[#D82479]">Mamabot</span>
        </Link>

        {/* Desktop & Tablet Menu */}
        <div className="hidden sm:flex items-center gap-8">
          {["Home", "About", "Blog", "Community", "Newsletter", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="font-medium text-gray-800 hover:text-[#D82479] transition-colors"
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* <ThemeToggle /> */}

          {isAuthenticated && user ? (
            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setIsAuthOpen(!isAuthOpen)}
                className="flex items-center gap-2 rounded-full bg-gray-200 p-1"
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#D82479] text-white">
                  <User size={16} />
                </div>
                <span className="max-w-25 truncate">
                  {user.name || user.email}
                </span>
              </button>

              {isAuthOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg border">
                  <div className="px-4 py-2">
                    <p className="font-medium">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="border-t my-1" />
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <CreditCard size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
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
              {/* <Button text="Log in" href="/login" variant="outline" /> */}
              {/* <Button
                text="Get Started"
                href="/register"
                icon={<ChevronRight size={16} />}
              /> */}
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
            {[
              "Home",
              "About",
              "Blog",
              "Community",
              "Newsletter",
              "Contact",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={toggleMenu}
                className="font-medium text-gray-800 hover:text-[#D82479] transition-colors"
              >
                {item}
              </Link>
            ))}

            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="border-t mt-2 pt-2 flex flex-col gap-2">
                <p className="font-medium">{user.name || "User"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>

                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded"
                >
                  <CreditCard size={16} /> Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-left"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2 border-t pt-2">
                <Button
                  text="Log in"
                  href="/login"
                  variant="outline"
                  onClick={toggleMenu}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
