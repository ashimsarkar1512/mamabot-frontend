"use client";
import React from "react";
import FooterPageViewer from "@/components/FooterPages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FooterDynamicPage = ({ params }: PageProps) => {
  const { slug } = React.use(params);

  return <FooterPageViewer slug={slug} />;
};

export default FooterDynamicPage;
