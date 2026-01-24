/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";
import LastModalHeader from "./reusable/LastModalHeader";

type FormData = {
  feedingMethod: string;
  leftSideDuration: number;
  rightSideDuration: number;
  latchQuality: string;
  timeOfFeeding: string;
  lastFeedingTime: number;
};

const babyFeelings = [
  "Breastfeeding",
  "Bottle-feeding (formula)",
  "Bottle-feeding (pumped milk)",
  "Mixed feeding",
];

export default function BabyFeedingModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    feedingMethod: "",
    leftSideDuration: 0,
    rightSideDuration: 0,
    latchQuality: "",
    timeOfFeeding: "",
    lastFeedingTime: 0,
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // BACKEND PLACEHOLDER
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Submitting recovery check:", formData);

    setIsSubmitting(false);
    next(); // go to success screen
  };

  const handleFinish = () => {
    setStep(0);
    setFormData({
      feedingMethod: "",
      leftSideDuration: 0,
      rightSideDuration: 0,
      latchQuality: "",
      timeOfFeeding: "",
      lastFeedingTime: 0,
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
            <h3 className="text-lg font-semibold">Baby Feeding Log</h3>
            <p className="text-sm text-gray-500">
              Record today&apos;s breastfeeding or bottle-feeding details.
            </p>
            <Button
              variant="primary"
              className="px-8 mx-auto rounded-2xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
              onClick={next}
            >
              Start Log
            </Button>
          </div>
        );

      // STEP 1 — ENERGY & MOOD
      case 1:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="How did you feed your baby?"
              description="Select the feeding method"
            />

            <div className="space-y-2 mb-8">
              {babyFeelings.map((v) => (
                <label
                  key={v}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${formData.feedingMethod === v ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="feedingMethod"
                    checked={formData.feedingMethod === v}
                    onChange={() => updateField("feedingMethod", v)}
                  />
                  {v}
                </label>
              ))}
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );
      // STEP 2 — ENERGY & MOOD
      case 2:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="Breastfeeding Details"
              description="Record the session details"
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm font-medium">
                Left side duration (minutes)
              </label>
              <input
                type="number"
                className="bg-[#229ECF]/10 border border-[#229ECF]/40 p-2 rounded"
                value={formData.leftSideDuration}
                onChange={(e) =>
                  updateField("leftSideDuration", Number(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm font-medium">
                Right side duration (minutes)
              </label>
              <input
                type="number"
                className="bg-[#229ECF]/10 border border-[#229ECF]/40 p-2 rounded"
                value={formData.rightSideDuration}
                onChange={(e) =>
                  updateField("rightSideDuration", Number(e.target.value))
                }
              />
            </div>

            <div className="space-y-2 my-8">
              <p className="text-sm font-medium mb-2">Latch quality</p>
              {["Good", "Difficult", "Painful"].map((v) => (
                <label
                  key={v}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${formData.latchQuality === v ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="latchQuality"
                    checked={formData.latchQuality === v}
                    onChange={() => updateField("latchQuality", v)}
                  />
                  {v}
                </label>
              ))}
            </div>

            {/* time of feeding */}
            <div className="flex flex-col gap-2 mb-8">
              <label htmlFor="" className="text-sm font-medium">
                Time of feeding
              </label>
              <input
                type="time"
                className="bg-[#229ECF]/10 border border-[#229ECF]/40 p-2 rounded"
                value={formData.timeOfFeeding}
                onChange={(e) => updateField("timeOfFeeding", e.target.value)}
              />
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 3 — SUCCESS
      case 3:
        return (
          <div className="text-center space-y-6">
            <LastModalHeader title="Feeding Logged" />

            <SummeryTable
              tableTitle="Today's Summery"
              items={[
                {
                  label: "Feeding Method: ",
                  value: (
                    <p className="text-[#229ECF]">{formData.feedingMethod}</p>
                  ),
                },
                {
                  label: "Time: ",
                  value: (
                    <p className="text-[#229ECF]">{formData.timeOfFeeding}</p>
                  ),
                },
                {
                  label: "Left Side: ",
                  value: (
                    <p className="text-[#229ECF]">
                      {formData.leftSideDuration} min
                    </p>
                  ),
                },
                {
                  label: "Right Side: ",
                  value: (
                    <p className="text-[#229ECF]">
                      {formData.rightSideDuration} min
                    </p>
                  ),
                },
                {
                  label: "Latch Quality: ",
                  value: (
                    <p className="text-[#229ECF]">{formData.latchQuality}</p>
                  ),
                },
              ]}
            />
            <div className="flex  items-center gap-2 py-3 px-6 bg-[#229ECF]/10 rounded">
              <AlertCircle className="w-6 h-6 text-[#229ECF]" size={15} />
              <p className="text-gray-500 font-medium text-sm text-left">
                Last feeding was {formData.lastFeedingTime}+ hours ago
              </p>
            </div>
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
