"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  timeToRead: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "How Your Baby Responds to Sound This Week",
    description:
      "As your baby continues to grow and develop, each week brings exciting milestones. One of the most remarkable developments in the early pregnancy is your baby's hearing ability.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "5 mins read",
    category: "Week 22",
  },
  {
    id: 2,
    title: "Safe Sleep Positions in the Second Trimester",
    description:
      "As your pregnancy progresses, sleep can become increasingly difficult. While most safe sleep positions vary based on personal comfort, finding the right position becomes even more important.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "4 mins read",
    category: "Sleep",
  },
  {
    id: 3,
    title: "Foods That Reduce Pregnancy Fatigue",
    description:
      "Pregnancy can be a beautiful journey, but it also comes with a host of challenges especially when it comes to nutrition. Let's explore what we can eat to stay healthy.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "6 mins read",
    category: "Nutrition",
  },
  {
    id: 4,
    title: "Managing Pregnancy Fatigue Naturally",
    description:
      "Explore natural remedies and lifestyle changes that can help manage pregnancy fatigue during your second trimester.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "5 mins read",
    category: "Wellness",
  },
  {
    id: 5,
    title: "Prenatal Exercise Guide for Week 22",
    description:
      "Safe and effective exercises you can do during your second trimester to maintain fitness and prepare for labor.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "7 mins read",
    category: "Exercise",
  },
  {
    id: 6,
    title: "Understanding Baby Development in Week 22",
    description:
      "Learn about the incredible developments happening with your baby this week, from brain development to physical growth.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    timeToRead: "6 mins read",
    category: "Development",
  },
];

export default function RecommendedReading() {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-foreground">Recommended Reading for </span>
            <span className="text-[#0891b2]">Week 22</span>
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#0891b2] hover:text-cyan-700 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            {showAll ? "Show Less" : "View All Articles"}
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition"
            >
              {/* Image */}
              <div className="relative w-full aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover brightness-90"
                />
               
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
                  {article.timeToRead}
                </span>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>

                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded flex items-center justify-center gap-2 font-semibold transition cursor-pointer">
                  📖 Read Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show All / Show Less */}
        {showAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="text-[#0891b2] hover:text-cyan-700 font-medium text-sm transition-colors"
            >
              Show Less Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
