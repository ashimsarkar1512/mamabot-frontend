"use client";

import { useState, useMemo } from "react";
import { comfortaa } from "@/app/fonts";
import { BookmarkIcon, Menu, X } from "lucide-react";

import {
  CommunityPost,
  SavedItem,
  useGetSavedItemsQuery,
} from "@/redux/features/api/user/recommandetion/savedItemsGet";

import SavedProducts from "@/components/landing/SavedItems/SavedProducts";
import SavedArticles from "@/components/landing/SavedItems/SavedArticles";
import SavedPosts from "@/components/landing/SavedItems/SavedPosts";
// import SavedPosts from "@/components/landing/SavedItems/SavedPosts";

const tabs = ["All", "Products", "Articles", "Community Posts"];

const Page = () => {
  const { data: savedItems = [], isLoading } = useGetSavedItemsQuery();

  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  /* ------------------ FILTERING ------------------ */
  const filteredItems = useMemo(() => {
    if (activeTab === "All") return savedItems;

    if (activeTab === "Products")
      return savedItems.filter(
        (item) => item.savable_type === "App\\Models\\AffiliateProductSave",
      );

    if (activeTab === "Articles")
      return savedItems.filter(
        (item) => item.savable_type === "App\\Models\\Article",
      );

    if (activeTab === "Community Posts")
      return savedItems.filter(
        (item) => item.savable_type === "App\\Models\\CommunityPost",
      );

    return [];
  }, [activeTab, savedItems]);

  const savedProducts = savedItems.filter(
    (item) => item.savable_type === "App\\Models\\AffiliateProductSave",
  );

  const savedArticles = savedItems.filter(
    (item) => item.savable_type === "App\\Models\\Article",
  );

  // const savedPosts = savedItems.filter(
  //   (item) => item.savable_type === "App\\Models\\CommunityPost",
  // );
  const savedPosts = savedItems.filter(
    (item): item is SavedItem & { savable: CommunityPost } =>
      item.savable_type === "App\\Models\\CommunityPost" &&
      item.savable !== null,
  );

  if (isLoading) {
    return <p className="py-20 text-center">Loading saved items...</p>;
  }

  return (
    <div className={`pt-12 ${comfortaa.className} space-y-7 md:space-y-24`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
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

      {/* ---------------- Tabs ---------------- */}
      <div>
        {/* Mobile */}
        <div className="md:hidden relative mb-6">
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-white"
          >
            <span>{activeTab}</span>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left ${
                    activeTab === tab
                      ? "bg-[#229ECF] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-4 border-2 !border-white bg-white/25">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 font-medium ${
                activeTab === tab
                  ? "bg-[#229ECF] text-white"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Content ---------------- */}
      {(activeTab === "All" || activeTab === "Products") && (
        <SavedProducts products={savedProducts} />
      )}

      {(activeTab === "All" || activeTab === "Articles") && (
        <SavedArticles articles={savedArticles} />
      )}

      {(activeTab === "All" || activeTab === "Community Posts") && (
        <SavedPosts posts={savedPosts} />
      )}
    </div>
  );
};

export default Page;
