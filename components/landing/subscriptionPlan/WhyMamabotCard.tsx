"use client";

import Image from "next/image";

type Props = {
  image: string;
  title: string;
  description: string;
};

const WhyMamabotCard = ({ image, title, description }: Props) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 md:p-10  text-center">
      <div className="flex justify-center w-10 md:w-20 h-10 md:h-20">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>

      <h3 className="text-lg md:text-2xl font-semibold  ">{title}</h3>

      <p className="text-base md:text-lg text-[#677381] leading-relaxed">{description}</p>
    </div>
  );
};

export default WhyMamabotCard;
