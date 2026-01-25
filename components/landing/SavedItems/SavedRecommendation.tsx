"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { items, tabs } from "@/lib/data/savedData";

type Props = {
  activeTab: string;
};

export default function SavedRecommendation({ activeTab }: Props) {
  const filteredItems =
    activeTab === "All(24)"
      ? items
      : items.filter((item) => item.type === activeTab);

  return (
    <section className="w-full rounded-3xl  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-[32px] font-semibold text-[#229ECF]">
          Saved Recommendations
        </h2>
        <button className="text-sm cursor-pointer text-[#229ECF] hover:underline">
          See More
        </button>
      </div>
      <div className="mb-5 md:mb-10 h-[2px] w-full mx-auto bg-[#BAE1F0] " />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-34 md:h-68 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[#229ECF] text-lg">
                  {item.title}
                </h3>
                <Bookmark className="text-[#229ECF] fill-[#229ECF]" size={18} />
              </div>

              <p className="text-sm text-gray-500 mb-3">{item.desc}</p>

              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                  Eco-friendly
                </span>
                <span className="text-yellow-500">★ {item.rating}</span>
                <span className="text-gray-400">({item.reviews})</span>
              </div>

              {/* New Price & Button Section */}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-semibold text-[#229ECF]">
                  {item.price}
                </span>
                <button className="rounded-lg border-2 cursor-pointer border-[#229ECF] px-4 py-2 text-sm text-[#229ECF] hover:text-white hover:border-white bg-[#DEF0F8] hover:bg-[#229ECF] transition">
                  View In Shop
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
