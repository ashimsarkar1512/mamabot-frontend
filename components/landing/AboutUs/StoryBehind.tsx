"use client";

import { comfortaa } from "@/app/fonts";
import { BookOpen, BookOpenIcon } from "lucide-react";
import Image from "next/image";

const StoryBehind = () => {
  return (
    <section
      className={`w-full relative ${comfortaa.className} overflow-hidden `}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block mb-3 rounded-full bg-[#F9DEEB] px-2 py-1 text-xs font-medium text-primary">
              Our Journey
            </span>

            <h2 className="text-2xl md:text-[32px] font-semibold text-gray-800 mb-6">
              The Story Behind <span className="text-primary">Mamabot!</span>
            </h2>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed ">
              <p>
                Mamabot was born from a belief that no mother should ever feel
                alone or overwhelmed.
              </p>
              <p>
                Our founders saw how scattered information, fear, and isolation
                often cloud what should be a joyful experience. They envisioned
                a single space where technology could meet empathy.
              </p>
              <p>
                What began as a small prototype has evolved into a holistic
                motherhood platform used by expecting and new mothers worldwide.
              </p>
            </div>

            <button className="mt-5 md:mt-10 inline-flex items-center gap-2 rounded-xl bg-[#229ECF] px-6 py-3 text-lg font-medium text-white shadow-md transition hover:opacity-80 cursor-pointer">
              <BookOpenIcon width={24} height={24} /> Read Full Story
            </button>
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image 1 */}
            <div className="flex flex-col gap-4  overflow-hidden shadow-md">
              <div className="w-97.75">
                <Image
                  src="/images/About-us/story1.png"
                  alt="Mother and baby"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Blue Stat Card */}
              <div className=" bg-linear-to-br from-[#229ECF] to-[#0086BA] p-6 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">2020</h3>
                <p className="mt-1 text-sm opacity-90">Founded with a vision</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="flex flex-col gap-4 overflow-hidden shadow-md">
              {/* Pink Stat Card */}
              <div className="  bg-linear-to-br from-[#FF57A6] to-[#D82479] p-6 text-white  flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">50+</h3>
                <p className="mt-1 text-sm opacity-90">Countries Reached</p>
              </div>
              <div className="w-97.75">
                <Image
                  src="/images/About-us/story2.png"
                  alt="Mother caring child"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryBehind;
