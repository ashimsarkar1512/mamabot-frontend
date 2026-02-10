import FooterPageViewer from "@/components/FooterPages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FooterDynamicPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <FooterPageViewer slug={slug} />;
};

export default FooterDynamicPage;
