import Banner from "@/components/User/Recommandation/postpartum-phase/Banner";
import VaginalDeliveryArticles from "@/components/User/postpartumPhase/TopArticlesVaginalDelivery";
import HangingAlertCard from "@/components/User/Recommandation/postpartum-phase/HangingAlertCard";
import Guidance from "@/components/User/Recommandation/postpartum-phase/Guidance";
import RecoveryDashboardTwo from "@/components/User/Recommandation/cesarean-delivery/RecoveryDashboardTwo";

const ARTICLES_DATA = [
  {
    id: 1,
    title: "How to Speed Up Vaginal Delivery Recovery",
    description: "Expert tips for faster healing after natural birth...",
    category: "Recovery",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", // Placeholder for Recovery Tips graphic
  },
  {
    id: 2,
    title: "Pelvic Floor Care After Birth",
    description: "Essential exercises to strengthen your pelvic floor...",
    category: "Exercise",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400", // Placeholder for Anatomy graphic
  },
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
      "https://images.unsplash.com/photo-1523294587484-5b553497b2c9?auto=format&fit=crop&q=80&w=400", // Placeholder for baby sleeping
  },
  {
    id: 6,
    title: "How to Stay Emotionally Balanced",
    description: "Managing the emotional rollercoaster of new motherhood...",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1494173853114-8a1768853a47?auto=format&fit=crop&q=80&w=400", // Placeholder for emotional support
  },
];
const CesareanDeliveryPageRecommandation = () => {
  return (
    <div>
      <Banner />
      <Guidance />
      <RecoveryDashboardTwo />
      <HangingAlertCard />
      <VaginalDeliveryArticles
        title="Recommended Articles"
        articles={ARTICLES_DATA}
        headingText="colored"
      />
    </div>
  );
};

export default CesareanDeliveryPageRecommandation;
