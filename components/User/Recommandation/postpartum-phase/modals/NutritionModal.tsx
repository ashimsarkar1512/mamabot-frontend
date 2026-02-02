"use client";

import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Apple, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import Step from "./reusable2/Step";
import { 
  useCreateNutritionLogMutation, 
  useGetNutritionLogsQuery 
} from "@/redux/features/api/user/postpurtum/nutration";
import { toast } from "sonner";

// Data matching the second screenshot
const NUTRITION_STEPS = [
  {
    title: "Hydration",
    description: "Drink water frequently, especially if breastfeeding.",
  },
  {
    title: "Protein",
    description: "Eggs, fish, lentils, lean meats for tissue repair.",
  },
  {
    title: "Iron-rich foods",
    description: "Leafy greens, red meat, fortified cereals to replenish blood loss.",
  },
  {
    title: "Fruits and vegetables",
    description: "Fiber prevents constipation and provides vitamins.",
  },
];

export default function NutritionModal() {
  const [step, setStep] = useState(0);

  // API hooks
  const { data, isLoading, error } = useGetNutritionLogsQuery(undefined);
  const [createNutrition, { isLoading: isSubmitting }] = useCreateNutritionLogMutation();

  // Check if today's nutrition log exists
  const todayLog = data?.data?.[0];
  const todayDate = new Date().toISOString().split("T")[0];
  const hasLoggedToday = todayLog?.log_date === todayDate;

  // Show error toast if GET request fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load nutrition logs");
    }
  }, [error]);

  // // Show info toast if already logged today
  // useEffect(() => {
  //   if (hasLoggedToday && !isLoading) {
  //     toast.info("You've already logged your nutrition today!");
  //   }
  // }, [hasLoggedToday, isLoading]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleFinish = async () => {
    // Don't create log if already logged today
    if (hasLoggedToday) {
      toast.info("Already completed for today");
      setStep(0);
      return;
    }

    try {
      await createNutrition({
        log_date: todayDate,
        notes: "Completed nutrition guide review",
        tip: "Drink more water and eat balanced meals",
      }).unwrap();

      // Success toast
      toast.success("Nutrition guide completed successfully!");
      setStep(0);
    } catch (error: any) {
      // Error toast
      const errorMessage = error?.data?.message || error?.message || "Failed to save nutrition log";
      toast.error(errorMessage);
      console.error("Nutrition log error:", error);
    }
  };

  function renderStep() {
    switch (step) {
      // SCREEN 1: Nutrition Intro
      case 0:
        return (
          <FirstStep
            Icon={Apple} 
            title="Postpartum Nutrition"
            description="Proper nutrition supports healing, energy levels, and breastfeeding."
            buttonText={hasLoggedToday ? "Review Nutrition Guide" : "View Nutrition Guide"}
            onNext={next}
          />
        );

      // SCREEN 2: Essential Nutrients
      case 1:
        return (
          <div className="space-y-6 min-h-[500px] flex flex-col">
            {/* Header with Back Button */}
            <div className="flex items-center gap-2 hover:underline">
              <button 
                onClick={back} 
                className="text-gray-500 cursor-pointer flex gap-3"
                disabled={isSubmitting}
              >
                <ArrowLeft /> Back
              </button>
            </div>

            <h1 className="text-xl font-semibold">Essential Nutrients</h1>

            <div className="flex-grow">
              <Step steps={NUTRITION_STEPS} />
            </div>

            <DialogClose asChild>
              <Button 
                className="w-full cursor-pointer" 
                onClick={handleFinish}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Done"}
              </Button>
            </DialogClose>
          </div>
        );
      
      default:
        return null;
    }
  }

  if (isLoading) {
    return (
      <DialogContent className="max-w-md p-8 rounded-3xl">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#229ECF]"></div>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-w-md p-8 rounded-3xl">
      <DialogHeader>
        <DialogTitle className="sr-only">Postpartum Nutrition Guide</DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}