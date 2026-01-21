import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next JS 16 Template - Landing Page",
  description: "mamabot",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
    <div className="container mx-auto   ">
        <main className="pt-12 ">{children}</main>
    </div>
      <Footer />
    </>
  );
}
