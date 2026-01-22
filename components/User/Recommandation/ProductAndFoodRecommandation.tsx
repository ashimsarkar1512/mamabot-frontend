"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  ShoppingBag,
  Apple,
  Leaf,
  BrainCircuit,
  FileText,
  Baby,
  Droplets,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button"; // Adjust your path
import { Card } from "@/components/ui/card"; // Adjust your path
import Image from "next/image";

// ====================== Category Data ======================
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

// ====================== Products Data ======================
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

const products: Product[] = [
  {
    id: "p1",
    name: "Prenatal Vitamin Gummies",
    image: "https://cdn-icons-png.flaticon.com/512/2913/2913141.png",
    description:
      "Daily vitamins to support pregnancy health and baby's development.",
    rating: 4.8,
    reviews: 1523,
    price: 19.99,
  },
  {
    id: "p2",
    name: "Organic Almond Milk",
    image: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
    description: "Rich in calcium and vitamins for expecting mothers.",
    rating: 4.6,
    reviews: 874,
    price: 7.99,
  },
  {
    id: "p3",
    name: "Maternity Pillow",
    image: "https://cdn-icons-png.flaticon.com/512/2906/2906496.png",
    description: "Provides comfort and support during sleep.",
    rating: 4.9,
    reviews: 430,
    price: 34.99,
  },
];

// ====================== Food Items Data ======================
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

// ====================== Component ======================
export default function ProductAndFoodRecommendationsPage() {
  const [active, setActive] = useState("all");

  return (
    <div className="flex flex-col gap-12 min-h-screen">
      {/* ====================== Product Recommendations ====================== */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Recommendations
            </h2>
            <span className="bg-cyan-200 text-cyan-700 text-xs px-3 py-1 rounded-full font-semibold">
              of {products.length} Products
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Affiliate Link. We earn a small commission if you buy these.{" "}
            <span className="text-cyan-600 cursor-pointer hover:underline">
              Learn more
            </span>
          </p>
        </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map((product) => (
    <Card
      key={product.id}
      className="overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-shadow rounded-xl"
    >
      {/* Image Container */}
      <div className="relative w-full h-56 md:h-64 bg-gray-200 overflow-hidden rounded-t-xl">
         <Image
    src="/images/blog/blog1.png"
    alt={product.name}
    fill
    className="object-cover transition-transform duration-300 hover:scale-105"
  />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between h-[220px]">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-lg md:text-xl">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm md:text-base">
            View to Shop
          </Button>
        </div>
      </div>
    </Card>
  ))}
</div>

      </section>
      {/* ====================== Today's Recommended Foods ====================== */}
      <section>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
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
