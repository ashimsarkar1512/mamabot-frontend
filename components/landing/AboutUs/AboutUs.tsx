"use client";

import Image from "next/image"; // if using Next.js — otherwise use regular <img>
import { beauRivage, comfortaa } from "@/app/fonts";

const AboutUs = () => {
  return (
    <section className="w-full bg-[#E9F5FA]/80 border-2 rounded-lg !border-white px-7 md:px-14 py-6 md:py-12">
      <div className="mx-auto ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left - Text Content */}
          <div className=" text-center lg:text-left">
            <div className="inline-block mb-6">
              <span
                className={`${beauRivage.className} text-2xl md:text-[26px] text-primary tracking-wide`}
              >
                About Us —
              </span>
            </div>

            <h2
              className={`text-2xl md:text-[40px] font-bold leading-tight mb-6 md:mb-8 ${comfortaa.className}`}
            >
              Your <span className="text-[#229ECF]">Compassionate</span> Digital
              Companion
              <br />
              for Every Stage of{" "}
              <span className="text-primary">Motherhood</span>
            </h2>

            <p className="text-base md:text-lg text-[#677381] leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0">
              Mamabot is more than an app — it's an AI-powered support system
              built to guide, comfort, and empower women through pregnancy and
              early motherhood. With medically reviewed insights and a community
              that truly listens, Mamabot helps every mother feel seen,
              supported, and confident.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Read More →
              </a>

              {/* Optional second button if you want to keep both */}
              {/* <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-pink-600 border-2 border-pink-600 hover:bg-pink-50 rounded-full transition-colors duration-300"
              >
                About More →
              </a> */}
            </div>
          </div>

          {/* Right - Images */}
          <div className=" relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main large image */}
              <div className="relative max-w-[420px] md:max-w-[524px]  z-10 rounded-2xl overflow-hidden shadow-2xl ">
                <Image
                  src="/images/About-us/aboutUs1.png"
                  alt="Mother holding newborn baby"
                  width={500}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating small circular image */}
              <div className="absolute -bottom-8 -left-4 md:-left-12 lg:-left-16 z-20">
                <div className="relative w-32 h-32  md:w-44 md:h-44 lg:w-48 lg:h-48  overflow-hidden shadow-xl">
                  <Image
                    src="/images/About-us/aboutUs2.png"
                    alt="Confident doctor / mother support figure"
                    width={180}
                    height={180}
                    className=" h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Optional subtle background decoration */}
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-3xl -rotate-2 scale-105 blur-sm hidden lg:block" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
