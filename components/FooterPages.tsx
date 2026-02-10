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
    <section
      className={`bg-gradient-to-b from-pink-50 to-white ${comfortaa.className}`}
    >
      <div className=" px-4 mt-5 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <header className="mb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
            {page.title}
          </h1>

          <div className="mt-4 flex justify-center">
            <span className="h-1 w-24 rounded-full bg-pink-500" />
          </div>
        </header>

        {/* Content Card */}
        <article className="bg-white rounded-2xl shadow-sm border !border-pink-100 p-6 sm:p-10">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>

        {/* Footer meta (optional) */}
        <footer className="mt-12 text-center text-sm text-gray-500">
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
