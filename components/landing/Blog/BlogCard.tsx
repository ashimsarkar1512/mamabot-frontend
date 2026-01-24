"use client";

import { comfortaa } from "@/app/fonts";
import { BlogPost } from "@/lib/data/blogData";
import { Bookmark, BookOpenIcon} from "lucide-react";
import Image from "next/image";
import React from "react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className={`group relative ${comfortaa.className} bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
      {/* Image */}
      <div className="w-80 h-40 md:w-131 md:h-80 aspect-4/3 overflow-hidden">
        <Image
          src={post.image}
          width={524}
          height={320}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        {/* Category badge */}
        <div className="flex justify-between mb-4 items-center text-[#229ECF]">
          <p className=" bg-[#DEF0F8] px-3 py-2 backdrop-blur-sm text-[#229ECF] text-xs font-medium  rounded-full">
            {post.category}
          </p>
          <Bookmark width={24} height={24} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#303030] mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-[#677381] text-base md:text-lg mb-5 md:mb-8 line-clamp-3 grow">
          {post.description}
        </p>

        <div className="mt-auto">
          <button className="inline-flex text-base md:text-lg items-center justify-center w-full bg-[#229ECF] hover:opacity-80 cursor-pointer text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
           <BookOpenIcon className="mr-3"/> {post.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
