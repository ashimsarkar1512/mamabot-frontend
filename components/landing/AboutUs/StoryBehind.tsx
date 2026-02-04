"use client";

import { comfortaa } from "@/app/fonts";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useGetOurJourneyQuery } from "@/redux/features/api/user/OurJourney/OurJourney";
import { BookOpenIcon } from "lucide-react";
import Image from "next/image";

const StoryBehind = () => {
  const { data, isLoading, isError } = useGetOurJourneyQuery();

  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <p>Loading journey...</p>
      </section>
    );
  }

  if (isError || !data?.success || data.data.length === 0) {
    return (
      <section className="py-16 text-center">
        <p>Failed to load journey data</p>
      </section>
    );
  }

  const journey = data.data[0];

  return (
    <section
      className={`w-full relative ${comfortaa.className} overflow-hidden`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block mb-3 rounded-full bg-[#F9DEEB] px-2 py-1 text-xs font-medium text-primary">
              Our Journey
            </span>

            <h2 className="text-2xl md:text-[32px] font-semibold text-gray-800 mb-6">
              {journey.title}
            </h2>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>{journey.description}</p>
            </div>

            {/* <button className="mt-5 md:mt-10 inline-flex items-center gap-2 rounded-xl bg-[#229ECF] px-6 py-3 text-lg font-medium text-white shadow-md transition hover:opacity-80 cursor-pointer">
              <BookOpenIcon width={24} height={24} /> Read Full Story
            </button> */}
            <div className="mt-5 md:mt-10">
              <CommonButton
                text="Read Full Story"
                iconPosition="left"
                icon={<BookOpenIcon width={24} height={24} />}
                bgColor="bg-[#229ECF]"
              />
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image + Stat 1 */}
            <div className="flex flex-col gap-4 overflow-hidden shadow-md">
              {journey.image_url_1 && (
                <Image
                  src={journey.image_url_1}
                  alt={journey.subtitle_1}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              )}

              <div className="bg-linear-to-br from-[#229ECF] to-[#0086BA] p-6 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">{journey.subtitle_1}</h3>
                <p className="mt-1 text-sm opacity-90">Founded with a vision</p>
              </div>
            </div>

            {/* Stat + Image 2 */}
            <div className="flex flex-col gap-4 overflow-hidden shadow-md">
              <div className="bg-linear-to-br from-[#FF57A6] to-[#D82479] p-6 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">{journey.count}+</h3>
                <p className="mt-1 text-sm opacity-90">{journey.subtitle_2}</p>
              </div>

              {journey.image_url_2 && (
                <Image
                  src={journey.image_url_2}
                  alt={journey.subtitle_2}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryBehind;
