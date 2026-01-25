"use client";

import { useState } from "react";
import { comfortaa } from "@/app/fonts";
import SavedRecommendation from "@/components/landing/SavedItems/SavedRecommendation";
import { items, tabs } from "@/lib/data/savedData";
import { BookmarkIcon } from "lucide-react";
import CommunityPosts from "@/components/landing/SavedItems/CommunityPosts";
import SavedArticles from "@/components/landing/SavedItems/SavedArticles";

const Page = () => {
  const [activeTab, setActiveTab] = useState("All(24)");
  const filteredItems =
    activeTab === "All(24)"
      ? items
      : items.filter((item) => item.type === activeTab);

  return (
    <div className={`pt-12 ${comfortaa.className} space-y-7 md:space-y-24`}>
      <div className="flex items-center mb-5 md:mb-10 gap-3 md:gap-6">
        <div className="w-14 h-14 bg-[#229ECF] text-white rounded-full flex items-center justify-center">
          <BookmarkIcon size={24} />
        </div>
        <div>
          <h1 className="text-3xl mb-1">Saved Items</h1>
          <p className="text-lg text-[#4A5565]">
            You have {filteredItems.length} saved items
          </p>
        </div>
      </div>
      {/* Tabs */}
      <div className="">
        <div className="mb-8 md:mb-16 grid grid-cols-4 overflow-hidden border-2 !border-white bg-white/25">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm cursor-pointer border-r-2 !border-r-white font-medium transition
                ${
                  activeTab === tab
                    ? "bg-pink-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      {(activeTab === "All(24)" || activeTab === "Products") && (
        <SavedRecommendation activeTab={activeTab} />
      )}

      {(activeTab === "All(24)" || activeTab === "Community Posts") && (
        <CommunityPosts activeTab={activeTab} />
      )}

      {(activeTab === "All(24)" || activeTab === "Articles") && (
        <SavedArticles activeTab={activeTab} />
      )}
    </div>
  );
};

export default Page;
