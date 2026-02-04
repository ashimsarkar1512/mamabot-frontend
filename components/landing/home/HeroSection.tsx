"use client";

import CommonButton from "@/components/ui/Reusable/CommonButton";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
export default function HeroSection() {
  const router = useRouter();

  const handleAskMamabot = () => {
    const token = Cookies.get("token");

    if (token) {
      // logged in
      router.push("/chatBot");
    } else {
      // not logged in
      router.push("/login");
    }
  };

  return (
    <main className=" mt-32 mb-20">
      {/* Content Container */}
      <div className="mb-6 flex justify-center  ">
        <p className=" text-xs font-medium text-pink-600 tracking-wide border px-2 py-1 rounded-full flex items-center gap-3 bg-[#FCE7F3]">
          <span>
            {" "}
            <Heart size={16} />{" "}
          </span>{" "}
          Trusted by 10,000+ mothers
        </p>
      </div>
      <div className="relative flex items-center justify-center  px-4 md:px-8 lg:px-16">
        {/* Left Decoration Image */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block
                 w-[90px] xl:w-[150px] 2xl:w-[180px]"
        >
          <Image
            src="/images/home/right.png"
            alt="Pregnancy illustration"
            width={150}
            height={150}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center w-full lg:max-w-4xl text-center z-10 py-12 md:py-0 space-y-6">
          {/* Main Heading */}
          <h1
            className="
      font-['Comfortaa']
      text-[#303030]
      text-[32px] md:text-[48px]
      font-bold
      leading-[120%]
      mb-10
    "
          >
            Your AI companion of
            <br />
            Pregnancy & <span className="text-pink-600">Motherhood</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-5xl mb-6 leading-relaxed">
            Mamabot combines medical expertise, personalized product
            recommendations, <br />
            and a supportive community to guide you through every step of your
            journey.
          </p>
        </div>

        {/* Right Decoration Image */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block
                  w-[90px] xl:w-[150px] 2xl:w-[180px]"
        >
          <Image
            src="/images/home/left.png"
            alt="Motherhood illustration"
            width={150}
            height={150}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <CommonButton
          onClick={handleAskMamabot}
          className="text-white font-semibold py-3 px-10 rounded-full "
          text=" Ask Mamabot"
        />
      </div>
    </main>
  );
}
