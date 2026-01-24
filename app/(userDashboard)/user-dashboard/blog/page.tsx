"use client";

import BlogContent from "@/components/landing/Blog/BlogContent";
import BlogCover from "@/components/landing/Blog/BlogCover";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

const Page = () => {
  return (
    <div className="pt-12 space-y-7 md:space-y-24">
      {/* <div className="hidden lg:block transition-transform duration-300 hover:-translate-y-2 absolute -right-10 top-200 cursor-pointer hover:opacity-80 -translate-y-1/2 pr-10">
        <Image
          src="/images/mamabot.png"
          alt="MamaBot"
          width={80}
          height={80}
          className="drop-shadow-xl"
        />
      </div> */}
      <BlogCover />
      <BlogContent/>
      <Footer/>
    </div>
  );
};

export default Page;
