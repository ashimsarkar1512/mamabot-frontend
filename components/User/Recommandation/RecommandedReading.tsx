"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useGetArticlesQuery } from "@/redux/features/api/user/articles/pregnancyArticle";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string | null;
  timeToRead: string;
  category: string;
}

const placeholderImage =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";

export default function RecommendedReading() {
  const [showAll, setShowAll] = useState(false);
  const { data } = useGetArticlesQuery(undefined);

  // Transform API data to our Article type
  const articles: Article[] =
    data?.data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.short_description || item.long_description || "",
      image: item.main_img || item.thumb_img || placeholderImage,
      timeToRead: item.read_duration || "5 mins read",
      category: `Week ${item.week || 22}`,
    })) || [];

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
                  src={article.image || placeholderImage}
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

                <Link
    href={`/user-dashboard/articles/${article.id}`}
    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded-md flex items-center justify-center gap-2 font-semibold transition cursor-pointer"
  >
    📖 Read Now
  </Link>
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
