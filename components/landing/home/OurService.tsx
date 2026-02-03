"use client";

import { useGetLandingServicesQuery } from "@/redux/features/api/GuestLanding/ServiceLanding";
import Image from "next/image";
import React, { useState } from "react";

const OurService = () => {
  const { data, isLoading, isError } = useGetLandingServicesQuery();
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  if (isError || !data?.data?.length) {
    return <p className="text-center py-20">Failed to load services</p>;
  }

  // only active services
  const services = data.data.filter((service) => service.is_active === 1);

  const visibleServices = showAll ? services : services.slice(0, 3);
  return (
    <div className="bg-[#F6F8FB] my-7 rounded-xl shadow-md md:my-24 border border-white px-4 md:px-40 py-10 md:py-24">
      <div className="mb-8 md:mb-16 md:text-center">
        <h2 className="text-xl mb-4 md:text-[40px]">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-base md:text-lg">Your Partner in Parenthood</p>
      </div>

      {/* Services */}
      <div className="">
        {visibleServices.map((service, index) => {
          const isImageLeft = index % 2 === 0;
          const isMiddle = index === 1;
          const gradientClass = isMiddle
            ? "bg-gradient-to-r from-[#F9FAFB00] to-[#F3E8FF]"
            : "bg-gradient-to-r from-[#F3E8FF] to-[#F9FAFB00]";

          return (
            <div
              key={service.id}
              className={`p-4 md:p-12 rounded-full ${gradientClass}`}
            >
              <div
                className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-12 ${
                  !isImageLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-52 h-52 md:w-56 md:h-56 shrink-0">
                  <Image
                    src={service.main_img || "/images/placeholder.png"}
                    alt={service.title}
                    width={224}
                    height={224}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col gap-3 md:gap-6 ${
                    isMiddle
                      ? "text-right md:items-end"
                      : "text-left md:items-start"
                  }`}
                >
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-base text-[#677381] leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* See More Button */}
      {services.length > 3 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-lg bg-primary text-white text-lg font-medium hover:opacity-90 transition"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OurService;
