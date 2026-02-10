"use client";

import React from "react";
import { useGetFooterPageBySlugQuery } from "@/redux/features/api/FooterPages";
import { comfortaa } from "@/app/fonts";

interface FooterPageViewerProps {
  slug: string;
}

const FooterPageViewer: React.FC<FooterPageViewerProps> = ({ slug }) => {
  console.log("FooterPageViewer slug:", slug);
  const { data, isLoading, isError } = useGetFooterPageBySlugQuery(slug);
  console.log("FooterPageViewer response:", { data, isLoading, isError });

  if (isLoading) return <p className="text-center py-12">Loading...</p>;

  if (isError || !data?.success || !data.data) {
    return (
      <p className="text-center py-12 text-red-500">
        {data?.message || "Page not found or inactive"}
      </p>
    );
  }

  const page = data.data;

  return (
    <div className={`prose prose-pink max-w-4xl mx-auto py-12 px-4 md:px-0 ${comfortaa.className}`}>
      <h1 className="text-3xl font-bold mb-8 text-primary">{page.title}</h1>
      <div 
        className="prose-headings:text-primary prose-a:text-pink-600 hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </div>
  );
};

export default FooterPageViewer;
