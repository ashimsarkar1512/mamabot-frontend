"use client";
import { comfortaa } from "@/app/fonts";
import {
  Link2Icon,
  Linkedin,
  Twitter,
  Facebook,
  BookOpenIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import BlogCard from "./BlogCard";
import { Article } from "@/redux/features/api/user/AllArticles";

interface BlogDetailsProps {
  post: Article;
  categoryTitle: string;
  relatedPosts?: Article[];
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  post,
  categoryTitle,
  relatedPosts = [],
}) => {
  const router = useRouter();

  return (
    <div className={`${comfortaa.className} min-h-screen pt-18`}>
      {/* Hero Section */}
      <div className="relative w-full h-50 md:h-200 overflow-hidden">
        <Image
          src={post.thumb_img || "/images/blog/blog-details.png"}
          fill
          alt={post.title}
          className="object-cover w-full h-full"
          priority
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 md:top-10 md:left-20">
          <span className="bg-[#229ECF]/80 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-[10px] md:text-sm font-medium shadow-lg">
            {categoryTitle}
          </span>
        </div>

        {/* Desktop Title */}
        <h1 className="hidden md:block text-2xl md:text-5xl absolute top-50 left-20 max-w-2xl text-white font-bold">
          {post.title}
        </h1>
      </div>

      {/* Mobile Title */}
      <h1 className="block md:hidden text-2xl font-bold text-[#229ECF] mt-10 mb-4">
        {post.title}
      </h1>

      {/* Article Content */}
      <div className="mx-auto px-0 md:px-8 mt-6 md:mt-12 z-10">
        <div className="rounded-2xl mb-12">
          <h2 className="text-xl md:text-[32px] text-[#229ECF] font-bold py-3 md:py-6">
            Introduction
          </h2>
          <div className="text-[#303030] space-y-6 text-base md:text-lg leading-relaxed">
            {post.long_description ? (
              <div
                dangerouslySetInnerHTML={{ __html: post.long_description }}
              />
            ) : (
              <p>No content available for this article.</p>
            )}
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col gap-1 mt-8 md:mt-16">
            <button className="gap-2 text-[#229ECF] hover:opacity-80 font-medium text-base md:text-xl transition-colors">
              <span>Share this post</span>
            </button>
            <div className="flex text-[#229ECF] gap-2 items-center justify-center">
              {[Link2Icon, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className="bg-white flex justify-center items-center border rounded-full w-6 md:w-8 h-6 md:h-8"
                >
                  <Icon width={24} height={24} />
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 py-4 md:py-10 items-center">
              <p className="bg-[#DEF0F8] text-base px-2 py-1">
                Postpartum recovery
              </p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">
                Bleeding & Cramping
              </p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">Women Health</p>
              <p className="bg-[#DEF0F8] text-base px-2 py-1">Baby Care</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 md:pt-24">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-[32px] font-bold text-[#229ECF]">
                Related Articles
              </h2>
              <button
                onClick={() => router.push("/blog")}
                className="text-base md:text-lg text-[#229ECF] cursor-pointer hover:opacity-80"
              >
                See more
              </button>
            </div>
            <div className="mt-4 mb-5 md:mb-10 h-[2px] w-full mx-auto bg-[#BAE1F0]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  categoryTitle={categoryTitle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
