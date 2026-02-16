// app/(userDashboard)/user-dashboard/layout.tsx

"use client";
import ChatBot from "@/features/ChatBot";
import UserHomeNavbar from "./userNavbar/page";
import { Footer } from "@/components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/provider";

type UserDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  return (
    <Provider store={store}>
      <div
        className="absolute  lg:-top-60 lg:-right-60 lg:w-580 lg:h-100 
        -top-15 -right-10 w-95 h-60
    md:-top-20 md:-right-30 md:w-250 md:h-60
        rounded-full 
                  bg-[radial-gradient(circle_at_center,#F9DEEB_0%,transparent_70%)] 
                  blur-2xl"
      />
      <div className="min-h-screen relative ">
        {/* Fixed Navbar */}
        <UserHomeNavbar />
        <ChatBot />

        {/* Main content with padding to avoid overlap with fixed navbar */}
        <main className="mt-26 px-6 flex flex-col items-center">
          {/* pt-[104px] = navbar height (adjust if your navbar height changes) */}
          <div className="w-full container mx-auto ">{children}</div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
