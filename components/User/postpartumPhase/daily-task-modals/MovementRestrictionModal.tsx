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
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";

type FormData = {
  streak: number;
  time: number;
  tip: string;
};

const STEPS = [
  "Inhale and relax.",
  "Tighten your pelvic floor muscles.",
  "Hold for 3-5 seconds.",
  "Release and breathe out.",
  "Repeat",
];

// in this modal there will be 3 steps
export default function MovementRestrictionModal() {
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
          <div className="text-center space-y-6 min-h-[350px] flex flex-col items-center justify-center">
            <div className="mx-auto w-15 h-15 rounded-full bg-[#229ECF]/10 border border-[#229ECF]/60! flex items-center justify-center text-[#229ECF] font-bold">
              <RotateCw className="w-10 h-10 animate-pulse text-[#229ECF]" />
            </div>
            <h3 className="text-lg font-semibold">Pelvic Floor Exercise</h3>
            <p className="text-sm text-gray-500">
              Strengthen your pelvic floor with quick Kegel exercises.
            </p>
            <p className="text-sm text-gray-500">
              This helps with bladder control and overall postpartum recovery.
            </p>
            <Button
              variant="primary"
              className="px-8 mx-auto rounded-xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
              onClick={next}
            >
              Start Exercise
            </Button>
          </div>
        );

      // STEP 1 — PAIN
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-center text-lg font-semibold t">
              Kegel Exercise
            </h1>
            <div className="w-fit mx-auto p-1 text-center text-lg font-semibold border-2 border-[#229ECF]/50! rounded-full">
              <div className="w-16 h-16 rounded-full bg-[#229ECF]/10  text-3xl mx-auto flex items-center justify-center ">
                <Play className="w-10 h-10 text-[#229ECF]/60!" />
              </div>
            </div>
            <h1 className="text-center text-3xl font-semibold text-[#229ECF]/80!">
              3.00
            </h1>

            <div>
              <p className="text-sm font-medium mb-2">Steps to follow</p>
              <ul className="space-y-2">
                {STEPS.map((step, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#229ECF]/10 text-[#229ECF] rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-500">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <StepControllButtons
              back={back}
              next={next}
              forwardBtnName="Skip"
            />
          </div>
        );

      // STEP 5 — SUCCESS
      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-sm font-regular">Great Job!</h3>
              <p className="text-sm text-gray-500">
                You finished today&apos;s pelvic floor session.
              </p>
            </div>

            <SummeryTable
              items={[
                {
                  label: "Streak: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold text-md">
                      {formData.streak} days
                    </p>
                  ),
                },
                {
                  label: "Time: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold text-md">
                      {formData.time}
                    </p>
                  ),
                },
              ]}
            >
              <TipsCard tips={formData.tip} />
            </SummeryTable>
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
