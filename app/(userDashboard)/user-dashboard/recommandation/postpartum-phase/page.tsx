"use client"
import Banner from "@/components/User/Recommandation/postpartum-phase/Banner";
import RecoveryDashboardSections from "@/components/User/Recommandation/postpartum-phase/RecoveryDashboardSections";
import VaginalDeliveryArticles from "@/components/User/postpartumPhase/TopArticlesVaginalDelivery";
import HangingAlertCard from "@/components/User/Recommandation/postpartum-phase/HangingAlertCard";
import Guidance from "@/components/User/Recommandation/postpartum-phase/Guidance";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
import { useGetArticlesQuery } from "@/redux/features/api/user/articles/pregnancyArticle";

const ARTICLES_DATA = [
  {
    id: 3,
    title: "Managing Postpartum Bleeding and Cramping",
    description: "What's normal and when to seek medical help...",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400", // Placeholder for medical/health context
  },
  {
    id: 4,
    title: "When to Start Light Exercises",
    description: "Safe timeline for resuming physical activity...",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400", // Placeholder for yoga/fitness
  },
  {
    id: 5,
    title: "Understanding Newborn Sleep Patterns",
    description: "Learn about your baby's sleep cycles and needs...",
    category: "Baby Care",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400", // Placeholder for baby sleeping
  },
  {
    id: 6,
    title: "How to Stay Emotionally Balanced",
    description: "Managing the emotional rollercoaster of new motherhood...",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=400", // Placeholder for emotional support
  },
];
const PostpartumPhasePageRecommandation = () => {
  const {data:profile}=useGetMyProfileQuery(undefined)
   const { data: articlesData, isLoading: articlesLoading } = useGetArticlesQuery(undefined);

     const transformedArticles = articlesData?.data?.map((article: any) => ({
    id: article.id,
    title: article.title,
    description: article.short_description || article.long_description,
    category: article.category?.title || "General",
    image: article.main_img || article.thumb_img || "https://images.unsplash.com/photo-1628191010210-a59074259b3d?auto=format&fit=crop&q=80&w=400",
    slug: article.slug,
    readDuration: article.read_duration,
    week: article.week,
  })) || [];
  return (
    <div>
      <Banner profile={profile} />
      <Guidance />
      <RecoveryDashboardSections />
      <HangingAlertCard />
      <VaginalDeliveryArticles
       title="Recommended Articles"
        articles={transformedArticles}
          isLoading={articlesLoading}
      />
    </div>
  );
};

export default PostpartumPhasePageRecommandation;
