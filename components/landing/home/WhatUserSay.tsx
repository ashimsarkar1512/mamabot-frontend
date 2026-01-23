"use client";

import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria S.",
    location: "Munich, Germany",
    message:
      "Mamabot gave me confidence when I needed it most. The community is incredibly supportive!",
    image: "/images/user1.png",
  },
  {
    id: 2,
    name: "Julia R.",
    location: "Vienna, Austria",
    message:
      "Finally, a place where I can ask questions without judgment. The expert advice is invaluable.",
    image: "/images/user2.png",
  },
  {
    id: 3,
    name: "Sophie B.",
    location: "Zurich, Switzerland",
    message:
      "I love how active the community is. Real moms sharing real experiences - that's what I needed.",
    image: "/images/user3.png",
  },
];

const WhatUserSay = () => {
  return (
    <div className="rounded-xl bg-white p-12">
      <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-12">
        What <span className="text-primary">Users</span> Says
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className=" rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#D9E5E9] mb-4 md:mb-6 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
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
                "{testimonial.message}"
              </p>

              <div>
                <p className="font-semibold text-gray-900 text-base md:text-lg">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {testimonial.location}
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
