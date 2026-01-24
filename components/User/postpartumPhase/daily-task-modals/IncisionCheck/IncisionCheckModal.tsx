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
import StepControllButtons from "../reusable/StepControllButtons";
import ModalHeadingOne from "../reusable/ModalHeadingOne";

type FormData = {
  painLevel: number;
  painTypes: string[];
  bleeding: "none" | "light" | "moderate" | "heavy";
  clots: boolean;
  energy: "very-low" | "low" | "normal" | "good" | "high";
  moods: string[];
  notes: string;
};

const PAIN_TYPES = [
  "Incision pain",
  "Abdominal pain",
  "Back pain",
  "Headache",
  "Other",
];

const MOODS = [
  "Calm",
  "Tired",
  "Overwhelmed",
  "Emotional",
  "Happy",
  "Anxious",
  "Sad",
  "Irritated",
];

export default function IncisionCheckModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    painLevel: 2,
    painTypes: [],
    bleeding: "none",
    clots: false,
    energy: "normal",
    moods: [],
    notes: "",
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

  const toggleMood = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(value)
        ? prev.moods.filter((v) => v !== value)
        : [...prev.moods, value],
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

  {
    /* i want when i click on done button the the whole modal will parmanently gone */
  }
  const handleFinish = () => {
    setStep(0);
    setFormData({
      painLevel: 2,
      painTypes: [],
      bleeding: "none",
      clots: false,
      energy: "normal",
      moods: [],
      notes: "",
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
            <h3 className="text-lg font-semibold">Track Your Recovery</h3>
            <p className="text-sm text-gray-500">
              Track today&apos;s pain, bleeding, stitches, and overall energy.
              This helps us monitor your healing and give personalized guidance.
            </p>
            <Button
              variant="primary"
              className="px-8 mx-auto rounded-2xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
              onClick={next}
            >
              Start Recovery Check
            </Button>
          </div>
        );

      // STEP 1 — PAIN
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <ModalHeadingOne
              title="Pain Level"
              description="How would you rate your pain today?"
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
                Pain types (select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PAIN_TYPES.map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-2 border p-2 rounded cursor-pointer"
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

      // STEP 2 — BLEEDING
      case 2:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="Bleeding Today"
              description="Monitoring bleeding helps ensure you're healing safely."
            />

            {["none", "light", "moderate", "heavy"].map((v) => (
              <label
                key={v}
                className="flex items-center gap-2 border border-[#229ECF]/40! p-2 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="bleeding"
                  checked={formData.bleeding === v}
                  onChange={() =>
                    setFormData((p) => ({ ...p, bleeding: v as any }))
                  }
                />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}

            <label className="flex items-center gap-2 mb-8">
              <input
                type="checkbox"
                checked={formData.clots}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, clots: e.target.checked }))
                }
              />
              Clots present
            </label>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 3 — ENERGY & MOOD
      case 3:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="Energy & Mood"
              description="How are you feeling today?"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Energy Level</p>
              {["very-low", "low", "normal", "good", "high"].map((v) => (
                <label
                  key={v}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <input
                    type="radio"
                    name="energy"
                    checked={formData.energy === v}
                    onChange={() =>
                      setFormData((p) => ({ ...p, energy: v as any }))
                    }
                  />
                  {v}
                </label>
              ))}
            </div>

            <div className="my-8">
              <p className="text-sm font-medium mb-2">
                Mood (select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {MOODS.map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 border p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={formData.moods.includes(m)}
                      onChange={() => toggleMood(m)}
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 4 — NOTES
      case 4:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Anything unusual today?"
              description="Note any symptoms like swelling, incision concerns, dizziness, etc."
            />

            <textarea
              className="w-full border rounded p-3 min-h-[120px]"
              placeholder="Enter any additional notes or concerns..."
              value={formData.notes}
              onChange={(e) =>
                setFormData((p) => ({ ...p, notes: e.target.value }))
              }
            />

            <div className="flex gap-3">
              <Button variant="outline" onClick={back}>
                Back
              </Button>
              <Button
                variant="primary"
                className="w-full bg-[#229ECF]! text-white!"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit →"}
              </Button>
            </div>
          </div>
        );

      // STEP 5 — SUCCESS
      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-sm font-regular text-green-600">
                Here&apos;s your recovery insight for today
              </h3>
            </div>

            <div className="text-sm text-left border border-[#229ECF]/40! rounded p-4 space-y-2">
              <div className="flex justify-between items-center border-b border-[#229ECF]/40! p-2">
                <p className="text-gray-500">Pain Level: </p>
                <p>{formData.painLevel}/10</p>
              </div>
              <div className="flex justify-between items-center border-b border-[#229ECF]/40! p-2">
                <p className="text-gray-500">Bleeding: </p>
                <p>{formData.bleeding}</p>
              </div>
              <div className="flex justify-between items-center border-b border-[#229ECF]/40! p-2">
                <p className="text-gray-500">Energy: </p>
                <p>{formData.energy}</p>
              </div>
              <div className="flex justify-between items-center border-b border-[#229ECF]/40! p-2">
                <p className="text-gray-500">Mood: </p>
                <p>{formData.moods.join(", ") || "Not specified"}</p>
              </div>
              <div className="flex justify-between items-center  p-2">
                <p className="text-gray-500">Clots: </p>
                <p>{formData.clots ? "Present" : "Absent"}</p>
              </div>
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
        <DialogTitle>Recovery Check</DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}
