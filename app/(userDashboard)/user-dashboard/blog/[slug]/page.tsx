"use client";

import BlogDetails from "@/components/landing/Blog/BlogDetails";
import { blogPosts } from "@/lib/data/blogData";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the post by slug
  const post = blogPosts.find((p) => {
    const postSlug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return postSlug === slug;
  });

  if (!post) {
    notFound();
  }

  return <BlogDetails post={post} />;
}
