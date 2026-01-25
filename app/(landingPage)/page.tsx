import ChatSection from "@/components/landing/home/ChatSection";
import GetInTouch from "@/components/landing/home/GetInTouch";
import HeroSection from "@/components/landing/home/HeroSection";
import LearnAndGrow from "@/components/landing/home/LearnAndGrowSection";
import MeetOurTeam from "@/components/landing/home/MeetOurTeam";
import Newsletter from "@/components/landing/home/Newsletter";
import OurService from "@/components/landing/home/OurService";
import PricingPricing from "@/components/landing/home/PricingSection";

import SupportSection from "@/components/landing/home/SupportSection";
import YoureNotAlone from "@/components/landing/home/YoureNotAlone";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "Welcome to your AI companion of pregnancy & motherhood.",
};

export default function Home() {
  return (
    <main>
      <section id="home" className="scroll-mt-28">
        <HeroSection />
      </section>

      <section id="about" className="scroll-mt-28">
        <ChatSection />
      </section>

      <SupportSection />

      <section id="blog" className="scroll-mt-28">
        <LearnAndGrow />
      </section>

      <section id="service" className="scroll-mt-28">
        <OurService />
      </section>

      <section id="community" className="scroll-mt-28">
        <YoureNotAlone />
      </section>

      <section id="pricing" className="scroll-mt-28">
        <PricingPricing />
      </section>

      <MeetOurTeam />

      <section id="newsletter" className="scroll-mt-28">
        <GetInTouch />
      </section>

      <Newsletter />
    </main>
  );
}
