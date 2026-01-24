/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Activity, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import FirstStep from "../reusable/FirstStep";
import TipsCard from "../reusable/TipsCard";
import SummeryTable from "../reusable/SummeryTable";
import CommonAlert from "../reusable/CommonAlert";

type MovementData = {
  restrictions: string[];
  notes: string;
};

const RESTRICTION_OPTIONS = [
  "I avoided heavy lifting",
  "I avoided sudden bending",
  "I supported my abdomen while standing",
  "I rested when needed",
];

const GUIDANCE_TIPS = [
  "Avoid bending forward suddenly",
  "Avoid twisting your waist",
  "Do not lift items over 5 kg",
  "Limit stair use",
  "Support abdomen when coughing",
];

export default function MovementRestrictionsModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<MovementData>({
    restrictions: [],
    notes: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const toggleRestriction = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.includes(value)
        ? prev.restrictions.filter((v) => v !== value)
        : [...prev.restrictions, value],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Backend Logic Placeholder
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    next();
  };

  const handleFinish = () => {
    setStep(0);
    setFormData({ restrictions: [], notes: "" });
  };

  function renderStep() {
    switch (step) {
      // STEP 0 — INTRO & GUIDANCE
      case 0:
        return (
          <div className="space-y-4">
            <FirstStep
              Icon={Activity}
              title="Movement Restrictions After C-Section"
              description="Your abdominal muscles and incision are still healing. Certain movements can delay recovery."
              buttonText="Continue"
              onNext={next}
            />
            <div className="mt-[-20px]">
              <TipsCard tips={GUIDANCE_TIPS} />
            </div>
          </div>
        );

      // STEP 1 — DAILY TRACKING
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              How Was Your Movement Today?
            </h3>

            <div className="space-y-3">
              {RESTRICTION_OPTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#229ECF]"
                    checked={formData.restrictions.includes(item)}
                    onChange={() => toggleRestriction(item)}
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Optional notes</p>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 min-h-[100px] text-sm bg-gray-50/50"
                placeholder="Any movement that caused discomfort?"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>

            <Button
              className="w-full bg-[#229ECF]! hover:bg-[#229ECF]/80 text-white rounded-xl py-6"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        );

      // STEP 2 — SUCCESS
      case 2:
        return (
          <div className="text-center space-y-8 py-4">
            <div>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">
                Good Job Protecting Your Recovery
              </h3>
            </div>

            <SummeryTable
              items={formData.restrictions.map((r) => ({
                label: r.replace("I avoided ", ""),
                value: (
                  <span className="text-green-600 font-medium">Avoided</span>
                ),
              }))}
            />

            <CommonAlert alert="Following movement restrictions helps prevent incision strain." />

            <DialogClose asChild>
              <Button
                className="w-full bg-[#229ECF]! py-6 rounded-xl"
                onClick={handleFinish}
              >
                Done
              </Button>
            </DialogClose>
          </div>
        );
    }
  }

  return (
    <DialogContent className="max-w-md bg-white rounded-3xl p-8">
      <DialogHeader className="hidden">
        <DialogTitle>Movement Restrictions</DialogTitle>
      </DialogHeader>
      {renderStep()}
    </DialogContent>
  );
}
