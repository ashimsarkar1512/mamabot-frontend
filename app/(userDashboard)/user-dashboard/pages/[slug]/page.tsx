import FooterPageViewer from "@/components/FooterPages";

interface PageProps {
  params: { slug: string };
}

const FooterDynamicPage = ({ params }: PageProps) => {
  const { slug } = params;

  return <FooterPageViewer slug={slug} />;
};

export default FooterDynamicPage;
