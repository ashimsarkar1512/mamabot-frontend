import BlogCard from "@/components/landing/Blog/BlogCard";
import { Article } from "@/redux/features/api/user/AllArticles";
import {
  AffiliateProduct,
  SavedItem,
} from "@/redux/features/api/user/recommandetion/savedItemsGet";

function isArticle(savable: SavedItem["savable"]): savable is Article {
  return (
    savable !== null && "slug" in savable && "short_description" in savable
  );
}
interface SavedArticlesProps {
  articles?: SavedItem[];
}

const SavedArticles = ({ articles }: SavedArticlesProps) => {
  if (!articles?.length) {
    return <p>No saved articles</p>;
  }

  return (
    <section>
      <h1 className="text-primary pb-3 font-semibold text-lg md:text-3xl ">
        Your Saved Articles :
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {articles
          .filter((item): item is SavedItem & { savable: Article } =>
            isArticle(item.savable),
          )
          .map((item) => (
            <BlogCard key={item.id} post={item.savable} categoryTitle="Saved" />
          ))}
      </div>
    </section>
  );
};

export default SavedArticles;
