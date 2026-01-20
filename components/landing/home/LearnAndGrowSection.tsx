"use client";

import React from "react";
import { Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import CommonButton from "@/components/ui/Reusable/CommonButton";

export default function LearnAndGrow() {
  const articles = [
    {
      id: 1,
      title: "Essential Guide to Newborn Sleep Patterns",
      description:
        "Understanding your baby's sleep cycle and creating healthy sleep habits from day one. Learn about sleep progression, soft sleep practices, and...",
      image: "/images/home/articleCard.png",
    },
    {
      id: 2,
      title: "10 Inspiring Parenting Stories That Changed Lives",
      description:
        "In the world of parenting, certain heartwarming stories stand out for their extraordinary twists, overwhelming emotions, profound influence on the industry.",
      image: "/images/home/articleCard1.png",
    },
    {
      id: 3,
      title: "Nurturing Creativity in Early Childhood Development",
      description:
        "Creativity lies at the heart of child development. Nurturing creativity is not always easy. It requires a delicate balance of guidance, preservation and...",
      image: "/images/home/articleCard3.png",
    },
  ];

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
              src="/images/home/article.png" // Path to your actual photo
              alt="Pregnant woman"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Right - Article Content */}
        <div className="relative p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 mb-4  px-4 py-1.5 rounded-full w-fit">
              <BookOpen className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider">
                Expert Knowledge
              </span>
            </div>

            {/* Titles */}
            <h2 className="text-xl md:text-2xl  text-[#1A1A1A] mb-4 tracking-tight">
              Learn & <span className="text-[#EF2364]">Grow</span>
            </h2>
            <p className="text-[#6B7280] text-base md:text-lg mb-3 font-medium">
              Evidence-based articles from medical experts and experienced
              parents
            </p>

            {/* Article Category Tag */}
            <div className="inline-block bg-[#E0F2FE] text-[#3FB1D3] text-sm  px-4 py-1.5 rounded-full mb-3 w-fit uppercase tracking-widest">
              Wellbeing
            </div>

            {/* Article Heading */}
            <h3 className="text-xl md:text-3xl  text-[#1A1A1A] mb-6 leading-[1.1] tracking-tight">
              Coping with Stress During <br />
              <span className="text-[#EF2364]">Pregnancy</span> – Tips from
              Experts
            </h3>

            {/* Article Excerpt */}
            <p className="text-[#6B7280] text-base md:text-lg mb-8 leading-relaxed font-medium">
              Discover evidence-based techniques to manage pregnancy stress and
              anxiety, recommended by healthcare professionals and experienced
              mothers.
            </p>

            {/* Meta Data */}
            <div className="flex items-center gap-5 mb-6 text-[15px] text-[#6B7280] font-medium">
              <span>— Dr. Sarah Müller</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Action Button */}
            {/* <button className="bg-[#EF2364] hover:bg-[#D41F58] text-white font-bold py-4 px-10 rounded-2xl w-fit transition-all duration-300 shadow-lg shadow-pink-100 text-lg">
              Read Article
            </button> */}

            <CommonButton
              className="rounded-lg py-2 px-5 "
              text="Read Article"
            />
          </div>

          {/* Bottom Right Decorative Illustration */}
          <div className="absolute right-0 bottom-0 w-50 h-50 md:w-70 md:h-70 pointer-events-none select-none opacity-40 lg:opacity-100 py-10">
            <Image
              src="/images/home/articleBottom.png"
              alt="Pregnancy Illustration"
              width={250}
              height={250}
              className="object-contain object-bottom-right"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Article Image */}
            <div className="h-64 md:h-80 bg-gray-200">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={400}
                height={300}
                className="w-full h-full"
              />
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h4 className="font-bold text-gray-900 text-base mb-3 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.description}
              </p>
              <CommonButton
                className="rounded-lg py-2 px-3 text-sm "
                text="Read Article"
              />
            </div>
          </div>
        ))}
      </div>

      {/* See More Link */}
      <div className="flex justify-center">
        <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm transition-colors">
          See More
        </button>
      </div>
    </section>
  );
}
