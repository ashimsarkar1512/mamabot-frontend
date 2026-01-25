"use client";

import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/lib/data/blogData";
const categories = [
  "View All",
  "Pregnancy",
  "Nutrition",
  "Baby Care",
  "Mental Health",
  "Exercise",
  "Postpartum",
];
const BlogContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("View All");

  const filteredBlogs =
    activeCategory === "View All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);
  return (
    <section className="">
      <div className="">
        {/* Tabs / Categories */}
        <div className="flex flex-wrap justify-around bg-white/25 border-2 !border-white mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-18.5 py-2.5 text-sm font-medium transition-all cursor-pointer
                ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No articles found in this category.
            </p>
          )}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className=" text-lg border-2 !border-[#229ECF] hover:bg-gray-50 text-[#229ECF] cursor-pointer font-medium py-3 px-8 rounded-lg shadow-sm transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
