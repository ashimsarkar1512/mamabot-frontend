"use client";

import React from "react";
import { useGetFooterPageBySlugQuery } from "@/redux/features/api/FooterPages";
import { comfortaa } from "@/app/fonts";

interface FooterPageViewerProps {
  slug: string;
}

const FooterPageViewer: React.FC<FooterPageViewerProps> = ({ slug }) => {
  const { data, isLoading, isError } = useGetFooterPageBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading page…</p>
      </div>
    );
  }

  if (isError || !data?.success || !data.data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {data?.message || "Page not found"}
        </p>
      </div>
    );
  }

  const page = data.data;

  return (
    <section className={` ${comfortaa.className}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <header className="my-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
            {page.title}
          </h1>

          <div className="mt-4 flex justify-center">
            <span className="h-1 w-24 rounded-full bg-pink-500" />
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
          <div
            className="space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_li]:mb-2 [&_a]:text-blue-600 [&_a]:hover:underline [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>

        {/* Footer meta */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
          Last updated:{" "}
          {new Date(page.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </footer>
      </div>
    </section>
  );
};

export default FooterPageViewer;
