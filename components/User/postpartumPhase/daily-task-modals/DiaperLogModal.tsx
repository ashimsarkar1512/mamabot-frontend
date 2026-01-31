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
import { 
  useCreateDiaperLogMutation, 
  useGetDiaperLogsQuery 
} from "@/redux/features/api/user/postpurtum/diaperLog";
import { toast } from "sonner";

type DiaperEntry = {
  type: "wet" | "dirty" | "wet_dirty";
  notes?: string;
};

type DiaperSummary = {
  wet_count: number;
  dirty_count: number;
  total_diapers_today: number;
};

export default function DiaperLogModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing diaper logs
  const { data } = useGetDiaperLogsQuery(undefined);
  const [createDiaperLog] = useCreateDiaperLogMutation();

  const [currentEntry, setCurrentEntry] = useState<DiaperEntry>({
    type: "wet",
    notes: "",
  });

  const [summary, setSummary] = useState<DiaperSummary>({
    wet_count: 0,
    dirty_count: 0,
    total_diapers_today: 0,
  });

  // Load existing data from GET API
  useEffect(() => {
    if (data?.data) {
      console.log("Diaper log data:", data.data);
      setSummary({
        wet_count: data.data.wet_count || 0,
        dirty_count: data.data.dirty_count || 0,
        total_diapers_today: data.data.total_diapers_today || 0,
      });
    }
  }, [data]);

  const next = () => {
    setError(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    setError(null);
    setStep((s) => s - 1);
  };

  const updateType = (type: DiaperEntry["type"]) => {
    setCurrentEntry((prev) => ({ ...prev, type }));
  };

  const updateNotes = (notes: string) => {
    setCurrentEntry((prev) => ({ ...prev, notes }));
  };

  // Build payload for API
  const buildPayload = () => {
  const today = new Date();
const localDate = today.getFullYear() + "-" + 
                  String(today.getMonth() + 1).padStart(2, "0") + "-" +
                  String(today.getDate()).padStart(2, "0");

    return {
      log_date: localDate,
      diaper_type: currentEntry.type,
      notes: currentEntry.notes || null,
      delivery_type: "vaginal", // You might want to get this from user profile
    };
  };

  // Generate tip based on diaper type
  const generateTip = (type: string) => {
    if (type === "wet") {
      return "Good hydration! Baby is urinating regularly.";
    } else if (type === "dirty") {
      return "Healthy digestion! Regular bowel movements are normal.";
    } else {
      return "Complete diaper change logged. Keep tracking!";
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const payload = buildPayload();
      console.log("Submitting diaper log:", payload);

      const response = await createDiaperLog(payload).unwrap();
      console.log("Diaper log saved:", response);

      // Update summary from response
      if (response?.data) {
        setSummary({
          wet_count: response.data.wet_count || summary.wet_count,
          dirty_count: response.data.dirty_count || summary.dirty_count,
          total_diapers_today: response.data.total_diapers_today || summary.total_diapers_today,
        });
      } else {
        // Manually update counts if backend doesn't return updated summary
        const newSummary = { ...summary };
        
        if (currentEntry.type === "wet") {
          newSummary.wet_count += 1;
        } else if (currentEntry.type === "dirty") {
          newSummary.dirty_count += 1;
        } else if (currentEntry.type === "wet_dirty") {
          newSummary.wet_count += 1;
          newSummary.dirty_count += 1;
        }
        
        newSummary.total_diapers_today += 1;
        setSummary(newSummary);
      }

      toast.success("Diaper change logged successfully!");
      next();
    } catch (error: any) {
      console.error("Failed to save diaper log", error);

      // let errorMessage = "Failed to save diaper log. Please try again.";
      // if (error?.data?.message) {
      //   errorMessage = error.data.message;
      // } else if (error?.data?.error) {
      //   errorMessage = error.data.error;
      // } else if (error?.message) {
      //   errorMessage = error.message;
      // }

       const message = "You can only log one diaper entry per day.";
    setError(message);
    toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setStep(0);
    setError(null);
    setCurrentEntry({ type: "wet", notes: "" });
    toast.success("Diaper tracking completed!");
  };

  // Calculate progress percentage (2 steps total: 0=intro, 1=form, 2=success)
  const totalSteps = 2;
  const progressPercentage = (step / totalSteps) * 100;

  // Get health status based on diaper count
  const getHealthStatus = () => {
    const total = summary.total_diapers_today;
    
    if (total >= 6 && total <= 10) {
      return {
        status: "Normal",
        color: "text-green-600",
        message: "Great! This is within the normal range for newborns.",
      };
    } else if (total < 6) {
      return {
        status: "Low",
        color: "text-orange-600",
        message: "Consider monitoring hydration. Consult doctor if concerned.",
      };
    } else {
      return {
        status: "High",
        color: "text-blue-600",
        message: "More than usual but can be normal. Monitor for other symptoms.",
      };
    }
  };

  function renderStep() {
    const healthStatus = getHealthStatus();

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

        
            <div>
              <p className="text-sm font-medium mb-3">Diaper Type</p>
              <div className="space-y-2">
                {[
                  { value: "wet", label: "Wet",  },
                  { value: "dirty", label: "Dirty", },
                  { value: "wet_dirty", label: "Wet + Dirty", },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                      currentEntry.type === option.value
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="diaperType"
                      checked={currentEntry.type === option.value}
                      onChange={() => updateType(option.value as DiaperEntry["type"])}
                      className="mt-1 accent-[#229ECF]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      {/* <div className="text-xs text-gray-500">{option.description}</div> */}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Notes (Optional)
              </label>
              <textarea
                placeholder="e.g., rash noticed, unusual smell, runny stool..."
                value={currentEntry.notes}
                onChange={(e) => updateNotes(e.target.value)}
                className="w-full h-20 p-3 bg-[#229ECF]/5 border border-[#229ECF]/20 rounded resize-none focus:outline-none focus:border-[#229ECF] text-sm"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 py-3 px-4 bg-red-50 rounded border border-red-200">
                <p className="text-red-600 font-medium text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={back}>
                Back
              </Button>
              <Button
                variant="primary"
                className="bg-[#229ECF] text-white"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Entry →"}
              </Button>
            </div>
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
                  label: "💧 Wet:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.wet_count} times
                    </span>
                  ),
                },
                {
                  label: "💩 Dirty:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.dirty_count} times
                    </span>
                  ),
                },
                {
                  label: "📊 Total:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.total_diapers_today} diapers
                    </span>
                  ),
                },
                {
                  label: "Status:",
                  value: (
                    <span className={`font-semibold ${healthStatus.color}`}>
                      {healthStatus.status}
                    </span>
                  ),
                },
              ]}
            />

            <div className="bg-[#229ECF]/5 p-4 rounded-lg border border-[#229ECF]/20 text-left">
              <p className="text-sm font-medium text-[#229ECF] mb-2">
                Health Indicator
              </p>
              <p className="text-sm text-gray-700">{healthStatus.message}</p>
            </div>

            <TipsCard tips="Normal range is 6-8 wet diapers per day for newborns. This indicates good hydration and feeding." />

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
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Diaper Log</DialogTitle>
      </DialogHeader>

      {/* Progress Bar - Show during steps 1-2 */}
      {step > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>
              {step === 1 ? "Add Entry" : "Complete"}
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                step === 2 ? "bg-green-600" : "bg-[#229ECF]"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {renderStep()}
    </DialogContent>
  );
}