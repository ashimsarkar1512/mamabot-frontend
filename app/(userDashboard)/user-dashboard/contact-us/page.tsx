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
      {/* <div className="hidden lg:block transition-transform duration-300 hover:-translate-y-2 absolute right-0 top-210 cursor-pointer hover:opacity-80 -translate-y-1/2 pr-10">
        <Image
          src="/images/mamabot.png"
          alt="MamaBot"
          width={80}
          height={80}
          className="drop-shadow-xl"
        />
      </div> */}
      <ContactBanner/>
      <SendMessage/>
      <SupportCards/>
      <Footer/>
    </div>
  );
};

export default Page;
