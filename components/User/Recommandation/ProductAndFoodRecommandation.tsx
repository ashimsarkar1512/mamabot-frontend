/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bookmark, AlertCircleIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
import { useGetPregnancyProductsByWeekQuery } from "@/redux/features/api/user/recommandetion/productRecommandetion";
import { useSaveItemMutation } from "@/redux/features/api/user/recommandetion/savedItemsPost";
import { useSearchParams } from "next/navigation";
import { useGetPregnancyFoodWeeklyLogsQuery } from "@/redux/features/api/user/recommandetion/weeklyFoodSuggestion";

export interface Product {
  id: number | string;
  title: string;
  reason: string;
  category: string;
  price: string;
  image?: string;
  image_url?: string;
  affiliate_link: string;
}

interface FoodItem {
  name: string;
  nutrient: string;
  benefit: string;
}

export default function ProductAndFoodRecommendationsPage({
  active,
}: {
  active: "all" | "product" | "nutrition" | "mental" | "wellness" | "articles";
}) {
  const [saveProduct] = useSaveItemMutation();
  const [bookmarkedProducts, setBookmarkedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [showDisclosure, setShowDisclosure] = useState(false);

  const userInfo = useSelector((state: RootState) => state.auth.userFullInfo);
  const { data: profile } = useGetMyProfileQuery(undefined);
  console.log(profile,"profile ")

  const week = profile?.data?.current_week;

  const { data: productData, isLoading: productsLoading } =
    useGetPregnancyProductsByWeekQuery(week!, { skip: !week });

  console.log(productData, "productData");

  const { data: foodData, isLoading: foodLoading } =
    useGetPregnancyFoodWeeklyLogsQuery(
      {
        pregnancy_week: profile?.data?.current_week,
        dietary_preference:
          profile?.data?.dietary_preferences?.toLowerCase() || "",
      },
      { skip: !profile?.data?.current_week },
    );

  console.log(foodData, "foodData");

  const searchParams = useSearchParams();
  const foodSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo === "food" && foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  const handleSaveProduct = async (productId: number | string) => {
    try {
      await saveProduct({
        item_type: "product",
        item_id: Number(productId),
      }).unwrap();

      setBookmarkedProducts((prev) => ({
        ...prev,
        [productId]: true,
      }));

      alert("Product saved");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save product");
    }
  };

  // Extract today's food items from API
  const getTodaysFoodItems = (): FoodItem[] => {
    if (!foodData?.data) return [];
    const todayIndex = new Date().getDay(); // 0-6 (Sun-Sat)
    const currentDay = todayIndex === 0 ? 7 : todayIndex;
    const weeklyLogs = foodData.data.daily_plan || [];
    const todaysPlan = weeklyLogs.find((d: any) => d.day === currentDay);
    return todaysPlan?.items || [];
  };

  const todaysFoodItems = getTodaysFoodItems();

  return (
    <div className="flex flex-col gap-12 min-h-fit">
      {/* Products Section */}
      {(active === "all" || active === "product") && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Recommendations
              </h2>
              <span className="bg-[#BAE1F0] text-[#229ECF] text-sm  px-3 py-1 rounded-full font-semibold flex items-center gap-3">
                <Sparkles size={16} /> Ai powered
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

          {productsLoading ? (
            <p>Loading products...</p>
          ) : productData?.data?.products?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productData.data.products.map(
                (product: Product, index: number) => (
                  <div
                    key={product.id || index}
                    className="flex flex-col h-full group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative h-34 md:h-68 w-full">
                      <Image
                        src={
                          product.image ||
                          product.image_url ||
                          "/images/saved-items/saved1.png"
                        }
                        alt={product.title || "Product"}
                        fill
                        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/saved-items/saved1.png";
                        }}
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#229ECF] text-lg">
                          {product.title}
                        </h3>

                        <button
                          onClick={() => handleSaveProduct(product.id)}
                          className="p-1 cursor-pointer"
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

                      <p className="text-sm text-gray-500 mb-3">
                        {product.reason}
                      </p>

                      <div className="flex items-center gap-2 text-sm mb-4">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs capitalize">
                          {product.category}
                        </span>
                      </div>

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
                ),
              )}
            </div>
          ) : (
            <p>No products found for this week.</p>
          )}
        </section>
      )}

      {/* Food Section */}
      {(active === "all" || active === "nutrition") && (
        <section
          className="bg-[#F8F9FD] p-4 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm"
          ref={foodSectionRef}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <Image
                  src="/images/recommandation/food.png"
                  alt="Food"
                  width={56}
                  height={56}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerText = "🥗";
                      parent.className =
                        "text-4xl sm:text-5xl flex items-center justify-center";
                    }
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D81B60] tracking-tight leading-tight">
                  Today's Recommended Foods
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 font-medium">
                  Personalized nutrition for Week {week || "N/A"}
                </p>
              </div>
            </div>
            <span className="bg-[#10B981] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm self-start sm:self-auto">
              <Sparkles size={14} className="fill-white sm:w-4 sm:h-4" /> Fresh
            </span>
          </div>

          {todaysFoodItems.length ? (
            <div className="space-y-3 sm:space-y-4">
              {todaysFoodItems.map((item: FoodItem, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-[16px] sm:rounded-[20px] border border-[#E5E7EB] p-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 lg:gap-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Left row: Icon and Name for mobile focus */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center overflow-hidden border border-[#E5E7EB]">
                        <span className="text-xl sm:text-2xl">🥗</span>
                      </div>
                    </div>
                    <h3 className="text-[#374151] font-bold text-base sm:text-lg md:min-w-[150px] lg:min-w-[200px]">
                      {item.name}
                    </h3>
                  </div>

                  {/* Middle row: Nutrient and Benefit */}
                  <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {/* Nutrient Badge */}
                    {item.nutrient && (
                      <div className="sm:min-w-[160px] md:min-w-[180px] lg:min-w-[220px]">
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#F0FDF4] text-[#10B981] text-[10px] sm:text-xs font-bold border border-[#DCFCE7] whitespace-nowrap">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#10B981] flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-2 sm:w-2.5 h-2 sm:h-2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          {item.nutrient}
                        </span>
                      </div>
                    )}

                    {/* Benefit */}
                    <p className="text-[#6B7280] text-xs sm:text-sm flex-1 leading-relaxed">
                      {item.benefit}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
                    <button className="flex-1 md:flex-none px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-[#BAE1F0] text-[#229ECF] text-[10px] sm:text-xs font-bold hover:bg-[#BAE1F0]/10 transition-all whitespace-nowrap">
                    View Full Meal Plan
                    </button>
                    <button className="flex-1 md:flex-none px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-[#E5E7EB] text-[#6B7280] text-[10px] sm:text-xs font-bold hover:bg-gray-50 transition-all whitespace-nowrap">
                     Ask Al for Recipes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 sm:py-12 flex flex-col items-center justify-center text-gray-400 bg-white rounded-[16px] sm:rounded-[20px] border border-dashed border-gray-200">
              <Sparkles size={40} className="sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-200" />
              <p className="text-base sm:text-lg font-medium text-center px-4">
                No food recommendations available for today.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
