"use client";

import BlogContent from "@/components/landing/Blog/BlogContent";
import BlogCover from "@/components/landing/Blog/BlogCover";
import { Footer } from "@/components/layout/Footer";

const Page = () => {
  return (
    <div className="pt-12 space-y-7 md:space-y-24">
      
      <BlogCover />
      <BlogContent/>
      {/* <Footer/> */}
    </div>
  );
};

export default Page;
