"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Apple, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import TipsCard from "../../../postpartumPhase/daily-task-modals/reusable/TipsCard";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import Step from "./reusable2/Step";
import TextShowInList from "./reusable2/TextShowInList";
import StepControllButtons from "@/components/User/postpartumPhase/daily-task-modals/reusable/StepControllButtons";

type FormData = {
  streak: number;
  time: number;
  tip: string;
};

const STEPS = [
  {
    title: "Feeding Basics",
    description: "How often and how much your baby should feed.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 2,
  },
  {
    title: "Sleep Patterns",
    description: "Understand new born sleep cycles and frequent waking",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 7,
  },
  {
    title: "Diaper Expectations",
    description: "What's normal for wet and dirty diapers.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 11,
  },
  {
    title: "Crying & Baby Cues",
    description: "Learn why babies cry and how to respond.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 15,
  },
];
const babyFeedingBasicsData: {
  icon: React.ReactNode;
  title: string;
  description: string[];
}[] = [
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "What's Normal",
    description: [
      "Newborns feed every 2—3 hours",
      "Cluster feeding is common",
      "Feeding patterns vary day to day",
    ],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Signs Baby Is Feeding Well",
    description: [
      "Regular wet diapers",
      "Calm after feeding",
      "Steady weight gain",
    ],
  },
];

// in this modal there will be 3 steps
export default function BabyCareModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    streak: 0,
    time: 0,
    tip: "Consistency strengthens your core and speeds recovery.",
  });

  const next = () => setStep((s) => s + 1);
  const customNext = (num: number) => setStep(num);
  const back = () => setStep((s) => s - 1);

  {
    /* i want when i click on done button the the whole modal will parmanently gone */
  }
  const handleFinish = () => {
    setStep(0);
    setFormData({
      streak: 0,
      time: 0,
      tip: "Consistency strengthens your core and speeds recovery.",
    });
    close();
  };

  function renderStep() {
    switch (step) {
      // STEP 0 — INTRO
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Baby Care Basics"
            description="The first few weeks with your baby can feel overwhelming. Understanding what’s normal helps you feel more confident and calm."
            buttonText="Choose a Topic"
            onNext={next}
          />
        );

      // STEP 1 — PAIN
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-lg font-semibold t">
              What Would You Like To Learn About?{" "}
            </h1>

            <Step steps={STEPS} onNext={customNext} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-2 min-h-[550px] flex flex-col justify-between">
            <TextShowInList
              list={babyFeedingBasicsData}
              title="Baby Feeding Basics"
            />
            <TipsCard
              title=""
              tips="It's normal if your baby wants to feed often, This helps growth and bonding."
            />
            <StepControllButtons
              next={next}
              back={back}
              backBtnName="Back to Baby Care"
              forwardBtnName="Log Baby Feeding"
            />
          </div>
        );

      // STEP 3 — INTRO
      case 3:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Baby Feeding Log"
            description="Record today's breastfeeding or bottle-feeding details."
            buttonText="Add Feeding"
            onNext={next}
          />
        );
    }
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle> </DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}
