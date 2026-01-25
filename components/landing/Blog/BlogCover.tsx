"use client";

import { beauRivage, comfortaa } from "@/app/fonts";
import { BookOpenIcon } from "lucide-react";
import Image from "next/image";

const BlogCover = () => {
  return (
    <section
      className={`relative ${comfortaa.className} w-full py-5 md:py-10 overflow-hidden `}
    >
      <div className="mb-10">
        <span className={`text-2xl md:text-[26px] ${beauRivage.className} font-medium text-[#229ECF] underline`}>
          Blog
        </span>

        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-800">
          Your Trusted Source for{" "}
          <span className="text-primary">Pregnancy</span> &{" "}
          <span className="text-[#229ECF]">Motherhood</span>
        </h1>

        <p className="mt-4 text-lg text-[#677381] ">
          Expert-verified articles, real mom experiences, and practical guidance
          for every stage of your journey
        </p>
      </div>
      <div className="">
        {/* Header */}

        {/* Cover Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl bg-white/25 border-2 !border-white overflow-hidden">
          {/* Left Image */}
          <div className="relative h-50 md:h-190 lg:h-auto">
            <Image
              src="/images/blog/blog-banner.png"
              alt="Pregnancy blog cover"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Content */}
          <div className=" py-5 md:py-10 px-7 md:px-14 flex flex-col justify-between">
            {/* Top label */}

            <div>
              <span className="text-lg mt-5 md:mt-10 mb-2 font-medium text-[#030213]">
                Pregnancy
              </span>

              <h2 className="mt-2 mb-4 md:mb-8 text-xl md:text-[32px] font-semibold text-[#101828] leading-snug">
                The Complete Guide to Second Trimester: What to Expect
              </h2>

              <p className="mt-4 text-lg text-[#4A5565] leading-relaxed">
                The second trimester is often called the &apos;golden
                period&apos; of pregnancy. Your energy returns, morning sickness
                fades, and you start to feel your baby move. Learn everything
                you need to know about weeks 13–27.
              </p>
            </div>

            {/* Author + CTA */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                  <Image
                    src="/images/blog/doctor.png"
                    alt="Author"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div className="text-lg">
                  <p className="font-medium text-[#101828]">Dr. Maria Schmidt</p>
                  <p className="text-[#677381]">Medical Expert · 11 Jan 2022</p>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 rounded-xl bg-[#229ECF] px-5 py-2 md:px-10 md:py-4 text-sm md:text-lg font-medium text-white shadow-md transition hover:opacity-80 cursor-pointer">
                <BookOpenIcon /> Read Full Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCover;
