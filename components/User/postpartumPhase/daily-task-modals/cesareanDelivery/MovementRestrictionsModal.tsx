/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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
import { useCreateMovementRestrictionMutation, useGetMovementRestrictionsQuery } from "@/redux/features/api/user/postpurtum/movementRestriction";
import { toast } from "sonner";

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

  const { data: movement, isLoading } = useGetMovementRestrictionsQuery(undefined);
  const [createMovement] = useCreateMovementRestrictionMutation();

  const [formData, setFormData] = useState<MovementData>({
    restrictions: [],
    notes: "",
  });

  // Populate form data when movement data is fetched
  useEffect(() => {
    if (movement?.data) {
      const existingRestrictions: string[] = [];
      
      // Map API boolean fields to restriction options
      if (movement.data.avoided_heavy_lifting) {
        existingRestrictions.push("I avoided heavy lifting");
      }
      if (movement.data.avoided_sudden_bending) {
        existingRestrictions.push("I avoided sudden bending");
      }
      if (movement.data.supported_abdomen) {
        existingRestrictions.push("I supported my abdomen while standing");
      }
      if (movement.data.rested_when_needed) {
        existingRestrictions.push("I rested when needed");
      }

      setFormData({
        restrictions: existingRestrictions,
        notes: movement.data.notes || "",
      });
    }
  }, [movement]);

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

  try {
    const payload = {
      log_date: new Date().toISOString().split("T")[0],
      avoided_heavy_lifting: formData.restrictions.includes(
        "I avoided heavy lifting"
      ),
      avoided_sudden_bending: formData.restrictions.includes(
        "I avoided sudden bending"
      ),
      supported_abdomen: formData.restrictions.includes(
        "I supported my abdomen while standing"
      ),
      rested_when_needed: formData.restrictions.includes(
        "I rested when needed"
      ),
      notes: formData.notes,
    };

    await createMovement(payload).unwrap();

    // ✅ SUCCESS TOAST
    toast.success("Movement restrictions saved successfully");

    next();
  } catch (error: any) {
    console.error("Failed to submit movement restrictions:", error);

    // ❌ ERROR TOAST
    toast.error(
      error?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
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

            {isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : (
              <>
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
              </>
            )}
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
                label: r.replace("I avoided ", "").replace("I supported ", "Supported ").replace("I rested ", "Rested "),
                value: (
                  <span className="text-green-600 font-medium">✓ Done</span>
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