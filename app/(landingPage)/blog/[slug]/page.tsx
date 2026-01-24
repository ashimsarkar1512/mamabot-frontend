// // app/blog/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import { blogPosts } from "@/lib/data/blogData";
// import BlogDetails from "../blog-details/page";

// interface BlogPageProps {
//   params: { slug: string };
// }

// export default async function BlogPage({ params }: BlogPageProps) {
//   const { slug } = params;

//   const post = blogPosts.find(
//     (p) =>
//       p.slug === slug ||
//       p.title.toLowerCase().replace(/\s+/g, "-") === slug
//   );

//   if (!post) {
//     notFound();
//   }

//   return <BlogDetails post={post} />;
// }

// //  SSG stays same
// export async function generateStaticParams() {
//   return blogPosts.map((post) => ({
//     slug: post.title.toLowerCase().replace(/\s+/g, "-"),
//   }));
// }
"use client";

import BlogDetails from "@/components/landing/Blog/BlogDetails";
import { blogPosts } from "@/lib/data/blogData";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the post by slug
  const post = blogPosts.find(p => {
    const postSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return postSlug === slug;
  });

  if (!post) {
    notFound();
  }

  return <BlogDetails post={post} />;
}