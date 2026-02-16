"use client";

import { comfortaa } from "@/app/fonts";
import ContactBanner from "@/components/landing/Contact/ContactBanner";
import SendMessage from "@/components/landing/Contact/SendMessage";
import SupportCards from "@/components/landing/Contact/SupportCards";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ContactContent = () => {
   const searchParams = useSearchParams();
    const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [section]);
  return (
    <div className={`pt-12 ${comfortaa.className} space-y-7 md:space-y-24`}>
      <ContactBanner />
      <SendMessage />
      <SupportCards />
      {/* <Footer /> */}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
};

export default Page;
