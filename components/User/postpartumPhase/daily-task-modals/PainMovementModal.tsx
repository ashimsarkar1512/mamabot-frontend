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
import FirstStep from "./reusable/FirstStep";

type FormData = {
  painLevel: number;
  painTypes: string[];
  energy: string;
};

const PAIN_TYPES = [
  "Back pain",
  "C-section incision",
  "Perineal area",
  "Shoulders/neck",
  "Breast/nipple pain",
  "Other",
];

const energyLevels = [
  "Difficulty walking",
  "Pain when sitting",
  "Hard to bend",
  "Limited mobility",
  "Normal movement",
];

export default function PainMovementModal() {
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
          <FirstStep
            Icon={RotateCw}
            title="Pain & Movement Log"
            description="Log today's pain and movement comfort to track healing progress."
            buttonText="Start Log"
            onNext={next}
          />
        );

      // STEP 1 — PAIN
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <ModalHeadingOne
              title="Pain Intensity"
              description="Rate your overall pain level"
            />
            <div className="text-center text-lg font-semibold text-[#229ECF]">
              <div className="w-16 h-16 rounded-full bg-[#229ECF]/10  text-3xl mx-auto flex items-center justify-center">
                {formData.painLevel}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-3 text-gray-500">
                <div>No pain</div>
                <div>Worst pain</div>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={formData.painLevel}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    painLevel: Number(e.target.value),
                  }))
                }
                className="w-full h-2  rounded-full cursor-pointer"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">
                Where do you feel discomfort today? (select all that apply)
              </p>
              <div className="grid grid-cols-1 ">
                {PAIN_TYPES.map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-2 p-2 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.painTypes.includes(p)}
                      onChange={() => togglePainType(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 2 — ENERGY & MOOD
      case 2:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="Daily Movement Check"
              description="How are you mobility today?"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Energy Level</p>
              {energyLevels.map((v) => (
                <label
                  key={v}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${formData.energy === v ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="energy"
                    checked={formData.energy === v}
                    onChange={() => toggleEnergy(v)}
                    className="accent-[#229ECF]"
                  />
                  {v}
                </label>
              ))}
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
                Pain & Movement Summery
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
