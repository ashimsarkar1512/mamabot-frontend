"use client";

import { useState } from "react";
import { comfortaa } from "@/app/fonts";

import { items, tabs } from "@/lib/data/savedData";
import { BookmarkIcon, Menu, X } from "lucide-react";

import { useGetSavedItemsQuery } from "@/redux/features/api/user/recommandetion/savedItemsGet";
import SavedProducts from "@/components/landing/SavedItems/SavedProducts";
import SavedPosts from "@/components/landing/SavedItems/SavedPosts";
import SavedArticles from "@/components/landing/SavedItems/SavedArticles";

const Page = () => {
  const { data, isLoading } = useGetSavedItemsQuery();
  const [activeTab, setActiveTab] = useState("All(24)");
  const [isOpen, setIsOpen] = useState(false);

  // const filteredItems =
  //   activeTab === "All(24)"
  //     ? items
  //     : items.filter((item) => item.type === activeTab);
  const filteredItems =
    activeTab === "All(24)"
      ? data?.data || []
      : data?.data?.filter((item) => {
          if (activeTab === "Products")
            return item.savable_type === "AffiliateProduct";
          if (activeTab === "Articles") return item.savable_type === "Article";
          if (activeTab === "Community Posts")
            return item.savable_type === "CommunityPost";
          return false;
        }) || [];

  const savedProducts = data?.data.filter(
    (item) => item.savable_type === "AffiliateProduct",
  );

  const savedArticles = data?.data.filter(
    (item) => item.savable_type === "Article",
  );

  const savedPosts = data?.data.filter(
    (item) => item.savable_type === "CommunityPost",
  );

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
      <div className="mb-8 md:mb-16">
        {/* Mobile Hamburger */}

        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white"
          >
            <span className="font-medium">{activeTab}</span>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-md overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition
            ${
              activeTab === tab
                ? "bg-[#229ECF] text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:grid grid-cols-6 overflow-hidden border-2 border-white! bg-white/25">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm cursor-pointer border-r-2 border-r-white! font-medium transition
          ${
            activeTab === tab
              ? "bg-[#229ECF] text-white"
              : "text-gray-600 hover:bg-gray-50"
          }
        `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {(activeTab === "All(24)" || activeTab === "Products") && (
        <SavedProducts products={savedProducts} />
      )}

      {/* Community Posts */}
      {/* {(activeTab === "All(24)" || activeTab === "Community Posts") && (
        <SavedPosts posts={savedPosts} />
      )} */}

      {/* Articles */}
      {(activeTab === "All(24)" || activeTab === "Articles") && (
        <SavedArticles articles={savedArticles} />
      )}
    </div>
  );
};

export default Page;
