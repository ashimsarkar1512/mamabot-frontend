"use client";

import { beauRivage, comfortaa } from "@/app/fonts";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useGetAllArticlesQuery } from "@/redux/features/api/user/AllArticles";
import { BookOpenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const BlogCover = () => {
   const { data, isLoading } = useGetAllArticlesQuery();

  const randomArticle = useMemo(() => {
    if (!data?.data) return null;

    const allArticles = data.data.flatMap((cat) =>
      cat.articles.map((article) => ({
        ...article,
        categoryTitle: cat.title,
      })),
    );

    if (allArticles.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * allArticles.length);
    return allArticles[randomIndex];
  }, [data]);

  if (isLoading || !randomArticle) {
    return null; // or skeleton loader
  }

  return (
    <section
      className={`relative ${comfortaa.className} w-full py-5 md:py-10 overflow-hidden `}
    >
      <div className="mb-10">
        <span
          className={`text-2xl md:text-[26px] ${beauRivage.className} font-medium text-[#229ECF] underline`}
        >
          Blog
        </span>

        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-800">
          Your Trusted Source for{" "}
          <span className="text-primary">Pregnancy</span> &{" "}
          <span className="text-[#229ECF]">Motherhood</span>
        </h1>

        <p className="mt-4 text-lg text-[#677381] ">
          Expert-verified articles, real mom experiences, and practical guidance
          for every stage of your journey
        </p>
      </div>
      <div className="">
        {/* Header */}

        {/* Cover Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white/25 border-2 !border-white overflow-hidden">
        {/* Image */}
        <div className="relative h-50 md:h-190 lg:h-auto">
          <Image
            src={randomArticle.main_img || "/images/blog/blog-banner.png"}
            alt={randomArticle.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="py-5 md:py-10 md:px-14 flex flex-col justify-between">
          <div>
            <span className="text-sm md:text-lg font-medium text-[#030213]">
              {randomArticle.categoryTitle}
            </span>

            <h2 className="mt-2 mb-4 md:mb-8 text-xl md:text-[32px] font-semibold text-[#101828]">
              {randomArticle.title}
            </h2>

            <p className="text-base md:text-lg text-[#4A5565] leading-relaxed">
              {randomArticle.short_description}
            </p>
          </div>

          {/* Author + CTA */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/blog/doctor.png"
                alt="Author"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-[#101828]">
                  {randomArticle.author_name || "Medical Expert"}
                </p>
                <p className="text-[#677381]">
                  {randomArticle.read_duration}
                </p>
              </div>
            </div>

            <Link href={`/user-dashboard/blog/${randomArticle.slug}`}>
              <CommonButton
                text="Read Full Article"
                icon={<BookOpenIcon size={24} />}
                iconPosition="left"
                bgColor="bg-[#229ECF]"
              />
            </Link>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
};

export default BlogCover;
