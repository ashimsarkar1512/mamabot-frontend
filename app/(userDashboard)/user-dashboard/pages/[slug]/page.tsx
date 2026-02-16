import FooterPageViewer from "@/components/FooterPages";
interface PageProps {
  params: { slug: string };
}

export default function FooterDynamicPage({ params }: PageProps) {
  return <FooterPageViewer slug={params.slug} />;
}
