/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Hand, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";
import LastModalHeader from "./reusable/LastModalHeader";
import FirstStep from "./reusable/FirstStep";

type DiaperEntry = {
  type: "Wet" | "Dirty" | "Wet + Dirty";
  notes?: string;
};

export default function DiaperLogModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store today's entries (in real app → load from backend or localStorage)
  const [todayEntries, setTodayEntries] = useState<DiaperEntry[]>([]);

  const [currentEntry, setCurrentEntry] = useState<DiaperEntry>({
    type: "Wet",
    notes: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const updateType = (type: DiaperEntry["type"]) => {
    setCurrentEntry((prev) => ({ ...prev, type }));
  };

  const updateNotes = (notes: string) => {
    setCurrentEntry((prev) => ({ ...prev, notes }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    // Simulate API / persistence delay
    await new Promise((r) => setTimeout(r, 800));

    // Add to today's entries
    setTodayEntries((prev) => [...prev, currentEntry]);

    setIsSubmitting(false);
    next(); // → success screen
  };

  const handleFinish = () => {
    // Reset for next time the modal opens
    setStep(0);
    setTodayEntries([]);
    setCurrentEntry({ type: "Wet", notes: "" });
    // close modal (handled by DialogClose)
  };

  const getSummary = () => {
    const wet = todayEntries.filter((e) =>
      ["Wet", "Wet + Dirty"].includes(e.type),
    ).length;
    const dirty = todayEntries.filter((e) =>
      ["Dirty", "Wet + Dirty"].includes(e.type),
    ).length;
    const total = todayEntries.length;

    return { wet, dirty, total };
  };

  function renderStep() {
    const { wet, dirty, total } = getSummary();

    switch (step) {
      // STEP 0 — Intro / Landing
      case 0:
        return (
          <FirstStep
            Icon={Hand}
            title="Diaper Log"
            description="Track today's wet and dirty diapers to monitor hydration and digestion."
            buttonText="Add Log"
            onNext={next}
          />
        );

      // STEP 1 — Choose type + notes
      case 1:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Add Diaper Entry"
              description="What type of diaper change?"
            />

            <div className="space-y-2 mb-8">
              {(["Wet", "Dirty", "Wet + Dirty"] as const).map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded ${currentEntry.type === option ? "bg-[#229ECF]/10" : ""}`}
                >
                  <input
                    type="radio"
                    name="diaperType"
                    checked={currentEntry.type === option}
                    onChange={() => updateType(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Notes</label>
              <textarea
                placeholder="e.g., rash, unusual smell..."
                value={currentEntry.notes}
                onChange={(e) => updateNotes(e.target.value)}
                className="w-full h-20 p-3 bg-[#229ECF]/10 border border-[#229ECF]/40 rounded resize-none focus:outline-none focus:border-[#229ECF]"
              />
            </div>

            <StepControllButtons back={back} next={handleSave} />
          </div>
        );

      // STEP 2 — Success + Summary
      case 2:
        return (
          <div className="text-center space-y-6">
            <LastModalHeader title="Diaper Change Logged" />

            <SummeryTable
              tableTitle="Today's Summary"
              items={[
                {
                  label: "Wet :",
                  value: (
                    <span className="text-[#229ECF] font-medium">{wet}</span>
                  ),
                },
                {
                  label: "Dirty :",
                  value: (
                    <span className="text-[#229ECF] font-medium">{dirty}</span>
                  ),
                },
                {
                  label: "Total :",
                  value: (
                    <span className="text-[#229ECF] font-medium">{total}</span>
                  ),
                },
              ]}
            />

            <TipsCard tips="Normal range is 6-8 diapers/day." />

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
