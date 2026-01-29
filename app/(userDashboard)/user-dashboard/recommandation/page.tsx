"use client";
import ProductAndFoodRecommendationsPage from "@/components/User/Recommandation/ProductAndFoodRecommandation";
import RecommendationBannerPage, {
  RecommendationTab,
} from "@/components/User/Recommandation/RecommandationBanner";
import { useState } from "react";

export default function RecommandationPage() {
  const [active, setActive] = useState<RecommendationTab>("all");
  return (
    <div>
      <RecommendationBannerPage active={active} setActive={setActive} />
      <ProductAndFoodRecommendationsPage active={active} />
    </div>
  );
}
