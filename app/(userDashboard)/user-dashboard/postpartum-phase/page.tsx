"use client";

import { Heart, MessageCircle, UserCircle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useState } from "react";
import HydrationModal from "@/components/User/UserHome/Modal/HydrationModal";
import BabyMovementModal from "@/components/User/UserHome/Modal/BabyMovementModal";
import GreetingHeader from "@/components/User/postpartumPhase/GreetingHeader";
import Button from "@/components/ui/Button";
import TodaysInsight from "@/components/User/postpartumPhase/TodaysInsight";
import DailyTaskGrid from "@/components/User/postpartumPhase/DailyTaskGrid";
import MothersWellnessEnergy from "@/components/User/postpartumPhase/MothersWellnessEnergy";
import VaginalDeliveryArticles from "@/components/User/postpartumPhase/TopArticlesVaginalDelivery";
import { useGetMyProfileQuery, useGetUserDashboardQuery } from "@/redux/features/api/user/profile";
import { useRouter } from "next/navigation";

// mock data for articles
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

export default function UserHomeDashboard() {
  // This value will come from backend in real app
  const [deliveryType, setDeliveryType] = useState<
    "Vaginal Delivery" | "C-Section"
  >("Vaginal Delivery");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
    const{data:profile}=useGetMyProfileQuery(undefined)
    const week=profile?.data?.current_week
       const router = useRouter();

  const handleClick = () => {
    router.push("/user-dashboard/profile");
  };
  // Mock data – in real app this would come from backend based on deliveryType
  const mockProfile = {
    name: "Sarah",
    stage:
      deliveryType === "Vaginal Delivery"
        ? `Week ${week} Postpartum`
        : `Week ${week} Postpartum (C-Section)`,
    plan: "Free",
    queriesUsed: 4,
    queriesLimit: 10,
  };

  // Mock data - in real app, this would come from backend/user tracking
  const mockDataForInsight = {
    lineText:
      `At ${week} weeks postpartum, it's normal to feel emotional changes. Gentle daily walks and proper hydration can ease recovery. Your baby may also begin making early eye contact.`,
    lastFeeding: "1 hour ago",
    totalSleepHours: "3.8",
    diapers: {
      wet: 4,
      dirty: 2,
    },
    growthStatus: "On track",
  };
  const mockDataForInsight2 = {
    lineText:
      "Your baby is growing well and you're doing great! Keep up the good work and continue to follow the recommended care plan.",
    lastFeeding: "3 hour ago",
    totalSleepHours: "5.2",
    diapers: {
      wet: 6,
      dirty: 4,
    },
    growthStatus: "On track",
  };

  return (
    <div className="min-h-screen mt-8">
      <GreetingHeader deliveryType={deliveryType} />

      {/*   Main Content   */}
      <main className="mx-auto container py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/*    Left Column    */}
          {deliveryType === "Vaginal Delivery" ? (
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Insight */}
              <Card className="px-5 py-7 sm:px-7 lg:px-9 shadow-sm border-2 border-white! bg-sky-50/50">
                <div className="flex gap-5 items-start">
                  <div className="h-11 w-11 rounded-full bg-[#229ECF] flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Today&apos;s Insight
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {mockDataForInsight.lineText}
                    </p>
                  </div>
                </div>
              </Card>

              <TodaysInsight mockData={mockDataForInsight} />

              <DailyTaskGrid deliveryType={deliveryType} />
            </div>
          ) : (
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Insight */}
              <Card className="px-5 py-7 sm:px-7 lg:px-9 shadow-sm border-2 border-white! bg-sky-50/50">
                <div className="flex gap-5 items-start">
                  <div className="h-11 w-11 rounded-full bg-[#229ECF] flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Today&apos;s Insight
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {mockDataForInsight2.lineText}
                    </p>
                  </div>
                </div>
              </Card>

              <TodaysInsight mockData={mockDataForInsight2} />

              <DailyTaskGrid deliveryType={deliveryType} />
            </div>
          )}
          {/*    Right Column - Updated to match screenshot style    */}
          <div className="space-y-5 lg:space-y-6 ">
            {/* Delivery Type Selector */}
            <Card className="p-5 shadow-sm border-2 border-white! bg-sky-50/50 flex flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-[#229ECF]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">Delivery Type</h3>
              </div>

              <div className="relative">
                <select
                  value={deliveryType}
                  onChange={(e) =>
                    setDeliveryType(
                      e.target.value as "Vaginal Delivery" | "C-Section",
                    )
                  }
                  className="w-full appearance-none bg-sky-50/50 border-2 border-sky-100! text-gray-800 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent cursor-pointer"
                >
                  <option>Vaginal Delivery</option>
                  <option>C-Section</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </Card>

            {/* AI Chat Usage */}
            <Card className="p-5 shadow-sm border-2 border-white! bg-sky-50/50 ">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[#229ECF]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">AI Chat Usage</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Queries</span>
                  <span className="font-medium">
                    {mockProfile.queriesUsed}/{mockProfile.queriesLimit}
                  </span>
                </div>

                <Progress
                  value={
                    (mockProfile.queriesUsed / mockProfile.queriesLimit) * 100
                  }
                  className="h-2.5 bg-sky-100"
                  indicatorClassName="bg-[#229ECF]"
                />

                <p className="text-xs text-center text-gray-500 mt-3">
                  Upgrade for <span className="font-medium">Unlimited</span>
                </p>
              </div>
            </Card>

            {/* Profile Summary */}
            <Card className="p-6 shadow-sm border-2 border-white! bg-sky-50/50 ">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-pink-200! hover:border-pink-400 transition-all">
                  <Image
                    src="/images/avatar.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">Profile Summary</h3>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b-2 border-white! pb-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{profile?.data.user.first_name}</span>
                </div>

                <div className="flex justify-between items-center border-b-2 border-white! pb-2">
                  <span className="text-gray-600">Stage:</span>
                  <span className="font-medium">{profile?.data.current_week}</span>
                </div>

                <div className="flex justify-between items-center border-b-2 border-white! pb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">
                   {profile?.data?.user?.subscription_plan}
                  </span>
                </div>
              </div>

              <Button
              onClick={handleClick} 
                variant="outline"
                className="w-full mt-6 bg-transparent rounded-lg border border-[#229ECF]! text-[#229ECF]  flex items-center gap-2"
              >
                <UserCircle size={18} />
                Edit Profile
              </Button>
            </Card>
          </div>
        </div>

        <MothersWellnessEnergy />
        <VaginalDeliveryArticles
          title="Top Articles For Vaginal Delivery"
          articles={ARTICLES_DATA}
        />
      </main>

      <HydrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       
      />
      <BabyMovementModal
        isOpen={isMovementModalOpen}
        onClose={() => setIsMovementModalOpen(false)}
       
      />
    </div>
  );
}
