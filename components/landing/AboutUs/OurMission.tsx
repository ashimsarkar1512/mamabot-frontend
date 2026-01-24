"use client";
import { comfortaa } from "@/app/fonts";
import { Heart, TargetIcon, Users2 } from "lucide-react";


const missions = [
  {
    title: "Empower Every Mother",
    description:
      "To provide personalized, AI-powered guidance that makes every mother feel confident, informed, and supported through every stage of her journey.",
    iconBg: "bg-linear-to-r from-[#FB64B6] to-[#FF2056]",
    iconColor: "text-white",
    icon: <Heart width={32} height={32} />,
  },
  {
    title: "Trust & Safety",
    description:
      "To create safe, supportive spaces where mothers connect, share experiences, and lift each other up because no one should navigate motherhood alone.",
    iconBg: "bg-linear-to-r from-[#51A2FF] to-[#00B8DB]",
    iconColor: "text-white",
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    title: "Build Community",
    description:
      "To deliver only medically verified information while protecting your privacy with GDPR-compliant security earning and keeping your trust every day.",
    iconBg: "bg-linear-to-r from-[#C27AFF] to-[#8E51FF]",
    iconColor: "text-white",
    icon: <Users2 width={32} height={32} />,
  },
];

export default function OurMission() {
  return (
    <section
      className={`relative ${comfortaa.className} overflow-hidden `}
    >
    

      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-3">
            <div className="h-16 w-16 rounded-full  flex items-center justify-center text-primary text-xl">
              <TargetIcon width={64} height={64} />
            </div>
          </div>
          <h2 className="text-2xl md:text-[40px] font-bold py-3 text-[#229ECF]">
            Our Mission
          </h2>
          <div className="mt-4 h-[2px] w-full mx-auto bg-linear-to-r from-transparent via-[#229ECF]/80 to-transparent" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {missions.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/25 backdrop-blur-md border-2 !border-white shadow-md py-6 md:py-12 px-4 md:px-8 transition hover:shadow-xl"
            >
              <div className="flex items-center flex-1 gap-4 mb-4 md:mb-8">
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg mb-4 ${item.iconBg} ${item.iconColor}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl  md:text-3xl font-semibold text-black mb-2">
                  {item.title}
                </h3>
              </div>

              <p className="text-lg leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
