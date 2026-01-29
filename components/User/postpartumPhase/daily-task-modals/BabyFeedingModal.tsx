
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import SummeryTable from "./reusable/SummeryTable";
import LastModalHeader from "./reusable/LastModalHeader";
import FirstStep from "./reusable/FirstStep";
import {
  useCreateFeedingLogMutation,
  useGetFeedingLogsQuery,
} from "@/redux/features/api/user/postpurtum/babyfeeding";
import { toast } from "sonner";

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

// Map display names to backend values
const feedingMethodMap: Record<string, string> = {
  "Breastfeeding": "breastfeeding",
  "Bottle-feeding (formula)": "bottle_formula",
  "Bottle-feeding (pumped milk)": "bottle_pumped",
  "Mixed feeding": "mixed",
};

export default function BabyFeedingModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch logs (optional usage later)
const{data}=useGetFeedingLogsQuery(undefined)

console.log(data,"werweroiuoopipopewrwerwewewr")

const lastFeedingHoursAgo = data?.data?.last_feeding_hours_ago ?? 0;

  const [createFeedingLog] = useCreateFeedingLogMutation();

  const [formData, setFormData] = useState<FormData>({
    feedingMethod: "",
    leftSideDuration: 0,
    rightSideDuration: 0,
    latchQuality: "",
    timeOfFeeding: "",
    lastFeedingTime: 0,
  });

  const next = () => {
    setError(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    setError(null);
    setStep((s) => s - 1);
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const buildPayload = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Convert display name to backend value using the map
    const backendFeedingMethod = feedingMethodMap[formData.feedingMethod] || formData.feedingMethod.toLowerCase();

    return {
      log_date: today,
      feeding_time: `${formData.timeOfFeeding}:00`, // e.g. "14:31:00"
      feeding_method: backendFeedingMethod, // ✅ Now sends "breastfeeding" not "Breastfeeding"
      duration_left: Number(formData.leftSideDuration) || 0,
      duration_right: Number(formData.rightSideDuration) || 0,
      latch_quality: formData.latchQuality.toLowerCase(), // good/difficult/painful
      
    };
  };

  // FINAL API HIT — Done button
 const handleFinish = async () => {
  try {
    setIsSubmitting(true);
    setError(null);

    const payload = buildPayload();
    console.log("Payload to send:", payload); // debug before sending

    await createFeedingLog(payload).unwrap(); // ✅ send object directly

    // Show success toast
    toast.success("Feeding log saved successfully!");

    // Reset form & step on success
    setFormData({
      feedingMethod: "",
      leftSideDuration: 0,
      rightSideDuration: 0,
      latchQuality: "",
      timeOfFeeding: "",
      lastFeedingTime: 0,
    });

    // Small delay before closing to show success
    setTimeout(() => {
      setStep(0);
    }, 300);

  } catch (error: any) {
    console.error("Failed to save feeding log", error);

    // Extract error message from backend response
    let errorMessage = "Failed to save feeding log. Please try again.";

    if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.data?.error) {
      errorMessage = error.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    setError(errorMessage);

    // Show error toast
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Baby Feeding Log"
            description="Record today's breastfeeding or bottle-feeding details."
            buttonText="Start Log"
            onNext={next}
          />
        );

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
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                    formData.feedingMethod === v ? "bg-[#229ECF]/10" : ""
                  }`}
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

      case 2:
        return (
          <div className="space-y-2">
            <ModalHeadingOne
              title="Breastfeeding Details"
              description="Record the session details"
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Left side duration (minutes)
              </label>
              <input
                type="number"
                min="0"
                className="bg-[#229ECF]/10 border border-[#229ECF]/40 p-2 rounded"
                value={formData.leftSideDuration}
                onChange={(e) =>
                  updateField("leftSideDuration", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Right side duration (minutes)
              </label>
              <input
                type="number"
                min="0"
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
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-2 rounded cursor-pointer ${
                    formData.latchQuality === v ? "bg-[#229ECF]/10" : ""
                  }`}
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

            <div className="flex flex-col gap-2 mb-8">
              <label className="text-sm font-medium">Time of feeding</label>
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

      case 3:
        return (
          <div className="text-center space-y-6">
            <LastModalHeader title="Feeding Logged" />

            <SummeryTable
              tableTitle="Today's Summery"
              items={[
                {
                  label: "Feeding Method:",
                  value: (
                    <p className="text-[#229ECF]">{formData.feedingMethod}</p>
                  ),
                },
                {
                  label: "Time:",
                  value: (
                    <p className="text-[#229ECF]">{formData.timeOfFeeding}</p>
                  ),
                },
                {
                  label: "Left Side:",
                  value: (
                    <p className="text-[#229ECF]">
                      {formData.leftSideDuration} min
                    </p>
                  ),
                },
                {
                  label: "Right Side:",
                  value: (
                    <p className="text-[#229ECF]">
                      {formData.rightSideDuration} min
                    </p>
                  ),
                },
                {
                  label: "Latch Quality:",
                  value: (
                    <p className="text-[#229ECF]">{formData.latchQuality}</p>
                  ),
                },
              ]}
            />

            <div className="flex items-center gap-2 py-3 px-6 bg-[#229ECF]/10 rounded">
              <AlertCircle className="w-6 h-6 text-[#229ECF]" />
              <p className="text-gray-500 font-medium text-sm text-left">
                Last feeding was {lastFeedingHoursAgo}+ hours ago
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 py-3 px-6 bg-red-50 rounded border border-red-200">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <p className="text-red-600 font-medium text-sm text-left">
                  {error}
                </p>
              </div>
            )}

            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={handleFinish}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Done"}
              </Button>
            </DialogClose>
          </div>
        );
    }
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle />
      </DialogHeader>
      {renderStep()}
    </DialogContent>
  );
}