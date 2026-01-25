import Button from "@/components/ui/Button";
import Banner from "@/components/User/Recommandation/postpartum-phase/Banner";
import { Heart } from "lucide-react";
import SecontBannerImage from "@/public/images/icon.png";
import Image from "next/image";
import RecoveryDashboardSections from "@/components/User/Recommandation/postpartum-phase/RecoveryDashboardSections";
import VaginalDeliveryArticles from "@/components/User/postpartumPhase/TopArticlesVaginalDelivery";
import HangingAlertCard from "@/components/User/Recommandation/postpartum-phase/HangingAlertCard";

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
const PostpartumPhasePageRecommandation = () => {
  return (
    <div>
      <Banner />
      <div className="mb-8 w-full bg-[#229ECF] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-white space-y-4 flex gap-3">
          <div className="hidden w-12 h-12 rounded-full bg-white/20 md:flex items-center justify-center">
            <Heart size={24} />
          </div>
          <div className="grid grid-cols-1 gap-4 ">
            <h2 className="text-lg md:text-2xl font-semibold">
              Your Most Important Tip for Today
            </h2>

            <p className="text-sm md:text-base text-white/90 ">
              Gentle walking for 10 minutes can improve circulation and reduce
              discomfort. Remember to rest when needed.
            </p>

            <Button
              variant="outline"
              className="bg-transparent w-fit border border-white text-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-[#229ECF] transition"
            >
              View Full Guidance
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="shrink-0 relative hidden md:block">
          <Image
            src={SecontBannerImage}
            alt="Doctor illustration"
            height={100}
            width={100}
          />
        </div>
      </div>
      <RecoveryDashboardSections />
      <HangingAlertCard />
      <VaginalDeliveryArticles
        title="Recommended Articles"
        articles={ARTICLES_DATA}
        headingText="colored"
      />
    </div>
  );
};

export default PostpartumPhasePageRecommandation;
