"use client";
import { IProfileResponse } from "@/types/user/profile";
import { motion } from "framer-motion";

interface BannerProps {
 profile?: IProfileResponse;
}

const Banner = ({profile}:BannerProps) => {

  console.log(profile,"banner")
  const deliveryType=profile?.data.delivery_type

  const day=profile?.data.postpartum_day

  return (
    <section className="relative w-full overflow-hidden px-6 py-16 font-sans border-3 border-white! rounded-xl bg-[#F5F5F5]! shadow-sm my-8">
      {/* Gradient & Wave Background */}
      <div className="absolute inset-0 z-0 bg-[#F5F5F5]!" />
      <h2 className="m-2 absolute top-0 left-0 p-2 md:p-0 w-fit h-8 md:w-44 md:h-11 bg-sky-100/30 rounded-tl-xl rounded-tr-xl rounded-br-md rounded-bl-md z-2 flex items-center justify-center text-xs md:text-sm text-gray-600 border border-white/70!">
       {deliveryType}
      </h2>
      <h2 className="m-2 absolute top-0 right-0 p-2 md:p-0 w-fit h-8 md:w-44 md:h-11 bg-sky-100/30 rounded-tl-xl rounded-tr-xl rounded-br-md rounded-bl-md z-2 flex items-center justify-center text-xs md:text-sm text-gray-600 border border-white/70!">
        Postpartum {day} Days
      </h2>
      <video
        className="absolute inset-0 z-1 w-full h-full object-cover opacity-40 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-xl md:text-[40px] font-semibold text-[#4CA7D0] mb-3"
        >
          Personalized Recommendations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-gray-500 text-xs md:text-[16px] max-w-2xl mx-auto"
        >
          Curated just for you based on your pregnancy week, health needs, and
          preferences.
        </motion.p>
      </div>
    </section>
  );
};

export default Banner;
