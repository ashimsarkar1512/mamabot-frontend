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

  const week = profile?.data?.current_week;

  const { data: productData, isLoading: productsLoading } =
    useGetPregnancyProductsByWeekQuery(week!, { skip: !week });

  const { data: foodData } = useGetPregnancyFoodWeeklyLogsQuery(undefined);

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
    if (!foodData?.data?.length) return [];
    const todayIndex = new Date().getDay(); // 0-6 (Sun-Sat)
    const currentDay = todayIndex === 0 ? 7 : todayIndex;
    const weeklyLogs = foodData.data[0]?.daily_plan || [];
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
                    className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
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

                    <div className="p-5 flex flex-col">
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
        <section className="" ref={foodSectionRef}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-5 rounded-t-xl bg-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">🥗</span>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E91E8C]">
                  Today's Recommended Foods
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Personalized nutrition for Week {week || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {todaysFoodItems.length ? (
            <div className="space-y-3 sm:space-y-4 bg-white/25 px-6 pb-6">
              {todaysFoodItems.map((item: FoodItem, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">🥗</span>
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
                  <p className="text-gray-600 text-xs sm:text-sm mt-2">
                    {item.benefit}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 pb-6">
              No food recommendations available for today.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
