"use client";

import { comfortaa } from "@/app/fonts";
import ContactBanner from "@/components/landing/Contact/ContactBanner";
import SendMessage from "@/components/landing/Contact/SendMessage";
import SupportCards from "@/components/landing/Contact/SupportCards";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

const Page = () => {
  return (
    <div className={`pt-12 ${comfortaa.className} space-y-7 md:space-y-24`}>
      <ContactBanner />
      <SendMessage />
      <SupportCards />
      <Footer />
    </div>
  );
};

export default Page;
