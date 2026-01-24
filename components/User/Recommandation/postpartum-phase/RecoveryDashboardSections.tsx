"use client";

import Button from "@/components/ui/Button";
import {
  HeartPulse,
  Sparkles,
  Apple,
  Baby,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function RecoveryDashboardSections() {
  return (
    <div className="space-y-8 mb-8">
      {/*   RECOVERY & HEALING   */}
      <div>
        <h2 className="text-sm md:text-xl xl:text-2xl text-[#229ECF] pb-3 border-b border-[#229ECF]/40! mb-6">
          Recovery & Healing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pain Score Card */}
          <div className="flex justify-between items-center gap-4 p-8 rounded-xl border-2 border-white! bg-white/30 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4 e!">
              <div className="w-10 h-10 rounded-lg    bg-pink-100 flex items-center justify-center">
                <HeartPulse className="text-pink-500 w-5 h-5" />
              </div>

              <div className="flex-1">
                <p className="text-sm md:text-lg mb-1 font-regular">
                  Pain Score Check-in
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Track how you&apos;re feeling with personalized daily check-in
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white/60 w-fit border-2 border-white!  px-3 py-2.5 rounded-lg hover:bg-white hover:text-[#229ECF] transition"
            >
              <ChevronRight className="text-[#229ECF]" />
            </Button>
          </div>

          {/* Perineal Care Card */}
          <div className="flex justify-between items-center gap-4 p-8 rounded-xl border-2 border-white! bg-white/30 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4 ">
              <div className="w-10 h-10 rounded-lg    bg-purple-100 flex items-center justify-center">
                <Sparkles className="text-purple-500 w-5 h-5" />
              </div>

              <div className="flex-1">
                <p className="text-sm md:text-lg mb-1 font-regular">
                  Perineal Care
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Learn how to care during sensitive recovery stages
                </p>
              </div>
            </div>
            {/* arrow button to go another page  */}
            <Button
              variant="outline"
              className="bg-white/60 w-fit border-2 border-white!  px-3 py-2.5 rounded-lg hover:bg-white hover:text-[#229ECF] transition"
            >
              <ChevronRight className="text-[#229ECF]" />
            </Button>
          </div>
        </div>
      </div>

      {/*   ESSENTIAL CARE   */}
      <div>
        <h2 className="text-sm md:text-xl xl:text-2xl text-[#229ECF] pb-3 border-b border-[#229ECF]/40! mb-6">
          Essential Care
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mental Health */}
          <div className="py-25 rounded-xl border-2 border-white! bg-white/30 shadow-sm hover:shadow-md text-center space-y-4 ">
            <div className="w-12 h-12 md:w-22 md:h-22 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
              <HeartPulse className="text-[#229ECF]" />
            </div>

            <div>
              <p className="font-semibold text-lg">Mental Health</p>
              <p className="text-xs md:text-sm text-gray-500">
                Track your mood daily
              </p>
            </div>

            <button className="w-2/3 text-md bg-[#229ECF] text-white py-2 rounded-lg hover:bg-[#1b8ab6] transition">
              Check Mood
            </button>
          </div>

          {/* Nutrition */}
          <div className="py-25 rounded-xl border-2 border-white! bg-white/30 shadow-sm hover:shadow-md text-center space-y-4 ">
            <div className="w-12 h-12 md:w-22 md:h-22 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <Apple className="text-green-600" />
            </div>

            <div>
              <p className="font-semibold text-sm md:text-lg">Nutrition</p>
              <p className="text-xs md:text-sm text-gray-500">
                5 tips for breastfeeding
              </p>
            </div>

            <button className="w-2/3 text-md bg-[#229ECF] text-white py-2 rounded-lg hover:bg-[#1b8ab6] transition">
              See Nutrition Guide
            </button>
          </div>

          {/* Baby Care */}
          <div className="py-25 rounded-xl border-2 border-white! bg-white/30 shadow-sm hover:shadow-md text-center space-y-4 ">
            <div className="w-12 h-12 md:w-22 md:h-22 rounded-full bg-orange-100 mx-auto flex items-center justify-center">
              <Baby className="text-orange-500" />
            </div>

            <div>
              <p className="font-semibold text-sm md:text-lg">Baby Care</p>
              <p className="text-xs md:text-sm text-gray-500">
                Open baby care tips
              </p>
            </div>

            <button className="w-2/3 text-md bg-[#229ECF] text-white py-2 rounded-lg hover:bg-[#1b8ab6] transition">
              Open Baby Care
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
