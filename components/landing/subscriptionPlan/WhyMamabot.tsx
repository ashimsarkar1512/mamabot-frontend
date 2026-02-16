"use client";

import { whyMamabotData } from "@/lib/data/whyMamabotData";
import WhyMamabotCard from "./WhyMamabotCard";

const WhyMamabot = () => {
  return (
    <section className="w-full py-3 md:py-6 ">
      <div className="mx-auto ">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl md:text-[32px] font-semibold ">
            Why Mothers Choose <span className="text-primary">Mamabot</span>
            <span className="text-[#229ECF]"> Premium</span>
          </h2>
        </div>
        <p className="text-base md:text-lg text-[#4A5565] py-3">
          Unlock a complete support system designed for your unique journey
        </p>
        <div className="mb-6 h-[2px] w-full mx-auto bg-[#BAE1F0] " />
      </div>

      {/* why mamabot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards */}

        {whyMamabotData.map((item) => (
          <WhyMamabotCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyMamabot;
