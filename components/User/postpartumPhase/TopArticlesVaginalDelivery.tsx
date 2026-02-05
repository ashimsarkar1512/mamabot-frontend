"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ArrowDown } from "lucide-react";
import Link from "next/link";

const ArticleCard = ({ article }: { article: any }) => {
  const staticFallback = "/images/MotherBaby.png";
  const [imgSrc, setImgSrc] = useState(article.image || staticFallback);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-sky-100 rounded-[24px] hover:shadow-md transition-shadow">
      {/* Article Image */}
      <div className="relative w-full md:w-40 h-35 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          className="object-cover"
          onError={() => setImgSrc(staticFallback)}
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-col justify-between py-1">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-[#E1F3FB] text-[#2D88C8] text-[10px] font-bold rounded-full">
              {article.category}
            </span>
            {article.week && (
              <span className="inline-block px-3 py-1 bg-[#FFF4E6] text-[#F59E0B] text-[10px] font-bold rounded-full">
                Week {article.week}
              </span>
            )}
          </div>
          <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {article.description}
          </p>
          {article.readDuration && (
            <p className="text-gray-400 text-xs mt-1">{article.readDuration}</p>
          )}
        </div>

        <Link
          href={`/user-dashboard/articles/${article.id}`}
          className="flex items-center gap-1 text-[#2D88C8] text-sm font-semibold mt-3 hover:translate-x-1 transition-transform w-fit"
        >
          Read More <ChevronRight className="w-4 h-4" />
        </Link>
       
      </div>
    </div>
  );
};

const VaginalDeliveryArticles = ({
  title,
  articles,
  headingText = "black",
  isLoading = false,
}: {
  title: string;
  articles: any[];
  headingText?: "colored" | "black";
  isLoading?: boolean;
}) => {
  return (
    <section className="w-full bg-[#F8FBFE] px-3 md:px-6 py-5 md:py-10 rounded-[40px] my-4 md:my-8">
      <div className="container mx-auto">
        {headingText === "colored" ? (
          <h2 className="text-sm md:text-xl xl:text-2xl text-[#229ECF] pb-3 border-b border-[#229ECF]/40! mb-6">
            {title}
          </h2>
        ) : (
          <h2 className="text-lg font-semibold mb-8 px-2">{title}</h2>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-sky-100 rounded-[24px] animate-pulse"
              >
                <div className="w-full md:w-40 h-35 bg-gray-200 rounded-2xl" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No articles available at the moment.
          </div>
        )}

        {/* Bottom Scroll Indicator */}
        {articles?.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="w-10 h-10 rounded-full border border-sky-200 flex items-center justify-center bg-white shadow-sm hover:bg-sky-50 cursor-pointer transition-colors">
              <ArrowDown className="w-5 h-5 text-sky-400" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VaginalDeliveryArticles;