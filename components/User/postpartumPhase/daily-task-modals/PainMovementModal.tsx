/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";
import FirstStep from "./reusable/FirstStep";
import { 
  useCreatePainMovementLogMutation, 
  useGetPainMovementLogsQuery 
} from "@/redux/features/api/user/postpurtum/painMovementsLogs";
import { toast } from "sonner";

type FormData = {
  painLevel: number;
  painTypes: string[];
  mobility: string;
  notes: string;
  
};

const PAIN_TYPES = [
  "Back pain",
  "C-section incision",
  "Perineal area",
  "Shoulders/neck",
  "Breast/nipple pain",
  "Other",
];

// Map display names to API values
const PAIN_TYPE_MAP: Record<string, string> = {
  "Back pain": "Back",
  "C-section incision": "C-section",
  "Perineal area": "Perineal",
  "Shoulders/neck": "Shoulders",
  "Breast/nipple pain": "Breast",
  "Other": "Other",
};

const MOBILITY_LEVELS = [
  "Difficulty walking",
  "Pain when sitting",
  "Hard to bend",
  "Limited mobility",
  "Normal movement",
];

export default function PainMovementModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing logs
  const { data: logsData } = useGetPainMovementLogsQuery(undefined);
  const [createPainMovementLog] = useCreatePainMovementLogMutation();
  console.log(logsData,"pain")

  const [formData, setFormData] = useState<FormData>({
    painLevel: 2,
    painTypes: [],
    mobility: "Normal movement",
    notes: "",
  });

  // Helper to convert API pain type back to display name
  const convertApiToDisplayPainType = (apiType: string): string => {
    const entry = Object.entries(PAIN_TYPE_MAP).find(([_, api]) => api === apiType);
    return entry ? entry[0] : apiType;
  };

  // Load existing data from GET API
  useEffect(() => {
    if (logsData?.data && logsData.data.length > 0) {
      // Get the most recent log (first item in array)
      const existingLog = logsData.data[0];
      console.log("Loading existing pain log:", existingLog);

      // Check if this is today's log
      const today = new Date().toISOString().split("T")[0];
      const logDate = existingLog.log_date?.split("T")[0];

      if (logDate === today) {
        // Pre-fill form with existing data
        const displayPainTypes = existingLog.discomfort_areas?.map((area: string) =>
          convertApiToDisplayPainType(area)
        ) || [];

        setFormData({
          painLevel: existingLog.pain_level || 2,
          painTypes: displayPainTypes,
          mobility: existingLog.movement_status || "Normal movement",
          notes: existingLog.notes || "",
          
        });

        // toast.info("Loaded today's pain log");
      }
    }
  }, [logsData]);

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

  const setMobility = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      mobility: value,
    }));
  };

  // Build payload for API
  const buildPayload = () => {
    const today = new Date().toISOString().split("T")[0];

    // Convert display names to API values
    const apiPainTypes = formData.painTypes.map(
      (type) => PAIN_TYPE_MAP[type] || type
    );

    return {
      pain_level: formData.painLevel,
      discomfort_areas: apiPainTypes,
      movement_status: formData.mobility,
      notes: formData.notes || "No additional notes",
      tip_shown: getTipBasedOnPain(formData.painLevel, formData.mobility),
      log_date: today,
      
    };
  };

  // Generate dynamic tip based on pain level and mobility
  const getTipBasedOnPain = (painLevel: number, mobility: string): string => {
    if (painLevel >= 7) {
      return "High pain detected. Consider consulting your doctor. Rest and avoid strenuous activities.";
    } else if (painLevel >= 4) {
      return "Moderate pain. Try gentle stretching, warm compress, and take frequent breaks.";
    } else if (mobility.includes("Difficulty") || mobility.includes("Hard")) {
      return "Limited mobility noted. Do gentle stretches and avoid sudden movements.";
    } else {
      return "Great progress! Keep up with light exercises and maintain good posture.";
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const payload = buildPayload();
      console.log("Submitting pain log:", payload);

      await createPainMovementLog(payload).unwrap();

      toast.success("Pain log submitted successfully!");
      next();
    } catch (error: any) {
      console.error("Failed to save pain log", error);

      let errorMessage = "Failed to save pain log. Please try again.";
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
    toast.success("Pain log completed!");
  };

  // Calculate progress percentage
  const totalSteps = 3; // 3 actual steps (excluding intro and success)
  const progressPercentage = (step / totalSteps) * 100;

  function renderStep() {
    switch (step) {
      // STEP 0 — INTRO
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Pain & Movement Log"
            description="Log today's pain and movement comfort to track healing progress."
            buttonText="Start Log"
            onNext={next}
          />
        );

      // STEP 1 — PAIN LEVEL & AREAS
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <ModalHeadingOne
              title="Pain Intensity"
              description="Rate your overall pain level"
            />
            <div className="text-center text-lg font-semibold text-[#229ECF]">
              <div className="w-16 h-16 rounded-full bg-[#229ECF]/10 text-3xl mx-auto flex items-center justify-center">
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
                Where do you feel discomfort today? (select all that apply)
              </p>
              <div className="grid grid-cols-1 gap-1">
                {PAIN_TYPES.map((p) => (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                      formData.painTypes.includes(p)
                        ? "bg-[#229ECF]/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.painTypes.includes(p)}
                      onChange={() => togglePainType(p)}
                      className="accent-[#229ECF]"
                    />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 2 — MOBILITY
      case 2:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Daily Movement Check"
              description="How is your mobility today?"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Movement Status</p>
              {MOBILITY_LEVELS.map((level) => (
                <label
                  key={level}
                  className={`flex items-center gap-2 border border-[#229ECF]/40 p-3 rounded cursor-pointer transition-colors ${
                    formData.mobility === level ? "bg-[#229ECF]/10" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="mobility"
                    checked={formData.mobility === level}
                    onChange={() => setMobility(level)}
                    className="accent-[#229ECF]"
                  />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Additional Notes (Optional)</p>
              <textarea
                className="w-full border rounded p-3 min-h-[80px] text-sm"
                placeholder="e.g., Morning stiffness, Pain after feeding..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, notes: e.target.value }))
                }
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
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit →"}
              </Button>
            </div>
          </div>
        );

      // STEP 3 — SUCCESS
      case 3:
        return (
          <div className="text-center space-y-6">
            <div>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-md font-regular text-gray-900">
                Pain & Movement Summary
              </h3>
            </div>

            <SummeryTable
              items={[
                {
                  label: "Pain Intensity: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold">
                      {formData.painLevel}/10
                    </p>
                  ),
                },
                {
                  label: "Affected Areas: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold">
                      {formData.painTypes.length > 0
                        ? formData.painTypes.join(", ")
                        : "None"}
                    </p>
                  ),
                },
                {
                  label: "Mobility: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold">
                      {formData.mobility}
                    </p>
                  ),
                },
              ]}
            />
            <TipsCard
              tips={getTipBasedOnPain(formData.painLevel, formData.mobility)}
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
        <DialogTitle>Pain & Movement Log</DialogTitle>
      </DialogHeader>

      {/* Progress Bar - Show after intro step */}
      {step > 0 && step < 3 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#229ECF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Full progress on success */}
      {step === 3 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Completed</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {renderStep()}
    </DialogContent>
  );
}