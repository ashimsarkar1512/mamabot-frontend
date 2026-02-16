"use client";

import BlogDetails from "@/components/landing/Blog/BlogDetails";
import {
  useGetAllArticlesQuery,
  Article,
} from "@/redux/features/api/user/AllArticles";
import { useParams, notFound } from "next/navigation";
import React, { useMemo } from "react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Fetch all articles from the API
  const { data, isLoading, isError } = useGetAllArticlesQuery();

  // Flatten articles from categories
  const allArticles: Article[] = useMemo(() => {
    if (!data) return [];
    return data.data.flatMap((category) => category.articles);
  }, [data]);

  // Find the article by slug
  const post = allArticles.find((p) => p.slug === slug);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !post) notFound();

  return (
    <BlogDetails
      post={post}
      categoryTitle={
        data?.data.find((c) => c.id === post.category_id)?.title || "Blog"
      }
    />
  );
}
