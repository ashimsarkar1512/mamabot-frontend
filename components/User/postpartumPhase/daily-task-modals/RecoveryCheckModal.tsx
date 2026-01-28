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
import SummeryTable from "./reusable/SummeryTable";
import FirstStep from "./reusable/FirstStep";
import {
  useCreateRecoveryLogMutation,
  useGetRecoveryLogsQuery,
} from "@/redux/features/api/user/postpurtum/recoverylogs";
import { toast } from "sonner";

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

const ENERGY_LEVELS = [
  { value: "very-low", label: "Very Low" },
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "good", label: "Good" },
  { value: "high", label: "High" },
];

export default function RecoveryCheckModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch logs (optional usage later)
  useGetRecoveryLogsQuery(undefined);

  const [createRecoveryLog] = useCreateRecoveryLogMutation();

  const [formData, setFormData] = useState<FormData>({
    painLevel: 2,
    painTypes: [],
    bleeding: "none",
    clots: false,
    energy: "normal",
    moods: [],
    notes: "",
  });

  const next = () => {
    setError(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    setError(null);
    setStep((s) => s - 1);
  };

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

  const setEnergyLevel = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      energy: value as FormData["energy"],
    }));
  };

  // Build payload to match Postman format
  const buildPayload = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      pain_range: formData.painLevel,
      pain_type: formData.painTypes,
      bleeding_today: formData.bleeding.charAt(0).toUpperCase() + formData.bleeding.slice(1), // Capitalize
      clots_present: formData.clots,
      energy_level: formData.energy.charAt(0).toUpperCase() + formData.energy.slice(1).replace("-", " "), // "Very Low", "Normal", etc.
      mood: formData.moods,
      notes: formData.notes,
      log_date: today,
    };
  };
const handleSubmit = async () => {
  try {
    setIsSubmitting(true);
    setError(null);

    const payload = buildPayload();
    console.log("Payload to send:", payload); // Debug log

    await createRecoveryLog(payload).unwrap();

    // Success toast
    toast.success("Recovery log submitted successfully!");

    // Move to success screen
    next();
  } catch (error: any) {
    console.error("Failed to save recovery log", error);

    let errorMessage = "Failed to save recovery log. Please try again.";

    if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.data?.error) {
      errorMessage = error.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    setError(errorMessage);

    // Error toast
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

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
  setError(null);

  // Optional toast when done
  toast.success("Recovery check completed!");
};

  // Calculate progress percentage
  const totalSteps = 5;
  const progressPercentage = (step / totalSteps) * 100;

  function renderStep() {
    switch (step) {
      // STEP 0 — INTRO
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Track Your Recovery"
            description="Track today's pain, bleeding, stitches, and overall energy. This helps us monitor your healing and give personalized guidance."
            buttonText="Start Recovery Check"
            onNext={next}
          />
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
                className="w-full h-2 rounded-full cursor-pointer"
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
                    className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                      formData.painTypes.includes(p) ? "bg-[#229ECF]/10" : ""
                    }`}
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
                className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                  formData.bleeding === v ? "bg-[#229ECF]/10" : ""
                }`}
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

            <label className="flex items-center gap-2 mb-8 cursor-pointer">
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

            <div className="space-y-2 mb-8">
              <p className="text-sm font-medium mb-2">Energy Level</p>
              {ENERGY_LEVELS.map((energyOption) => (
                <label
                  key={energyOption.value}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                    formData.energy === energyOption.value
                      ? "bg-[#229ECF]/10"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="energy-level"
                    checked={formData.energy === energyOption.value}
                    onChange={() => setEnergyLevel(energyOption.value)}
                  />
                  {energyOption.label}
                </label>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium mb-2">
                Mood (select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {MOODS.map((m) => (
                  <label
                    key={m}
                    className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                      formData.moods.includes(m) ? "bg-[#229ECF]/10" : ""
                    }`}
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

            {error && (
              <div className="flex items-center gap-2 py-3 px-6 bg-red-50 rounded border border-red-200">
                <p className="text-red-600 font-medium text-sm text-left">
                  {error}
                </p>
              </div>
            )}

            <div className="flex justify-between px-10">
              <Button variant="outline" onClick={back}>
                Back
              </Button>
              <Button
                variant="primary"
                className=" bg-[#229ECF] text-white"
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

            <SummeryTable
              items={[
                {
                  label: "Pain Level: ",
                  value: <p>{formData.painLevel}/10</p>,
                },
                {
                  label: "Bleeding: ",
                  value: <p>{formData.bleeding}</p>,
                },
                {
                  label: "Energy: ",
                  value: <p>{formData.energy}</p>,
                },
                {
                  label: "Mood: ",
                  value: <p>{formData.moods.join(", ") || "Not specified"}</p>,
                },
                {
                  label: "Clots: ",
                  value: <p>{formData.clots ? "Present" : "Absent"}</p>,
                },
              ]}
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
        <DialogTitle>Recovery Check</DialogTitle>
      </DialogHeader>

      {/* Progress Bar - Only show after step 0 */}
      {step > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#229ECF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {renderStep()}
    </DialogContent>
  );
}