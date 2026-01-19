 'use client';

import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function LearnAndGrow() {
  const articles = [
    {
      id: 1,
      title: 'Essential Guide to Newborn Sleep Patterns',
      description: 'Understanding your baby\'s sleep cycle and creating healthy sleep habits from day one. Learn about sleep progression, soft sleep practices, and...',
      image: '/images/screenshot-202026-01-19-20162750.png',
    },
    {
      id: 2,
      title: '10 Inspiring Parenting Stories That Changed Lives',
      description: 'In the world of parenting, certain heartwarming stories stand out for their extraordinary twists, overwhelming emotions, profound influence on the industry.',
      image: '/images/screenshot-202026-01-19-20162750.png',
    },
    {
      id: 3,
      title: 'Nurturing Creativity in Early Childhood Development',
      description: 'Creativity lies at the heart of child development. Nurturing creativity is not always easy. It requires a delicate balance of guidance, preservation and...',
      image: '/images/screenshot-202026-01-19-20162750.png',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Featured Article Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Featured Image */}
          <div className="bg-pink-100 rounded-2xl overflow-hidden flex items-end justify-center relative h-96">
            <div className="absolute top-6 left-6 bg-pink-200 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
              Featured Article
            </div>
            <Image
              src="/images/screenshot-202026-01-19-20162750.png"
              alt="Pregnant woman"
              width={400}
              height={500}
              className="object-cover h-full"
            />
          </div>

          {/* Right - Article Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-semibold text-gray-700">Learn Knowledge</span>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Learn & <span className="text-pink-500">Grow</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6">
              Evidence-based articles from medical experts and experienced parents
            </p>

            {/* Article Tag */}
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
              Technology
            </div>

            {/* Article Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Coping with Stress During <span className="text-pink-500">Pregnancy</span> – Tips from Experts
            </h3>

            {/* Article Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Discover evidence-based techniques to manage pregnancy stress and anxiety, recommended by healthcare professionals and experienced mothers.
            </p>

            {/* Author & Read Time */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span>• Dr. Sarah Moler</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Read Article Button */}
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full w-fit transition-all duration-300">
              Read Article
            </button>

            {/* Decorative Illustration */}
            <div className="absolute right-8 bottom-8 w-24 h-24 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Article Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition-all duration-300">
                  Read Article
                </button>
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
      </div>
    </section>
  );
}
