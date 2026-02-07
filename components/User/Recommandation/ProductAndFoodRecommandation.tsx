/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  LayoutGrid,
  ShoppingBag,
  Apple,
  Leaf,
  BrainCircuit,
  FileText,
  Bookmark,
  AlertCircleIcon,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

import Image from "next/image";
import { items } from "@/lib/data/savedData";
import { useGetPersonalizedRecomendationProductsQuery } from "@/redux/features/api/user/personalizedRecomendation";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useGetPregnancyProductsByWeekQuery } from "@/redux/features/api/user/recommandetion/productRecommandetion";
import { useSearchParams } from "next/navigation";
import { foodItems } from "@/lib/data/product&foodRecommend";
import { useGetPregnancyFoodWeeklyLogsQuery } from "@/redux/features/api/user/recommandetion/weeklyFoodSuggestion";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "all", label: "All", icon: <LayoutGrid size={28} /> },
  { id: "products", label: "Products", icon: <ShoppingBag size={28} /> },
  { id: "nutrition", label: "Nutrition", icon: <Apple size={28} /> },
  { id: "wellness", label: "Wellness", icon: <Leaf size={28} /> },
  { id: "mental", label: "Mental Health", icon: <BrainCircuit size={28} /> },
  { id: "articles", label: "Articles", icon: <FileText size={28} /> },
];

export default function ProductAndFoodRecommendationsPage({
  active,
}: {
  active: "all" | "product" | "nutrition" | "mental" | "wellness" | "articles";
}) {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [bookmarkedProducts, setBookmarkedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleBookmark = (productId: string) => {
    setBookmarkedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const userInfo = useSelector((state: RootState) => state.auth.userFullInfo);
  console.log(userInfo, "rwertert435");
  const { data: profile } = useGetMyProfileQuery(undefined);
  console.log(profile);

  const week = profile?.data?.current_week;

  const {
    data: productData,
    isLoading,
    error,
  } = useGetPregnancyProductsByWeekQuery(week!, { skip: !week });

  const { data: food } = useGetPregnancyFoodWeeklyLogsQuery(undefined);
  console.log(food, "get all food in week");

  const searchParams = useSearchParams();
  const foodSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo === "food" && foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);
  console.log(productData, "product datafg ");

  return (
    <div className="flex flex-col gap-12 min-h-fit">
      {/*  Today's Recommended Products  */}
      {(active === "all" || active === "product") && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Recommendations
              </h2>
              <span className="bg-[#BAE1F0] text-[#229ECF] text-sm  px-3 py-1 rounded-full font-semibold flex items-center gap-3">
                <Sparkles size={16} /> Ai powwered
              </span>
            </div>
            <p className="text-sm flex gap-2 items-start px-4 py-2 bg-white max-w-md rounded-full text-gray-500">
              <AlertCircleIcon className="text-[#229ECF]" />
              <span>
                Affiliate Link: We earn a small commission if you buy through
                this link. No extra cost for you.
                <span
                  onClick={() => setShowDisclosure(true)}
                  className="text-[#229ECF] cursor-pointer hover:underline"
                >
                  {" "}
                  Learn more
                </span>
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productData?.data?.products?.map((product: any, index: number) => (
              <div
                key={index}
                className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-34 md:h-68 w-full">
                  <Image
                    src={
                      product.image_url ||
                      items[0]?.image ||
                      "/placeholder-product.jpg"
                    }
                    alt={product.title || "Product"}
                    fill
                    className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>

                <div className="p-5 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#229ECF] text-lg">
                      {product.title}
                    </h3>
                    <button
                      onClick={() => toggleBookmark(product.id)}
                      className="p-1"
                    >
                      {bookmarkedProducts[product.id] ? (
                        <Bookmark
                          className="text-[#229ECF] fill-[#229ECF]"
                          size={18}
                        />
                      ) : (
                        <Bookmark size={18} />
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{product.reason}</p>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs capitalize">
                      {product.category}
                    </span>
                    {/* <span className="text-yellow-500">★ 5</span>
                      <span className="text-gray-400">(5)</span> */}
                  </div>

                  {/* New Price & Button Section */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#229ECF]">
                      {product.price || ""}
                    </span>
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border-2 cursor-pointer border-[#229ECF] px-4 py-2 text-sm text-[#229ECF] hover:text-white hover:border-white bg-[#DEF0F8] hover:bg-[#229ECF] transition"
                    >
                      View In Shop
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showDisclosure && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div
                onClick={() => setShowDisclosure(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              {/* Modal */}
              <div className="relative bg-white max-w-xl mx-2 md:mx-0 md:max-w-2xl lg:max-w-3xl rounded-2xl p-4 md:p-10 shadow-xl animate-fadeIn">
                {/* Close */}
                <button
                  onClick={() => setShowDisclosure(false)}
                  className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-700"
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg md:text-2xl font-bold pt-5 sm:pt-0 mb-4">
                  Transparency About Our Product Recommendations
                </h3>

                <div className="text-sm md:text-lg text-[#666666] space-y-2 md:space-y-4 leading-relaxed">
                  <p>
                    Mamabot is part of various affiliate marketing programs,
                    including Amazon Associates and Awin. This means: if you
                    visit a shop through one of our links and make a purchase,
                    we receive a small commission from the merchant.
                  </p>

                  <p>
                    This does <strong>NOT</strong> result in additional costs
                    for you. Prices remain the same whether you visit directly
                    or through our link.
                  </p>

                  <div>
                    <p>
                      Our product recommendations are based on objective
                      criteria:{" "}
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>User reviews and test results</li>
                      <li>Safety standards for babies</li>
                      <li>Relevance to your personal situation</li>
                      <li>Value for money</li>
                    </ul>
                  </div>

                  <p>
                    The amount of commission does <strong>NOT</strong> influence
                    which products we recommend.
                  </p>
                  <p>
                    Product recommendations are non-binding. You are not
                    obligated to purchase these products.
                  </p>

                  <p>
                    If uncertain, please consult an expert (midwife,
                    paediatrician).
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      <div className="flex flex-col gap-12 min-h-fit border  rounded-xl">
        {/* Today's Recommended Foods */}
        {(active === "all" || active === "nutrition") && (
          <section className="" ref={foodSectionRef}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-5 rounded-t-xl bg-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">🥗</span>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E91E8C]">
                    Today's Recommended Foods
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Personalized nutrition for Week {week}
                  </p>
                </div>
              </div>
              <span className="bg-green-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="sm:w-4 sm:h-4"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Fresh
              </span>
            </div>

            {/* Food Items List */}
            <div className="space-y-3 sm:space-y-4 bg-white/25 px-6 pb-6">
              {(() => {
                // Get current day of week (1-7)
                const todayIndex = new Date().getDay(); // 0-6 (Sun-Sat)
                const currentDay = todayIndex === 0 ? 7 : todayIndex;

                // Extract daily plan
                const weeklyLogs = food?.data?.[0]?.daily_plan || [];
                const todaysPlan =
                  weeklyLogs.find((d: any) => d.day === currentDay) ||
                  weeklyLogs[0];
                const dynamicItems = todaysPlan?.items || [];

                // Fallback to static items if no API data yet, or render nothing/message
                // The user wants "proper set", so we should use API data.
                const itemsToRender =
                  dynamicItems.length > 0 ? dynamicItems : [];

                if (itemsToRender.length === 0 && !isLoading) {
                  return (
                    <div className="text-center p-4 text-gray-500">
                      No food recommendations available for today.
                    </div>
                  );
                }

                return itemsToRender.map((item: any, index: number) => {
                  // Helper to assign icon based on name
                  const getIcon = (name: string) => {
                    const lower = name?.toLowerCase() || "";
                    if (
                      lower.includes("spinach") ||
                      lower.includes("salad") ||
                      lower.includes("kale") ||
                      lower.includes("broccoli") ||
                      lower.includes("bok choy") ||
                      lower.includes("vegetable")
                    )
                      return "🥗";
                    if (
                      lower.includes("fruit") ||
                      lower.includes("apple") ||
                      lower.includes("orange") ||
                      lower.includes("berry") ||
                      lower.includes("strawberries") ||
                      lower.includes("banana")
                    )
                      return "🍎";
                    if (lower.includes("soup") || lower.includes("stew"))
                      return "🥣";
                    if (
                      lower.includes("chicken") ||
                      lower.includes("meat") ||
                      lower.includes("beef") ||
                      lower.includes("steak")
                    )
                      return "🍗";
                    if (
                      lower.includes("fish") ||
                      lower.includes("salmon") ||
                      lower.includes("tuna")
                    )
                      return "🐟";
                    if (lower.includes("egg") || lower.includes("omelet"))
                      return "🥚";
                    if (
                      lower.includes("yogurt") ||
                      lower.includes("milk") ||
                      lower.includes("cheese") ||
                      lower.includes("dairy")
                    )
                      return "🥛";
                    if (
                      lower.includes("toast") ||
                      lower.includes("bread") ||
                      lower.includes("wrap") ||
                      lower.includes("sandwich") ||
                      lower.includes("grain")
                    )
                      return "🍞";
                    if (
                      lower.includes("rice") ||
                      lower.includes("quinoa") ||
                      lower.includes("oat") ||
                      lower.includes("cereal")
                    )
                      return "🍚";
                    if (
                      lower.includes("avocado") ||
                      lower.includes("guacamole")
                    )
                      return "🥑";
                    if (
                      lower.includes("nut") ||
                      lower.includes("almond") ||
                      lower.includes("walnut")
                    )
                      return "🥜";
                    return "🍽️";
                  };

                  const icon = getIcon(item.name);

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-sm transition-shadow"
                    >
                      {/* Desktop Layout (lg and up) */}
                      <div className="hidden lg:grid lg:grid-cols-[minmax(240px,1.2fr)_minmax(220px,1fr)_2fr_auto] gap-6 items-center">
                        {/* Food Name & Icon */}
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="text-2xl sm:text-3xl shrink-0">
                            {icon}
                          </span>

                          <span className="font-medium text-gray-900 text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis block">
                            {item.name}
                          </span>
                        </div>

                        {/* Benefit Badge */}
                        <div className="min-w-0">
                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium whitespace-nowrap">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="sm:w-4 sm:h-4 shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>

                            {item.nutrient && (
                              <span className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                                {item.nutrient}
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="min-w-0">
                          <p className="text-gray-600 text-sm">
                            {item.benefit}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 bg-transparent rounded-lg text-xs sm:text-sm px-3 sm:px-4"
                          >
                            View Full Meal Plan
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-700 border-gray-200 hover:bg-gray-50 bg-transparent rounded-lg text-xs sm:text-sm px-3 sm:px-4"
                          >
                            Ask AI for Recipes
                          </Button>
                        </div>
                      </div>

                      {/* Mobile & Tablet Layout (below lg) */}
                      <div className="lg:hidden space-y-3 sm:space-y-4">
                        {/* Food Name & Icon */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-3xl">{icon}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 text-sm sm:text-base">
                              {item.name}
                            </span>
                            {item.nutrient && (
                              <span className="text-xs text-gray-500">
                                {item.nutrient}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Benefit Badge */}
                        <div>
                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="sm:w-4 sm:h-4"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {item.benefit}
                          </span>
                        </div>

                        {/* Description */}
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {item.nutrient
                              ? `Rich in ${item.nutrient.toLowerCase().replace("high in ", "")}`
                              : "Recommended for healthy pregnancy."}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 bg-transparent rounded-lg w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4"
                          >
                            View Full Meal Plan
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-700 border-gray-200 hover:bg-gray-50 bg-transparent rounded-lg w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4"
                          >
                            Ask AI for Recipes
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
