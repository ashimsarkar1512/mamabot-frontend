"use client";
import { useParams, useRouter } from "next/navigation";
import {
  useGetArticleByIdQuery,
  useGetArticlesQuery,
} from "@/redux/features/api/user/articles/pregnancyArticle";
import {
  ArrowLeft,
  Link2Icon,
  Linkedin,
  Twitter,
  Facebook,
  Bookmark,
  BookOpenIcon,
} from "lucide-react";
import Image from "next/image";

import Loading from "@/components/Loading";
import { comfortaa } from "@/app/fonts";
import { useState } from "react";
import Link from "next/link";

export default function SingleArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [showAll, setShowAll] = useState(false);

  const {
    data: articleData,
    isLoading,
    error,
  } = useGetArticleByIdQuery(articleId);

  const { data: pregnancyArticle } = useGetArticlesQuery(undefined);

  if (isLoading) return <Loading />;

  if (error || !articleData?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load article</p>
      </div>
    );
  }

  const article = Array.isArray(articleData.data)
    ? articleData.data[0]
    : articleData.data;

  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  // handle data or data.data
  const allArticles =
    pregnancyArticle?.data?.data || pregnancyArticle?.data || [];

  const relatedArticles = allArticles.filter(
    (item: any) => item.id !== article.id,
  );

  const visibleArticles = showAll
    ? relatedArticles
    : relatedArticles.slice(0, 3);

  return (
    <div className={`${comfortaa.className} min-h-screen pt-16`}>
      {/* Back Button */}
      <div className="mx-auto px-6 py-4 cursor-pointer">
        <button
          onClick={() => router.push("/user-dashboard")}
          className="flex items-center gap-2 text-[#229ECF] hover:opacity-70 transition-all font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Hero */}
      <div className="relative w-100 h-50 md:w-375 md:h-173.25 overflow-hidden">
        <Image
          src={article.main_img || "/images/blog/blog-details.png"}
          fill
          alt={article.title}
          className="object-cover"
          priority
        />

        <div className="absolute top-10 left-6 md:top-24 md:left-20">
          <span className="bg-[#229ECF]/80 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
            {article.category?.title || "Article"}
          </span>
        </div>

        <h1 className="hidden md:block md:text-5xl absolute bottom-12 left-20 max-w-3xl text-white font-bold drop-shadow-md">
          {article.title}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="mt-6">
        <p className="text-xs md:text-sm px-4 font-medium uppercase tracking-wider text-gray-600">
          {article.title}
        </p>
      </div>

      {/* Mobile title */}
      <div className="px-4">
        <h1 className="block md:hidden text-2xl font-bold text-[#229ECF] mt-8">
          {article.title}
        </h1>

        <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-2">
          {article.author && (
            <span className="font-semibold text-gray-700">
              By {article.author.first_name}
            </span>
          )}
          {article.read_duration && <span>• {article.read_duration} read</span>}
          {formattedDate && <span>• {formattedDate}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 mt-8 md:mt-16">
        {article.short_description && (
          <div className="md:py-6 py-4 font-semibold text-xl md:text-2xl mb-8 bg-slate-50/50">
            <p className="italic text-[#303030]">
              “{article.short_description}”
            </p>
          </div>
        )}

        <div className="text-[#303030] space-y-6 text-base md:text-lg leading-relaxed">
          <div
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{
              __html: article.long_description,
            }}
          />
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-4 mt-16 md:mt-24">
          <p className="text-[#229ECF] font-bold text-lg md:text-xl">
            Share this post
          </p>

          <div className="flex text-[#229ECF] gap-4 items-center">
            {[Link2Icon, Linkedin, Twitter, Facebook].map((Icon, index) => (
              <div
                key={index}
                className="bg-white hover:bg-[#229ECF] hover:text-white transition-all flex justify-center items-center border border-[#229ECF] rounded-full w-10 h-10 cursor-pointer shadow-sm"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 h-0.5 w-full bg-[#BAE1F0]" />

        {/* ---------------- RELATED ARTICLES ---------------- */}
        <div className="pt-12 md:pt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-[32px] font-bold text-[#229ECF]">
              Related Articles
            </h2>

            {relatedArticles.length > 3 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="text-base md:text-lg text-[#229ECF] hover:opacity-80 transition-opacity"
              >
                See more
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((item: any) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-4/3 overflow-hidden relative h-48 md:h-64">
                  <Image
                    src={
                      item.thumb_img ||
                      item.main_img ||
                      "/images/blog/blog-details.png"
                    }
                    fill
                    alt={item.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="flex justify-between mb-4 items-center text-[#229ECF]">
                    <p className="bg-[#DEF0F8] px-3 py-1 text-xs font-medium rounded-full">
                      {item.category?.title || "Article"}
                    </p>
                    <Bookmark size={20} />
                  </div>

                  <h3 className="text-xl font-semibold text-[#303030] mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[#677381] text-sm mb-6 line-clamp-3 grow">
                    {item.short_description}
                  </p>

                  <Link href={`/user-dashboard/articles/${item.id}`}>
                    <button className="w-full bg-[#229ECF] hover:bg-[#1a7bb5] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <BookOpenIcon size={18} />
                      Read Article
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-20" />
    </div>
  );
}
