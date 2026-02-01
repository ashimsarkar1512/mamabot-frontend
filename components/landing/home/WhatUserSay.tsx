"use client";

import { useGetRandomTestimonialsQuery } from "@/redux/features/api/user/testimonials";
import Image from "next/image";

const WhatUserSay = () => {
  const { data, isLoading, isError } = useGetRandomTestimonialsQuery();

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-12">
        <p className="text-center text-gray-500">Loading testimonials...</p>
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="rounded-xl bg-white p-12">
        <p className="text-center text-red-500">Failed to load testimonials</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white p-12">
      <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-12">
        What <span className="text-primary">Users</span> Says
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.data.map((testimonial) => (
          <div
            key={testimonial.id}
            className=" rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#D9E5E9] mb-4 md:mb-6 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author_name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              <p className="text-gray-700 text-sm md:text-base mb-5 md:mb-6 leading-relaxed italic">
                "{testimonial.description}"
              </p>

              <div>
                <p className="font-semibold text-gray-900 text-base md:text-lg">
                  {testimonial.author_name}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {testimonial.author_title} · {testimonial.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatUserSay;
