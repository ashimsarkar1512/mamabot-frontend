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
    <main className="">
      {/* Content Container */}
      <div className="relative flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-16">
        {/* Left Decoration Image */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/6">
          <Image
            src="/images/home/right.png"
            alt="Pregnancy illustration"
            width={150} // smaller
            height={225}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center w-full lg:max-w-4xl text-center z-10 py-12 md:py-0 space-y-6">
          {/* Trust Badge */}
          <div className="mb-6 inline-block ">
            <p className=" text-sm font-medium text-pink-600 tracking-wide border px-2 py-1 rounded-full flex items-center gap-3 bg-[#FCE7F3]">
              <span>
                {" "}
                <Heart size={18} />{" "}
              </span>{" "}
              Trusted by 10,000+ mothers
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold not-italic line-[1.2] mb-10">
            Your AI companion of
            <br className="my-12" />
            Pregnancy & <span className="text-pink-600">Motherhood</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-lg max-w-4xl mb-12 leading-relaxed">
            Mamabot combines medical expertise, personalized product
            recommendations, <br />
            and a supportive community to guide you through every step of your
            journey.
          </p>

          {/* CTA Button */}
          {/* <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Ask Mamabot
          </button> */}

          <CommonButton
            onClick={handleAskMamabot}
            className="text-white font-semibold py-3 px-10 rounded-full "
            text=" Ask Mamabot"
          />
        </div>

        {/* Right Decoration Image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/6">
          <Image
            src="/images/home/left.png"
            alt="Motherhood illustration"
            width={150} // smaller
            height={225}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}
