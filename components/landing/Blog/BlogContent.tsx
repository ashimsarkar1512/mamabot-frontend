"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/lib/data/blogData";

const BlogContent: React.FC = () => {
  return (
    <section className="">
      <div className="">
        {/* Tabs / Categories */}
        <div className="flex flex-wrap justify-around bg-white/25 border-2 !border-white mb-10">
          {[
            "View All",
            "Pregnancy",
            "Nutrition",
            "Baby Care",
            "Mental Health",
            "Exercise",
            "Postpartum",
          ].map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 text-start cursor-pointer hover:bg-primary hover:text-white text-sm font-medium transition-all ${
                cat === "View All"
                  ? "bg-primary text-white "
                  : " text-gray-700 "
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

       

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
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
