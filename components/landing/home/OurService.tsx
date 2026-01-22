"use client";

import { services } from "@/lib/data/servicedata";
import Image from "next/image";
import React from "react";

const OurService = () => {
  return (
    <div className="bg-[#F6F8FB] my-7 rounded-xl shadow-md md:my-24 border border-white px-16 md:px-40 py-10 md:py-24">
      <div className="mb-8 md:mb-16 text-center">
        <h2 className="text-2xl mb-4 md:text-[40px]">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-lg">Your Partner in Parenthood</p>
      </div>

      {/* Services */}
      <div className="">
        {services.map((service, index) => {
          const isImageLeft = service.imagePosition === "left";

          const gradientClass =
            index === 1
              ? "bg-gradient-to-r from-[#F9FAFB00] to-[#F3E8FF]" // middle card (reverse)
              : "bg-gradient-to-r from-[#F3E8FF] to-[#F9FAFB00]"; // 1st & 3rd

          return (
            <div
              key={service.id}
              className={`p-6 md:p-12 rounded-full ${gradientClass}`}
            >
              <div
                className={`flex flex-col md:flex-row items-center gap-7 md:gap-12 ${
                  !isImageLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-28 h-28 md:w-56 md:h-56 shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={224}
                    height={224}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 md:gap-6 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="text-base text-[#677381] leading-relaxed">
                    {service.description}
                  </p>

                  <a
                    href={service.learnMoreLink}
                    className="inline-block px-6 py-3 text-primary text-lg font-medium hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurService;
