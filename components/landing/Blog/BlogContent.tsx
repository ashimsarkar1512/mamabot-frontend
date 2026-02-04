"use client";

import React, { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import { ChevronDown, Menu, X } from "lucide-react";
import { useGetAllArticlesQuery } from "@/redux/features/api/user/AllArticles";
const MAX_TABS = 6;
const VISIBLE_CARDS = 3;
const BlogContent: React.FC = () => {
  const { data, isLoading } = useGetAllArticlesQuery();
  const [activeCategory, setActiveCategory] = useState("View All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const categories = useMemo(() => {
    if (!data?.data) return [];
    return ["View All", ...data.data.map((cat) => cat.title)];
  }, [data]);

  const visibleTabs = categories.slice(0, MAX_TABS);
  const extraTabs = categories.slice(MAX_TABS);

  const filteredArticles = useMemo(() => {
    if (!data?.data) return [];

    if (activeCategory === "View All") {
      return data.data.flatMap((cat) =>
        cat.articles.map((article) => ({
          article,
          categoryTitle: cat.title,
        })),
      );
    }
    const visibleArticles = showAll
      ? filteredArticles
      : filteredArticles.slice(0, VISIBLE_CARDS);

    const category = data.data.find((c) => c.title === activeCategory);
    return (
      category?.articles.map((article) => ({
        article,
        categoryTitle: category.title,
      })) || []
    );
  }, [data, activeCategory]);
  const visibleArticles = showAll
    ? filteredArticles
    : filteredArticles.slice(0, VISIBLE_CARDS);
  if (isLoading) {
    return <p className="text-center py-20">Loading articles...</p>;
  }

  return (
    <section>
      {/* Tabs */}
      <div className="lg:flex hidden flex-wrap justify-around bg-white/25 border-2 !border-white mb-10">
        {visibleTabs.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-18.5 py-2 text-sm font-medium transition-all cursor-pointer
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

        {extraTabs.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="px-6 py-2 flex items-center gap-1 text-sm font-medium hover:bg-primary hover:text-white"
            >
              More <ChevronDown size={16} />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-20">
                {extraTabs.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setMoreOpen(false);
                      setShowAll(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 py-2 bg-white border-2 !border-white rounded-lg"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span>{activeCategory}</span>
        </button>
        {mobileMenuOpen && (
          <div className="mt-2 flex flex-col bg-white border-2 !border-white rounded-lg shadow-md overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 transition-all
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
        )}
      </div>

      {/*  Blog Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArticles.length > 0 ? (
          visibleArticles.map(({ article, categoryTitle }) => (
            <BlogCard
              key={article.id}
              post={article}
              categoryTitle={categoryTitle}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No articles found in this category.
          </p>
        )}
      </div>

      {/*  LOAD MORE */}
      {!showAll && filteredArticles.length > VISIBLE_CARDS && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg cursor-pointer hover:opacity-80  transition"
          >
            Load More Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogContent;
