"use client";

import Image from "next/image";
import { beauRivage, comfortaa } from "@/app/fonts";
import { useGetAboutUsQuery } from "@/redux/features/api/user/aboutUs/AboutUs";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  const { data, isLoading, isError } = useGetAboutUsQuery();

  if (isLoading) {
    return (
      <section className="w-full py-12 text-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (isError || !data?.success) {
    return (
      <section className="w-full py-12 text-center">
        <p>Failed to load About Us data</p>
      </section>
    );
  }

// check if data present or not

  if (isError || !data?.success || !data?.data) {
    return (
      <section className="w-full py-12 text-center">
        <p>Failed to load About Us data</p>
      </section>
    );
  }

  const { title, subtitle, content, main_img, inset_img } = data.data;

  return (
    <section className="w-full bg-[#E9F5FA]/80 border-2 rounded-xl !border-white px-7 md:px-14 py-6 md:py-12">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6">
              <span
                className={`${beauRivage.className} text-2xl md:text-[26px] text-primary tracking-wide`}
              >
                {title} —
              </span>
            </div>

            <h2
              className={`text-2xl md:text-[40px] font-bold leading-tight mb-6 md:mb-8 ${comfortaa.className}`}
            >
              {subtitle}
            </h2>

            <p className="text-base md:text-lg text-[#677381] leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0">
              {content}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              {/* <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Read More →
              </a> */}
              {/* <CommonButton text="Read More" icon={<ArrowRight size={20} />} /> */}
            </div>
          </div>

          {/* Right - Images */}
          <div className="relative flex justify-center pb-5 lg:justify-end">
            <div className="relative">
              {/* Main Image */}
              {main_img && (
                <div className="relative max-w-105 md:max-w-163 z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={main_img}
                    alt={title}
                    width={650}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Inset Image */}
              {inset_img && (
                <div className="absolute -bottom-8 -left-4 md:-left-12 lg:-left-16 z-20">
                  <div className="relative w-24 h-24 md:w-44 md:h-44 lg:w-48 lg:h-48 overflow-hidden shadow-xl">
                    <Image
                      src={inset_img}
                      alt="About Mamabot"
                      width={180}
                      height={180}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
