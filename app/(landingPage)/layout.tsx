import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ReduxProvider from "@/redux/provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "mamabot",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <div className="relative overflow-hidden">
        {/* Oval gradient background */}
        <div
          className="absolute  lg:-top-60 lg:-right-60 lg:w-580 lg:h-100 
        -top-15 -right-10 w-95 h-60
    md:-top-20 md:-right-30 md:w-250 md:h-60
        rounded-full 
                  bg-[radial-gradient(circle_at_center,#F9DEEB_0%,transparent_70%)] 
                  blur-2xl"
        />
        <Navbar />
        <div className="container mx-auto   ">
          <main className="pt-12 ">{children}</main>
        </div>
        <Footer />
      </div>
    </ReduxProvider>
  );
}
