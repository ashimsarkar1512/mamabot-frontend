/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Heart, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import LastModalHeader from "../../../postpartumPhase/daily-task-modals/reusable/LastModalHeader";
import Link from "next/link";

type MentalHealthData = {
  mood: string;
  energy: string;
  sleep: string;
};

export default function MentalHealthModal() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<MentalHealthData>({
    mood: "",
    energy: "",
    sleep: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <DialogContent className="max-w-md rounded-3xl">
      <DialogHeader className="hidden">
        <DialogTitle>Mental Health Check</DialogTitle>
      </DialogHeader>

      {step === 0 && (
        <FirstStep
          Icon={Heart}
          title="Emotional Wellbeing"
          description="Mood swings are common after childbirth. Checking in with your emotions helps you care for yourself better."
          buttonText="How Do You Feel Today?"
          onNext={next}
        />
      )}

      {step === 1 && (
        <div className="space-y-6">
          <button onClick={back} className="text-sm text-gray-400">
            ← Back
          </button>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Daily Check-in</h3>
            <p className="text-xs text-gray-400">
              Be honest with yourself. There&apos;s no wrong answer.
            </p>
          </div>

          {/* Selection Groups */}
          {[
            {
              label: "Current Mood",
              key: "mood",
              options: ["Calm", "Tired", "Sad", "Overwhelmed", "Anxious"],
            },
            {
              label: "Energy Level",
              key: "energy",
              options: ["Low", "Medium", "Good"],
            },
            {
              label: "Sleep Quality",
              key: "sleep",
              options: ["Poor", "Fair", "Good"],
            },
          ].map((section) => (
            <div key={section.label} className="space-y-2">
              <p className="text-sm font-medium">{section.label}</p>
              <div className="grid grid-cols-2 gap-2">
                {section.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 border p-2 rounded-xl text-sm cursor-pointer border-gray-100"
                  >
                    <input
                      type="radio"
                      name={section.key}
                      checked={(formData as any)[section.key] === opt}
                      onChange={() =>
                        setFormData({ ...formData, [section.key]: opt })
                      }
                      className="accent-[#229ECF]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button className="w-full bg-[#229ECF]! rounded-xl" onClick={next}>
            Submit →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 text-center py-4">
          <LastModalHeader title="Check-in Complete" />
          <div className="bg-[#229ECF]/5 p-6 rounded-xl text-left border border-[#229ECF]/10">
            <p className="text-[#229ECF] text-sm font-semibold mb-1">
              Here&apos;s a thought for you:
            </p>
            <p className="text-gray-600 text-sm">
              It&apos;s great that you&apos;re feeling balanced. Keep
              prioritizing your rest and hydration.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/chatBot"
              className="w-full py-3 rounded-3xl text-white bg-[#229ECF]! flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Talk to Mamabot
            </Link>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-500"
                onClick={() => setStep(0)}
              >
                Back to Recommendations
              </Button>
            </DialogClose>
          </div>
        </div>
      )}
    </DialogContent>
  );
}
