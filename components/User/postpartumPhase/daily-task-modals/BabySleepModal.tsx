/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Baby } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import SummeryTable from "./reusable/SummeryTable";
import LastModalHeader from "./reusable/LastModalHeader";
import TipsCard from "./reusable/TipsCard";
import FirstStep from "./reusable/FirstStep";

type SleepEntry = {
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  type: "Nap" | "Night Sleep";
  quality: "Calm" | "Restless" | "Interrupted";
  notes?: string;
  durationMin: number;
};

export default function BabySleepTrackingModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today's sleep sessions (reset on mount or use date-keyed storage in prod)
  const [todaySleeps, setTodaySleeps] = useState<SleepEntry[]>([]);

  const [currentSleep, setCurrentSleep] = useState<SleepEntry>({
    startTime: "",
    endTime: "",
    type: "Nap",
    quality: "Calm",
    notes: "",
    durationMin: 0,
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const updateField = (field: keyof SleepEntry, value: any) => {
    setCurrentSleep((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate duration when both times are set
      if (updated.startTime && updated.endTime) {
        const start = new Date(`1970-01-01T${updated.startTime}:00`);
        const end = new Date(`1970-01-01T${updated.endTime}:00`);
        if (end < start) end.setDate(end.getDate() + 1); // overnight
        const diffMs = end.getTime() - start.getTime();
        updated.durationMin = Math.round(diffMs / 60000);
      }

      return updated;
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate API

    setTodaySleeps((prev) => [...prev, { ...currentSleep }]);

    setIsSubmitting(false);
    next(); // → success
  };

  const handleFinish = () => {
    setStep(0);
    setTodaySleeps([]);
    setCurrentSleep({
      startTime: "",
      endTime: "",
      type: "Nap",
      quality: "Calm",
      notes: "",
      durationMin: 0,
    });
    // modal closes via DialogClose
  };

  const getSummary = () => {
    const totalMin = todaySleeps.reduce((sum, s) => sum + s.durationMin, 0);
    const totalHours = Math.floor(totalMin / 60);
    const totalMins = totalMin % 60;

    const naps = todaySleeps.filter((s) => s.type === "Nap").length;
    const nights = todaySleeps.filter((s) => s.type === "Night Sleep").length;

    return {
      total:
        `${totalHours} hours ${totalMins > 0 ? `${totalMins} min` : ""}`.trim(),
      naps,
      nights,
    };
  };

  function renderStep() {
    const { total, naps, nights } = getSummary();

    switch (step) {
      // STEP 0 — Intro
      case 0:
        return (
          <FirstStep
            Icon={Baby}
            title="Baby Sleep Tracking"
            description="Track your baby's naps and nighttime sleep patterns."
            buttonText="Log Sleep"
            onNext={next}
          />
        );

      // STEP 1 — Add Sleep Session
      case 1:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Add Sleep Session"
              description="Record your baby's sleep details"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Start time</label>
                <input
                  type="time"
                  value={currentSleep.startTime}
                  required
                  onChange={(e) => updateField("startTime", e.target.value)}
                  className="w-full p-2 bg-[#229ECF]/5 border border-[#229ECF]/20 rounded"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">End time</label>
                <input
                  type="time"
                  required
                  value={currentSleep.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  className="w-full p-2 bg-[#229ECF]/5 border border-[#229ECF]/20 rounded"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Duration</label>
              <div className="p-2 bg-gray-50 border rounded text-gray-700">
                {currentSleep.durationMin > 0
                  ? `${Math.floor(currentSleep.durationMin / 60)}h ${currentSleep.durationMin % 60}min`
                  : "---"}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Sleep type</p>
              {["Nap", "Night Sleep"].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                    currentSleep.type === opt
                      ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    checked={currentSleep.type === opt}
                    onChange={() => updateField("type", opt)}
                    className="accent-[#229ECF]"
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Quality</p>
              {["Calm", "Restless", "Interrupted"].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                    currentSleep.quality === opt
                      ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    checked={currentSleep.quality === opt}
                    onChange={() => updateField("quality", opt)}
                    className="accent-[#229ECF]"
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                placeholder="e.g., colic, crying, feeding before sleep..."
                value={currentSleep.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full h-20 p-3 bg-[#229ECF]/5 border border-[#229ECF]/20 rounded resize-none"
              />
            </div>

            <StepControllButtons back={back} next={handleSave} />
          </div>
        );

      // STEP 2 — Success + Summary
      case 2:
        return (
          <div className="text-center space-y-6">
            <LastModalHeader title="Sleep Session Logged" />

            <SummeryTable
              tableTitle="Today's Summary"
              items={[
                {
                  label: "Total sleep today :",
                  value: (
                    <span className="text-[#229ECF] font-medium">{total}</span>
                  ),
                },
                {
                  label: "Naps :",
                  value: (
                    <span className="text-[#229ECF] font-medium">
                      {naps} sessions
                    </span>
                  ),
                },
                {
                  label: "Night :",
                  value: (
                    <span className="text-[#229ECF] font-medium">
                      {nights} {nights === 1 ? "long stretch" : ""}
                    </span>
                  ),
                },
              ]}
            />

            {/* Optional: show recent sessions timeline */}
            {todaySleeps.length > 0 && (
              <div className="space-y-3 text-left">
                <p className="text-sm font-medium">Recent sessions</p>
                <div className="space-y-2">
                  {todaySleeps.slice(-4).map((s, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded text-sm flex justify-between items-center ${
                        s.type === "Night Sleep" ? "bg-pink-50" : "bg-blue-50"
                      }`}
                    >
                      <span>
                        {s.startTime} –{" "}
                        {s.type === "Nap" ? "Nap" : "Night sleep"}
                      </span>
                      <span className="font-medium">
                        {Math.floor(s.durationMin / 60)}h {s.durationMin % 60}
                        min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TipsCard tips="Newborns typically need 14–17 hours of sleep per day (including naps)." />

            <DialogClose asChild>
              <Button
                className="w-full bg-[#229ECF] hover:bg-[#229ECF]/90"
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
    <DialogContent className="max-w-md sm:max-w-lg p-6">
      <DialogHeader className="sr-only">
        <DialogTitle>Baby Sleep Tracking</DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}
