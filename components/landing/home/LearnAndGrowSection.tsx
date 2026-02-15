"use client";

import React from "react";
import { Clock, BookOpen, Navigation } from "lucide-react";
import Image from "next/image";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useRouter } from "next/navigation";
import { useGetLatestArticlesQuery } from "@/redux/features/api/GuestLanding/ArticlesLanding";

export default function LearnAndGrow() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetLatestArticlesQuery();

  if (isLoading) return <p>Loading articles...</p>;
  if (isError || !data?.data?.length) return <p>Failed to load articles</p>;

  const [featuredArticle, ...otherArticles] = data.data;

  return (
    <section className="">
      {/* Featured Article Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-12 border border-white rounded-[2.5rem] overflow-hidden shadow-sm bg-[#F8F9FB]">
        {/* Left - Featured Image */}
        <div className="bg-[#FCE7F3] overflow-hidden flex items-end justify-center relative min-h-100 lg:h-auto">
          {/* Featured Badge */}
          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm text-[#EF2364] text-[11px] font-bold px-4 py-1.5 rounded-full z-20 uppercase tracking-wider shadow-sm">
            Featured Article
          </div>

          <div className="relative w-full h-full min-h-125 flex items-end">
            <Image
              src={featuredArticle.main_img || "/images/home/article.png"}
              alt={featuredArticle.title || "Pregnant woman"}
              fill
              className="object-cover px-2 md:px-0 object-center"
              priority
            />
          </div>
        </div>

        {/* Right - Article Content */}
        <div className="relative p-4 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 mb-4  px-4 py-1.5 rounded-full w-fit">
              <BookOpen className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider">
                Expert Knowledge
              </span>
            </div>

            {/* Titles */}
            <h2 className="text-lg md:text-2xl  text-[#1A1A1A] mb-4 tracking-tight">
              Learn & <span className="text-[#EF2364]">Grow</span>
            </h2>
            {featuredArticle.category && (
              <div className="bg-[#E0F2FE] text-[#3FB1D3] text-xs px-4 py-1 rounded-full w-fit mb-3 uppercase">
                {featuredArticle.category.title}
              </div>
            )}

            <h3 className="text-xl md:text-3xl mb-5 leading-tight">
              {featuredArticle.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3">
              {featuredArticle.short_description}
            </p>

            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
              <span>— {featuredArticle.author_name}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{featuredArticle.read_duration}</span>
              </div>
            </div>

            <CommonButton
              text="Read Article"
              icon={<Navigation size={16} className="fill-white" />}
              iconPosition="right"
              onClick={() => router.push(`/articles/${featuredArticle.id}`)}
              className="rounded-lg py-2 px-6"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {otherArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Article Image */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <Image
                src={article.thumb_img || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover w-full h-full px-2 md:px-0 transition-transform duration-300 hover:scale-105"
                style={{ objectPosition: "center" }}
              />
            </div>

            {/* Article Content */}
            <div className="p-4 md:p-6  flex flex-col flex-1">
              <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {article.short_description}
              </p>
              <CommonButton
                text="Read Article"
                icon={<Navigation size={16} className="fill-white" />}
                iconPosition="right"
                onClick={() => router.push(`/articles/${article.id}`)}
                className="rounded-lg py-1 px-4 text-sm mt-auto w-fit bg-pink-600 hover:bg-pink-700 text-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* See More Link */}
      <div className="flex justify-center mt-8 ">
        <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm transition-colors border px-5 py-2 rounded-md cursor-pointer">
          See More
        </button>
      </div>
    </section>
  );
}
