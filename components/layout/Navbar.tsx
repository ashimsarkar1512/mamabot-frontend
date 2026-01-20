// "use client";

// import {
//   Menu,
//   X,
//   User,
//   LogOut,
//   Settings,
//   CreditCard,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { useAppDispatch } from "@/redux/store/hooks";
// import { logOut } from "@/redux/features/slice/authSlice";
// import { ThemeToggle } from "@/components/ui/ThemeToggle";
// import Image from "next/image";
// import Button from "../ui/Button";
// import { getRedirectPath } from "@/lib/role-utils";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const authDropdownRef = useRef<HTMLDivElement>(null);

//   const { user, isAuthenticated } = useAuth();
//   const dispatch = useAppDispatch();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logOut());
//     setIsAuthOpen(false);
//   };

//   // Close auth dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         authDropdownRef.current &&
//         !authDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsAuthOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <section className="bg-background">
//       <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-4 sm:px-6">
//         <div className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 border  ">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
//           >
//             <div className="w-10 h-10 md:w-12 md:h-12 mr-1 flex items-center justify-center">
//               <Image
//                 src="/images/icon.png"
//                 alt="Cliste"
//                 width={40}
//                 height={40}
//                 className="w-full h-full object-contain text-foreground "
//               />
//             </div>
//             <span className="text-lg text-[#D82479] font-semibold text-foreground">
//               Mamabot
//             </span>
//           </Link>

//           {/* Navigation Links - Centered */}
//           <div className="hidden sm:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
//             <Link
//               href="/"
//               className="text-base font-medium text-foreground  transition-colors hover:text-primary"
//             >
//               Home
//             </Link>
//             <Link
//               href="/about"
//               className="text-base font-medium text-foreground transition-colors hover:text-primary"
//             >
//               About Us
//             </Link>
//             <Link
//               href="/blog"
//               className="text-base font-medium text-foreground transition-colors hover:text-primary"
//             >
//              Blog
//             </Link>
//             <Link
//               href="/community"
//               className="text-base font-medium text-foreground transition-colors hover:text-primary"
//             >
//               Community
//             </Link>
//             <Link
//               href="/newsletter"
//               className="text-base font-medium text-foreground transition-colors hover:text-primary"
//             >
//               Newsletter
//             </Link>
//           </div>

//           {/* Right Side Actions */}
//           <div className="hidden sm:flex items-center gap-3">
//             {/* <ThemeToggle /> */}
//             {isAuthenticated && user ? (
//               <div className="relative" ref={authDropdownRef}>
//                 <button
//                   onClick={() => setIsAuthOpen(!isAuthOpen)}
//                   className="flex items-center gap-2 rounded-full bg-muted p-1 text-base focus:outline-none focus:ring-2 focus:ring-primary"
//                   aria-expanded={isAuthOpen}
//                   aria-haspopup="true"
//                 >
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
//                     <User className="h-4 w-4" />
//                   </div>
//                   <span className="hidden sm:block truncate max-w-[100px] text-base font-medium">
//                     {user.name || user.email.split("@")[0]}
//                   </span>
//                 </button>

//                 {isAuthOpen && (
//                   <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 z-50">
//                     <div className="py-1">
//                       <div className="px-4 py-2">
//                         <p className="text-base font-medium text-foreground truncate">
//                           {user.name || "User"}
//                         </p>
//                         <p className="text-xs text-muted-foreground truncate">
//                           {user.email}
//                         </p>
//                       </div>

//                       <div className="border-t border-border my-1"></div>

//                       <Link
//                         href={
//                           user?.roles
//                             ? getRedirectPath(user.roles)
//                             : "/user-dashboard"
//                         }
//                         className="flex items-center gap-2 px-4 py-2 text-base text-foreground hover:bg-muted transition-colors"
//                         onClick={() => setIsAuthOpen(false)}
//                       >
//                         <CreditCard className="h-4 w-4" />
//                         <span>Dashboard</span>
//                       </Link>

//                       <Link
//                         href="/profile"
//                         className="flex items-center gap-2 px-4 py-2 text-base text-foreground hover:bg-muted transition-colors"
//                         onClick={() => setIsAuthOpen(false)}
//                       >
//                         <User className="h-4 w-4" />
//                         <span>Profile</span>
//                       </Link>

//                       <Link
//                         href="/settings"
//                         className="flex items-center gap-2 px-4 py-2 text-base text-foreground hover:bg-muted transition-colors"
//                         onClick={() => setIsAuthOpen(false)}
//                       >
//                         <Settings className="h-4 w-4" />
//                         <span>Settings</span>
//                       </Link>

//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center gap-2 px-4 py-2 text-base text-foreground hover:bg-muted transition-colors"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         <span>Sign out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button text="Log in" variant="outline" href="/login" />
//                 {/* <Button
//                   text="Get Started"
//                   className="bg-white"
//                   icon={<ChevronRight size={16} />}
//                   href="/register"
//                 /> */}
//               </div>
//             )}
//           </div>

//           {/* Hamburger Button for Mobile */}
//           <button
//             className="text-foreground focus:outline-none sm:hidden"
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6 cursor-pointer" />
//             ) : (
//               <Menu className="h-6 w-6 cursor-pointer" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="mt-2 rounded-lg bg-muted px-4 py-4 shadow-sm backdrop-blur-sm sm:hidden border">
//             <div className="flex flex-col gap-4">
//               <Link
//                 href="/"
//                 className="text-base font-medium text-foreground transition-colors hover:text-primary"
//                 onClick={toggleMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-base font-medium text-foreground transition-colors hover:text-primary"
//                 onClick={toggleMenu}
//               >
//                 About us
//               </Link>
//               <Link
//                 href="/blog"
//                 className="text-base font-medium text-foreground transition-colors hover:text-primary"
//                 onClick={toggleMenu}
//               >
//                 Blog
//               </Link>
//               <Link
//                 href="/community"
//                 className="text-base font-medium text-foreground transition-colors hover:text-primary"
//                 onClick={toggleMenu}
//               >
//                Community
//               </Link>
//               <Link
//                 href="/newsletter"
//                 className="text-base font-medium text-foreground transition-colors hover:text-primary"
//                 onClick={toggleMenu}
//               >
//                 Newsletter
//               </Link>
//               <ThemeToggle />
//               {isAuthenticated && user ? (
//                 <div className="pt-2 border-t border-border">
//                   <div className="px-2 py-3">
//                     <p className="text-base font-medium text-foreground truncate">
//                       {user.name || "User"}
//                     </p>
//                     <p className="text-xs text-muted-foreground truncate">
//                       {user.email}
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     <Link
//                       href={
//                         user?.roles
//                           ? getRedirectPath(user.roles)
//                           : "/user-dashboard"
//                       }
//                       className="flex items-center gap-2 px-2 py-2 text-base text-foreground hover:bg-muted transition-colors rounded"
//                       onClick={() => {
//                         setIsMenuOpen(false);
//                         setIsAuthOpen(false);
//                       }}
//                     >
//                       <CreditCard className="h-4 w-4" />
//                       <span>Dashboard</span>
//                     </Link>

//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-2 px-2 py-2 text-base text-foreground hover:bg-muted transition-colors rounded"
//                       onClick={() => {
//                         setIsMenuOpen(false);
//                         setIsAuthOpen(false);
//                       }}
//                     >
//                       <User className="h-4 w-4" />
//                       <span>Profile</span>
//                     </Link>

//                     <Link
//                       href="/settings"
//                       className="flex items-center gap-2 px-2 py-2 text-base text-foreground hover:bg-muted transition-colors rounded"
//                       onClick={() => {
//                         setIsMenuOpen(false);
//                         setIsAuthOpen(false);
//                       }}
//                     >
//                       <Settings className="h-4 w-4" />
//                       <span>Settings</span>
//                     </Link>

//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsMenuOpen(false);
//                       }}
//                       className="flex w-full items-center gap-2 px-2 py-2 text-base text-foreground hover:bg-muted transition-colors rounded"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Sign out</span>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="pt-2 border-t border-border flex flex-col gap-2">
//                   <Button
//                     text="Log in"
//                     variant="outline"
//                     href="/login"
//                     // size="sm"
//                     onClick={() => setIsMenuOpen(false)}
//                   />

//                   <Button
//                     text="Get Started"
//                     className="bg-white"
//                     icon={<ChevronRight className="w-full" />}
//                     href="/register"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </section>
//   );
// }

"use client";

import {
  Menu,
  X,
  User,
  Settings,
  CreditCard,
  ChevronRight,
  LogOut,
  LogIn,
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
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-4 sm:px-6 ">
      <div className="relative mx-auto flex container items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 border ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/icon.png" alt="Mamabot" width={40} height={40} />
          <span className="text-lg font-semibold text-[#D82479]">Mamabot</span>
        </Link>

        {/* Desktop & Tablet Menu */}
        <div className="hidden sm:flex items-center gap-8">
          {["Home", "About", "Blog", "Community", "Newsletter"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="font-medium text-gray-800 hover:text-[#D82479] transition-colors"
            >
              {item}
            </Link>
          ))}
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
                <span className="max-w-[100px] truncate">
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
              <CommonButton
                className="px-6 py-2"
                text="Login"
                icon={<CircleUserRound size={20} />}
              />
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
            {["Home", "About", "Blog", "Community", "Newsletter"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={toggleMenu}
                  className="font-medium text-gray-800 hover:text-[#D82479] transition-colors"
                >
                  {item}
                </Link>
              ),
            )}

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
                <Button
                  text="Get Started"
                  href="/register"
                  icon={<ChevronRight size={16} />}
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
