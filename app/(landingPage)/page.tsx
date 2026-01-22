import ChatSection from "@/components/landing/home/ChatSection";
import HeroSection from "@/components/landing/home/HeroSection";
import LearnAndGrow from "@/components/landing/home/LearnAndGrowSection";
import PricingSection from "@/components/landing/home/PricingSection";




import SupportSection from "@/components/landing/home/SupportSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "Welcome to your AI companion of pregnancy & motherhood.",
};

export default function Home() {
  return (
    <main>
      <HeroSection/>
       <ChatSection/>
      <SupportSection/>
     <LearnAndGrow/> 
     <PricingSection/>
   
    </main>
  );
}
