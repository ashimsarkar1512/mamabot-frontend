"use client";

import { comfortaa } from "@/app/fonts";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { Article } from "@/redux/features/api/user/AllArticles";

import { Bookmark, BookOpenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  post: Article;
  categoryTitle: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, categoryTitle }) => {
  return (
    <div
      className={`group relative ${comfortaa.className} bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
    >
      {/* Image */}
      <div className="w-full h-40 md:h-80 overflow-hidden">
        <Image
          src={post.thumb_img || "/placeholder.jpg"}
          width={524}
          height={320}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        {/* Category */}
        <div className="flex justify-between mb-4 items-center text-[#229ECF]">
          <span className="bg-[#DEF0F8] px-3 py-2 text-xs font-medium rounded-full">
            {categoryTitle}
          </span>
          <Bookmark width={22} height={22} />
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-[#303030] mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-[#677381] text-base md:text-lg mb-6 line-clamp-3 grow">
          {post.short_description}
        </p>

        <Link href={`/user-dashboard/blog/${post.slug}`} className="mt-auto">
          <CommonButton
            text="Read Article"
            icon={<BookOpenIcon size={22} />}
            iconPosition="left"
            bgColor="bg-[#229ECF]"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
