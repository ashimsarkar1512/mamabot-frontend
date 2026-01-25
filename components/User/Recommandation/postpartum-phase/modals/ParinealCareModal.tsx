/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Play, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "../../../postpartumPhase/daily-task-modals/reusable/StepControllButtons";
import ModalHeadingOne from "../../../postpartumPhase/daily-task-modals/reusable/ModalHeadingOne";
import TipsCard from "../../../postpartumPhase/daily-task-modals/reusable/TipsCard";
import SummeryTable from "../../../postpartumPhase/daily-task-modals/reusable/SummeryTable";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import CommonAlert from "@/components/User/postpartumPhase/daily-task-modals/reusable/CommonAlert";
import Step from "./reusable2/Step";
import { title } from "process";

type FormData = {
  streak: number;
  time: number;
  tip: string;
};

const STEPS = [
  {
    title: "Keep the area clean and dry",
    description: "Wash gently with warm water every time you use the bathroom.",
  },
  {
    title: "Use warm sitz baths",
    description: "Soaking for 10-15 minutes can relieve pain and itching,",
  },
  {
    title: "Pat dry gently",
    description: "Avoid rubbing. Use a clean towel or toilet paper to pat dry.",
  },
  {
    title: "Use cold packs",
    description: "Apply for 10-20 minutes to reduce swelling.",
  },
];

// in this modal there will be 3 steps
export default function PelvicFloorExcModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    streak: 0,
    time: 0,
    tip: "Consistency strengthens your core and speeds recovery.",
  });

  const next = () => setStep((s) => s + 1);
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
            title="Pelvic Floor Exercise"
            description="After vaginal delivery, pelvic muscles may feel weak or strained. Gentle daily exercises help restore strength and bladder control."
            buttonText="Start Exercise"
            onNext={next}
          />
        );

      // STEP 1 — PAIN
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-lg font-semibold t">Daily Care Steps</h1>

            <Step steps={STEPS} />
            <TipsCard
              title="Note"
              tips="Mild soreness is normal in early weeks. If pain worsens, contact your doctor."
            />
            <DialogClose asChild>
              <Button className="w-full" onClick={handleFinish}>
                Done
              </Button>
            </DialogClose>
          </div>
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
