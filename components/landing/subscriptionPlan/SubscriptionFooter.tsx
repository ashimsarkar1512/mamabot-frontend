"use client";

import Image from "next/image";
import { beauRivage, comfortaa } from "@/app/fonts";


const SubscriptionFooter = () => {
  return (
    <section className="w-full py-3 md:py-6 ">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images */}
          <div className="">
            <div className="">
              <Image
                src="/images/HappySmiling.png"
                alt="Mother with Baby"
                width={600}
                height={400}
                className="border-2 rounded-lg !border-white w-full h-full shadow-lg"
              />
            </div>
          </div>
          {/* Text Content */}
          <div className=" bg-[#ffffff]/25 border-2 rounded-lg !border-white shadow-md text-center p-3 md:p-6 lg:text-left">
            <div className="inline-block mb-6">
              <span
                className={`${beauRivage.className} text-2xl md:text-[26px] text-primary tracking-wide`}
              >
                Premium Experience
              </span>
            </div>

            <h2
              className={`text-2xl md:text-[40px] font-bold leading-tight mb-6 md:mb-8 ${comfortaa.className}`}
            >
              Your journey deserves more than generic advice.
            </h2>

            <p className="text-base md:text-lg text-[#677381] leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0">
              Mamabot Premium adapts to your changing body, emotions, and
              lifestyle — so you can focus on what truly matters: your
              well-being and your baby.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              <button className="inline-flex cursor-pointer items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-[#229ECF] hover:opacity-80 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg">
                🌸 Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionFooter;
