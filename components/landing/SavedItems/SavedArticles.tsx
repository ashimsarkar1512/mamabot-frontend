"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { items, tabs } from "@/lib/data/savedData";

type Props = {
  activeTab: string;
};

export default function SavedArticles({ activeTab }: Props) {
  const filteredItems =
    activeTab === "All(24)"
      ? items
      : items.filter((item) => item.type === activeTab);

  return (
    <section className="w-full rounded-3xl  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-[32px] font-semibold text-[#229ECF]">
          Saved Articles
        </h2>
        <button className="text-sm cursor-pointer  text-[#229ECF] hover:underline">
          See More
        </button>
      </div>
      <div className="mb-5 md:mb-10 h-[2px] w-full mx-auto bg-[#BAE1F0] " />

      {/* Cards */}
      <div className=""></div>
    </section>
  );
}
