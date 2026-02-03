/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { ChevronRight, ArrowDown } from "lucide-react";
import { useGetArticlesQuery } from "@/redux/features/api/user/articles/pregnancyArticle";

const ArticleCard = ({ article }: { article: any }) => {

  const {data}=useGetArticlesQuery(undefined)
  
  console.log(data,"vaginal")
  
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-sky-100 rounded-[24px] hover:shadow-md transition-shadow">
      {/* Article Image */}
      <div className="relative w-full md:w-[160px] h-[140px] flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-col justify-between py-1">
        <div>
          <span className="inline-block px-3 py-1 bg-[#E1F3FB] text-[#2D88C8] text-[10px] font-bold rounded-full mb-2">
            {article.category}
          </span>
          <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {article.description}
          </p>
        </div>

        <button className="flex items-center gap-1 text-[#2D88C8] text-sm font-semibold mt-3 hover:translate-x-1 transition-transform w-fit">
          Read More <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const VaginalDeliveryArticles = ({
  title,
  articles,
  headingText = "black",
}: {
  title: string;
  articles: any[];
  headingText?: "colored" | "black";
}) => {
  return (
    <section className="w-full bg-[#F8FBFE] px-6 py-10 rounded-[40px]  my-8">
      <div className="container mx-auto">
        {headingText === "colored" ? (
          <h2 className="text-sm md:text-xl xl:text-2xl text-[#229ECF] pb-3 border-b border-[#229ECF]/40! mb-6">
            {title}
          </h2>
        ) : (
          <h2 className="text-lg font-semibold mb-8 px-2">{title}</h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles?.length > 0 &&
            articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <div className="w-10 h-10 rounded-full border border-sky-200 flex items-center justify-center bg-white shadow-sm hover:bg-sky-50 cursor-pointer transition-colors">
            <ArrowDown className="w-5 h-5 text-sky-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaginalDeliveryArticles;
