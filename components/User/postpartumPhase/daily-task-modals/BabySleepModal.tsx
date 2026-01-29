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
import { 
  useCreateSleepTrackingMutation, 
  useGetSleepTrackingsQuery 
} from "@/redux/features/api/user/postpurtum/sleepTrackerLog";
import { toast } from "sonner";

type SleepEntry = {
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  type: "nap" | "night";
  quality: "calm" | "restless" | "interrupted";
  notes?: string;
  durationMin: number;
};

type SleepSummary = {
  total: string;
  naps: string;
  night: string;
  timeline: any[];
};

export default function BabySleepTrackingModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing sleep data
  const { data: sleepData, isLoading } = useGetSleepTrackingsQuery(undefined);
  const [createSleepTracking] = useCreateSleepTrackingMutation();
  console.log(sleepData,"sleepdata")

  const [currentSleep, setCurrentSleep] = useState<SleepEntry>({
    startTime: "",
    endTime: "",
    type: "nap",
    quality: "calm",
    notes: "",
    durationMin: 0,
  });

  const [summary, setSummary] = useState<SleepSummary>({
    total: "0 hours",
    naps: "0 sessions",
    night: "0 long stretch",
    timeline: [],
  });

  // Load existing data from GET API
  useEffect(() => {
    if (sleepData?.data) {
      console.log("Sleep data loaded:", sleepData.data);
      setSummary({
        total: sleepData.data.total_sleep_today || "0 hours",
        naps: sleepData.data.naps || "0 sessions",
        night: sleepData.data.night || "0 long stretch",
        timeline: sleepData.data.timeline || [],
      });
    }
  }, [sleepData]);

  const next = () => {
    setError(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    setError(null);
    setStep((s) => s - 1);
  };

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

  // Build payload for API
  const buildPayload = () => {
    const today = new Date().toISOString().split("T")[0];
    
    // Combine date with times
    const startDateTime = `${today} ${currentSleep.startTime}:00`;
    const endDateTime = `${today} ${currentSleep.endTime}:00`;

    return {
      start_time: startDateTime,
      end_time: endDateTime,
      sleep_type: currentSleep.type,
      sleep_quality: currentSleep.quality,
      notes: currentSleep.notes || null,
    };
  };

  const handleSave = async () => {
    // Validation
    if (!currentSleep.startTime || !currentSleep.endTime) {
      setError("Please select both start and end time");
      toast.error("Please select both start and end time");
      return;
    }

    if (currentSleep.durationMin <= 0) {
      setError("End time must be after start time");
      toast.error("End time must be after start time");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = buildPayload();
      console.log("Submitting sleep log:", payload);

      const response = await createSleepTracking(payload).unwrap();
      console.log("Sleep log saved:", response);

      // Update summary if response contains it
      if (response?.data) {
        setSummary({
          total: response.data.total_sleep_today || summary.total,
          naps: response.data.naps || summary.naps,
          night: response.data.night || summary.night,
          timeline: response.data.timeline || summary.timeline,
        });
      }

      toast.success("Sleep session logged successfully!");
      next();
    } catch (error: any) {
      console.error("Failed to save sleep log", error);

      let errorMessage = "Failed to save sleep log. Please try again.";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setStep(0);
    setError(null);
    setCurrentSleep({
      startTime: "",
      endTime: "",
      type: "nap",
      quality: "calm",
      notes: "",
      durationMin: 0,
    });
    toast.success("Sleep tracking completed!");
  };

  // Calculate progress percentage
  const totalSteps = 2;
  const progressPercentage = (step / totalSteps) * 100;

  // Format duration display
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  function renderStep() {
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
                  ? formatDuration(currentSleep.durationMin)
                  : "---"}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Sleep type</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "nap", label: "Nap" },
                  { value: "night", label: "Night Sleep" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 p-3 border rounded cursor-pointer transition-colors ${
                      currentSleep.type === opt.value
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={currentSleep.type === opt.value}
                      onChange={() => updateField("type", opt.value)}
                      className="accent-[#229ECF]"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Quality</p>
              <div className="space-y-2">
                {[
                  { value: "calm", label: "Calm" },
                  { value: "restless", label: "Restless" },
                  { value: "interrupted", label: "Interrupted" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors ${
                      currentSleep.quality === opt.value
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={currentSleep.quality === opt.value}
                      onChange={() => updateField("quality", opt.value)}
                      className="accent-[#229ECF]"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Notes (Optional)</label>
              <textarea
                placeholder="e.g., colic, crying, feeding before sleep..."
                value={currentSleep.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full h-20 p-3 bg-[#229ECF]/5 border border-[#229ECF]/20 rounded resize-none text-sm"
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
                {isSubmitting ? "Saving..." : "Save Session →"}
              </Button>
            </div>
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
                  label: "Total sleep today:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.total}
                    </span>
                  ),
                },
                {
                  label: "Naps:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.naps}
                    </span>
                  ),
                },
                {
                  label: "Night:",
                  value: (
                    <span className="text-[#229ECF] font-semibold">
                      {summary.night}
                    </span>
                  ),
                },
              ]}
            />

            {/* Timeline of recent sessions */}
            {summary.timeline && summary.timeline.length > 0 && (
              <div className="space-y-3 text-left">
                <p className="text-sm font-medium">Recent sessions</p>
                <div className="space-y-2">
                  {summary.timeline.slice(-4).map((session: any, i: number) => (
                    <div
                      key={i}
                      className={`p-3 rounded text-sm flex justify-between items-center ${
                        session.sleep_type === "night" 
                          ? "bg-indigo-50 border border-indigo-100" 
                          : "bg-blue-50 border border-blue-100"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {session.sleep_type === "nap" ? "Nap" : "Night Sleep"}
                        </span>
                        <span className="text-xs text-gray-600">
                          {session.start_time} - {session.end_time}
                        </span>
                      </div>
                      <span className="font-semibold text-[#229ECF]">
                        {session.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TipsCard tips="Newborns typically need 14–17 hours of sleep per day (including naps). Track patterns to understand your baby's sleep needs better." />

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
      <DialogHeader>
        <DialogTitle>Baby Sleep Tracking</DialogTitle>
      </DialogHeader>

      {/* Progress Bar - Show during steps 1-2 */}
      {step > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>
              {step === 1 ? "Add Session" : "Complete"}
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