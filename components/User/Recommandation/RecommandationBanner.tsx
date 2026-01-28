"use client";

import React from "react";
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
} from "lucide-react";
import Image from "next/image";

// Interface
export type RecommendationTab =
  | "all"
  | "product"
  | "nutrition"
  | "mental"
  | "wellness"
  | "articles";

interface Category {
  id: RecommendationTab;
  label: string;
  image?: string;
}

// Category Data
const categories: Category[] = [
  { id: "all", label: "All", image: "/images/recommandation/all.png" },
  {
    id: "product",
    label: "Products",
    image: "/images/recommandation/products.png",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    image: "/images/recommandation/nutrition.png",
  },
  {
    id: "wellness",
    label: "Wellness",
    image: "/images/recommandation/wellness.png",
  },
  {
    id: "mental",
    label: "Mental Health",
    image: "/images/recommandation/mental-health.png",
  },
  {
    id: "articles",
    label: "Articles",
    image: "/images/recommandation/articles.png",
  },
];

export default function RecommendationBannerPage({
  active,
  setActive,
}: {
  active: RecommendationTab;
  setActive: (value: RecommendationTab) => void;
}) {
  return (
    <div className="flex flex-col gap-8  min-h-screen">
      {/* Category Selection */}
      <section className="relative w-full overflow-hidden px-6 py-16 font-sans border border-white rounded-xl bg-white shadow-sm mt-8">
        {/* Gradient & Wave Background */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-pink-50/40 via-white to-blue-50/30" />
        <div
          className="absolute inset-0 z-1 opacity-40 bg-cover bg-bottom bg-no-repeat pointer-events-none"
          style={{
            backgroundImage:
              "url('/images/recommandation/recommendation-Img.png')",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[40px] font-semibold text-[#4CA7D0] mb-3"
          >
            Personalized Recommendations
          </motion.h2>

          <p className="text-gray-500 text-[15px] md:text-[16px] mb-12 max-w-2xl mx-auto">
            Curated just for you based on your pregnancy week, health needs, and
            preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-10">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="group cursor-pointer flex flex-col items-center min-w-22.5"
              >
                <div
                  className={`
          relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center
          border
          ${
            active === cat.id
              ? "border-[#4CA7D0] bg-white shadow-lg scale-110" // active snaps immediately
              : "border-white bg-white/40 backdrop-blur-md shadow-sm hover:border-blue-100"
          }
          transition-transform duration-300 group-hover:scale-105
        `}
                >
                  <div
                    className={`${active === cat.id ? "text-[#4CA7D0]" : "text-gray-400"}`}
                  >
                    <Image
                      src={cat.image!}
                      alt={cat.label}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <span
                  className={`mt-4 text-sm font-medium transition-colors duration-300 ${active === cat.id ? "text-gray-900" : "text-gray-400"}`}
                >
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="w-full bg-white/25 backdrop-blur-sm border border-white rounded-xl p-8 md:p-12 shadow-sm">
        <div className="flex items-start gap-4 mb-10">
          <div className="p-3 bg-[#E91E63] rounded-2xl shadow-lg text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-[#E91E63]">
                Pregnancy Week
              </h3>
              <span className="bg-[#E91E63] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                22
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered insights just for you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<Baby size={32} />}
            title="Development"
            desc="Your baby's hearing is developing rapidly this week."
          />
          <InfoCard
            icon={<Droplets size={32} />}
            title="Hydration"
            desc="You are slightly below your hydration goal today."
          />
          <InfoCard
            icon={<Settings size={32} />}
            title="Preferences"
            desc="Eco-Friendly & No Dietary Restrictions"
          />
        </div>
      </section>
    </div>
  );
}

// InfoCard component
function InfoCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-white rounded-xl p-10 flex flex-col items-center text-center shadow-sm">
      <div className="mb-4 text-[#4CA7D0]">{icon}</div>
      <h4 className="text-[#4CA7D0] font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
