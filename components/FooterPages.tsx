"use client";

import React from "react";
import { useGetFooterPageBySlugQuery } from "@/redux/features/api/FooterPages";
import { comfortaa } from "@/app/fonts";

interface FooterPageViewerProps {
  slug: string;
}

const FooterPageViewer: React.FC<FooterPageViewerProps> = ({ slug }) => {
  const { data, isLoading, isError } = useGetFooterPageBySlugQuery(slug);

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
    <div className={`prose max-w-4xl mx-auto py-12 ${comfortaa.className}`}>
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default FooterPageViewer;
