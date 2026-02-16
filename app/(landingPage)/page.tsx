import ChatSection from "@/components/landing/home/ChatSection";
import HeroSection from "@/components/landing/home/HeroSection";
import LearnAndGrow from "@/components/landing/home/LearnAndGrowSection";
import SupportSection from "@/components/landing/home/SupportSection";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "Welcome to your AI companion of pregnancy & motherhood.",
};

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatSection/>
      </Suspense>
      <SupportSection/>
      <LearnAndGrow/> 
    </main>
  );
}
