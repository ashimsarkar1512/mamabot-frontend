import ChatSection from "@/components/landing/home/ChatSection";
import GetInTouch from "@/components/landing/home/GetInTouch";
import HeroSection from "@/components/landing/home/HeroSection";
import LearnAndGrow from "@/components/landing/home/LearnAndGrowSection";
<<<<<<< HEAD
import PricingSection from "@/components/landing/home/PricingSection";



=======
import Newsletter from "@/components/landing/home/Newsletter";
>>>>>>> 3ed41a291d245c5bf526fcb4c1cd6438a61ddf8b

import SupportSection from "@/components/landing/home/SupportSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "Welcome to your AI companion of pregnancy & motherhood.",
};

export default function Home() {
  return (
    <main>
<<<<<<< HEAD
      <HeroSection/>
       <ChatSection/>
      <SupportSection/>
     <LearnAndGrow/> 
     <PricingSection/>
   
=======
      <HeroSection />
      <ChatSection />
      <SupportSection />
      <LearnAndGrow />
      <GetInTouch/>
      <Newsletter />
>>>>>>> 3ed41a291d245c5bf526fcb4c1cd6438a61ddf8b
    </main>
  );
}
