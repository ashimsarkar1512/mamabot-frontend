"use client";

import AboutUs from "@/components/landing/AboutUs/AboutUs";
import OurMission from "@/components/landing/AboutUs/OurMission";
import StoryBehind from "@/components/landing/AboutUs/StoryBehind";
import MeetOurTeam from "@/components/landing/home/MeetOurTeam";
import SupportSection from "@/components/landing/home/SupportSection";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

const Page = () => {
  return (
    <div className="pt-12 space-y-7 md:space-y-24">
      
      <AboutUs />
      <OurMission />
      <StoryBehind />
      <SupportSection />
      <MeetOurTeam />
      {/* <Footer/> */}
    </div>
  );
};

export default Page;
