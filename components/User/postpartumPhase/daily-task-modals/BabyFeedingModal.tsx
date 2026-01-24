/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";

type FormData = {
  painLevel: number;
  painTypes: string[];
  energy: string;
};

const babyFeelings = [
  "Breastfeeding",
  "Bottle-feeding (formula)",
  "Bottle-feeding (pumped milk)",
  "Mixed feeding",
];

const energyLevels = [
  "Difficulty walking",
  "Pain when sitting",
  "Hard to bend",
  "Limited mobility",
  "Normal movement",
];

export default function BabyFeedingModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    painLevel: 2,
    painTypes: [],
    energy: "Normal movement",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const togglePainType = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      painTypes: prev.painTypes.includes(value)
        ? prev.painTypes.filter((v) => v !== value)
        : [...prev.painTypes, value],
    }));
  };

  const toggleEnergy = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      energy: prev.energy === value ? "Normal movement" : value,
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
      painLevel: 2,
      painTypes: [],
      energy: "Normal movement",
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
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${formData.energy === v ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="energy"
                    checked={formData.energy === v}
                    onChange={() => toggleEnergy(v)}
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
                defaultValue={0}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm font-medium">
                Right side duration (minutes)
              </label>
              <input
                type="number"
                className="bg-[#229ECF]/10 border border-[#229ECF]/40 p-2 rounded"
                defaultValue={0}
              />
            </div>

            <div className="space-y-2 my-8">
              <p className="text-sm font-medium mb-2">Latch quality</p>
              {["Good", "Difficult", "Painful"].map((v) => (
                <label
                  key={v}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${formData.energy === v ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="energy"
                    checked={formData.energy === v}
                    onChange={() => toggleEnergy(v)}
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
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 3 — SUCCESS
      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-md font-regular text-gray-900">
                Feeding Logged
              </h3>
            </div>

            <SummeryTable
              items={[
                {
                  label: "Pain Intensity: ",
                  value: (
                    <p className="text-[#229ECF]">{formData.painLevel}/10</p>
                  ),
                },
                {
                  label: "Affected Areas: ",
                  value: (
                    <p className="text-[#229ECF]">
                      {formData.painTypes.join(", ")}
                    </p>
                  ),
                },
                {
                  label: "Mobility: ",
                  value: <p className="text-[#229ECF]">{formData.energy}</p>,
                },
              ]}
            />
            <TipsCard
              tips={
                "Gentle stretching, Warm compress, Check posture while feeding, Take frequent breaks, Avoid strenuous activity"
              }
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
