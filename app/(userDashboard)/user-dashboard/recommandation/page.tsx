"use client";
import CommunityRecommendations from "@/components/User/Recommandation/CommunityRecommadation";
import ProductAndFoodRecommendationsPage from "@/components/User/Recommandation/ProductAndFoodRecommandation";
import RecommendationBannerPage, {
  RecommendationTab,
} from "@/components/User/Recommandation/RecommandationBanner";
import RecommendedReading from "@/components/User/Recommandation/RecommandedReading";
import WellnessActivities from "@/components/User/Recommandation/WellnessActivites";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
import { useState } from "react";

export default function RecommandationPage() {
    const {data:profile}=useGetMyProfileQuery(undefined)
   console.log(profile,"profile get")
  const [active, setActive] = useState<RecommendationTab>("all");
  return (
    <div>
      <RecommendationBannerPage active={active} setActive={setActive} />
      <ProductAndFoodRecommendationsPage active={active} />
      <WellnessActivities/>
      <RecommendedReading profile={profile}/>
      <CommunityRecommendations profile={profile}/>
    </div>
  );
}
