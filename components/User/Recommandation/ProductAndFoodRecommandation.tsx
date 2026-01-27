"use client";

import React, { useState } from "react";

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
} from "lucide-react";
import { Button } from "@/components/ui/Button";

import Image from "next/image";
import { items } from "@/lib/data/savedData";

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

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

interface FoodItem {
  id: string;
  icon: string;
  name: string;
  benefit: string;
  description: string;
}

const foodItems: FoodItem[] = [
  {
    id: "f1",
    icon: "🥦",
    name: "Broccoli",
    benefit: "High in Folate",
    description: "Supports fetal growth and maternal health.",
  },
  {
    id: "f2",
    icon: "🍓",
    name: "Strawberries",
    benefit: "Rich in Vitamin C",
    description: "Boosts immunity and iron absorption.",
  },
  {
    id: "f3",
    icon: "🥑",
    name: "Avocado",
    benefit: "Healthy Fats",
    description: "Provides essential fatty acids for baby's brain development.",
  },
  {
    id: "f4",
    icon: "🍊",
    name: "Oranges",
    benefit: "Vitamin C & Fiber",
    description: "Strengthens immune system and aids digestion.",
  },
  {
    id: "f5",
    icon: "🥕",
    name: "Carrots",
    benefit: "Beta-Carotene",
    description: "Supports eye development in the fetus.",
  },
  {
    id: "f6",
    icon: "🍌",
    name: "Bananas",
    benefit: "Potassium Rich",
    description: "Helps prevent leg cramps and boosts energy.",
  },
  {
    id: "f7",
    icon: "🥩",
    name: "Lean Meat",
    benefit: "Iron & Protein",
    description: "Supports hemoglobin levels and overall energy.",
  },
];

export default function ProductAndFoodRecommendationsPage() {
  const [active, setActive] = useState("all");
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <div className="flex flex-col gap-12 min-h-screen">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Recommendations
            </h2>
            <span className="bg-[#BAE1F0] text-[#229ECF] text-xs px-3 py-1 rounded-full font-semibold">
              of {items.length} Products
            </span>
          </div>
          <p className="text-sm flex gap-2 items-start px-4 py-2 bg-white max-w-md rounded-full text-gray-500">
            <AlertCircleIcon className="text-[#229ECF]" />
            <span>
              Affiliate Link: We earn a small commission if you buy through this
              link. No extra cost for you.
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
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-34 md:h-68 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-[#229ECF] text-lg">
                    {item.title}
                  </h3>
                  <Bookmark
                    className="text-[#229ECF] fill-[#229ECF]"
                    size={18}
                  />
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
                  including Amazon Associates and Awin. This means: if you visit
                  a shop through one of our links and make a purchase, we
                  receive a small commission from the merchant.
                </p>

                <p>
                  This does <strong>NOT</strong> result in additional costs for
                  you. Prices remain the same whether you visit directly or
                  through our link.
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
                  Product recommendations are non-binding. You are not obligated
                  to purchase these products.
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
      {/* ====================== Today's Recommended Foods ====================== */}
      <section className="">
        <div className="flex items-center justify-between p-6 bg-[#ffffff] mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥗</span>
            <h2 className="text-2xl font-bold text-pink-600">
              Today's Recommended Foods
            </h2>
          </div>
          <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
            {foodItems.length} Food
          </span>
        </div>
        {/* 32px  padding foods er baire, gap-y-2, proti food er card e p-4 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <tbody>
                {foodItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 last:border-b-0 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-semibold text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {item.benefit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 bg-transparent"
                      >
                        View Nutrition Plan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 bg-transparent"
                      >
                        Add to Recipe
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
