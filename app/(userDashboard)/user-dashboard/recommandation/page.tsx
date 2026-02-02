"use client";
import CommunityRecommendations from "@/components/User/Recommandation/CommunityRecommadation";
import ProductAndFoodRecommendationsPage from "@/components/User/Recommandation/ProductAndFoodRecommandation";
import RecommendationBannerPage, {
  RecommendationTab,
} from "@/components/User/Recommandation/RecommandationBanner";
import RecommendedReading from "@/components/User/Recommandation/RecommandedReading";
import WellnessActivities from "@/components/User/Recommandation/WellnessActivites";
import { useState } from "react";

export default function RecommandationPage() {
  const [active, setActive] = useState<RecommendationTab>("all");
  return (
    <div>
      <RecommendationBannerPage active={active} setActive={setActive} />
      <ProductAndFoodRecommendationsPage active={active} />
      <WellnessActivities/>
      <RecommendedReading/>
      <CommunityRecommendations/>
    </div>
  );
}
