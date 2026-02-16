<<<<<<< HEAD

import React from 'react';
import { Heart, MessageSquare, ShoppingBag, Users } from 'lucide-react';
=======
"use client";

import React from "react";
import { Heart, MessageSquare, ShoppingBag, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
>>>>>>> 1c4b9d59abbf6c94bf94b2196258aae1dae4c71e

const SupportSection: React.FC = () => {
  const router = useRouter();

  const handleClick = (route: string) => {
    const token = Cookies.get("token"); // check login

    if (token) {
      // logged in → go directly
      router.push(route);
    } else {
      // not logged in → go to login page first with redirect
      router.push(`/login?redirectTo=${route}`);
    }
  };
  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: "Ask Mamabot",
      route: "/chatBot",
      description:
        "Get instant, medically informed answers to your daily pregnancy questions.",
      position: "left",
      // Specific colors from screenshot
      color: "bg-sky-500",
    },
    {
      id: 2,
      icon: ShoppingBag,
      title: "Shop Smart",
      route: "/user-dashboard/recommandation?scrollTo=food",
      description:
        "Find personalised product recommendations suited to your baby's stage.",
      position: "right",
      color: "bg-cyan-700",
    },
    {
      id: 3,
      icon: Users,
      title: "Join the Community",

      route: "/user-dashboard/community",
      description:
        "Connect with real parents and experts across Germany, Austria, and Switzerland.",
      position: "left",
      color: "bg-cyan-900",
    },
  ];

  return (
    <section className="py-8 md:py-20 px-4 bg-white/25 rounded-2xl border-2 !border-white  my-10">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-1 bg-[#FCE7F3] border border-pink-100 px-3 py-1 rounded-full mb-6">
          <span className="text-pink-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 ">
            {" "}
            <span>
              <Heart size={16} />
            </span>
            Supports
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          How <span className="text-pink-500">Mamabot</span> Supports You
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Three powerful ways to navigate your pregnancy journey with confidence
        </p>
      </div>

      {/* Features Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical Connecting Line */}
        <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.75 bg-white transform -translate-x-1/2" />

        <div className="space-y-12 md:space-y-0">
          {features.map((feature) => {
            const isRight = feature.position === "right";

            return (
              <motion.div
                key={feature.id}
                initial={{
                  opacity: 0,
                  x: isRight ? 80 : -80,
                  y: 0,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center
        ${isRight ? "md:flex-row-reverse" : ""}
        gap-4 md:gap-0
        mb-12 md:mb-16
      `}
              >
                {/* Mobile Number (top centered) */}
                <div
                  className={`md:hidden flex w-10 h-10 rounded-full ${feature.color}
        items-center justify-center text-white font-bold`}
                >
                  {feature.id}
                </div>

                {/* Feature Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="w-full md:w-[45%] cursor-pointer"
                  onClick={() => handleClick(feature.route)}
                >
                  <div
                    className="bg-white rounded-2xl p-6 sm:p-7 md:p-8
          border border-gray-50 transition-all hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50/50 flex items-center justify-center">
                        <feature.icon
                          className="w-6 h-6 text-[#3FB1D3]"
                          strokeWidth={1.5}
                        />
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Desktop Number (center line aligned) */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2
        w-11 h-11 rounded-full ${feature.color}
        items-center justify-center z-10 shadow-md`}
                >
                  <span className="text-white font-bold text-lg">
                    {feature.id}
                  </span>
                </div>

                {/* Spacer for desktop symmetry */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
