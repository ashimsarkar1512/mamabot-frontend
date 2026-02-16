/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeartPulse } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "../reusable/StepControllButtons";
import ModalHeadingOne from "../reusable/ModalHeadingOne";
import SummeryTable from "../reusable/SummeryTable";
import LastModalHeader from "../reusable/LastModalHeader";
import FirstStep from "../reusable/FirstStep";
import CommonAlert from "../reusable/CommonAlert";
import {
  useCreateIncisionHealingCheckMutation,
  useGetIncisionHealingChecksQuery,
} from "@/redux/features/api/user/postpurtum/incisionHealing";
import { toast } from "sonner";

type HealingCheck = {
  // Step 1
  redness: "none" | "mild" | "moderate" | "severe";
  swelling: boolean;
  warmth: boolean;
  tenderness: boolean;
  // Step 2
  painLevel: number; // 0-10
  sensations: string[];
  // Step 3
  discharge: "none" | "clear" | "yellow" | "blood";
  feverOrChills: boolean;
};

const SENSATION_OPTIONS = [
  "itching",
  "burning",
  "pulling",
  "numbness",
  "sharp pain",
];

export default function IncisionHealingCheckModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing data
  const { data } = useGetIncisionHealingChecksQuery(undefined);
  const [createIncisionHealingCheck] = useCreateIncisionHealingCheckMutation();

  const [formData, setFormData] = useState<HealingCheck>({
    redness: "none",
    swelling: false,
    warmth: false,
    tenderness: false,
    painLevel: 0,
    sensations: [],
    discharge: "none",
    feverOrChills: false,
  });

  const [healingStatus, setHealingStatus] = useState("normal");
  const [guidance, setGuidance] = useState("");

  // Load existing data from GET API
  useEffect(() => {
    if (data?.data) {
      const existingLog = data.data;
      console.log("Loading existing incision check:", existingLog);

      // Check if this is today's log
      const today = new Date().toISOString().split("T")[0];
      const logDate = existingLog.log_date?.split("T")[0];

      if (logDate === today) {
        // Pre-fill form with existing data
        setFormData({
          redness: existingLog.redness || "none",
          swelling: existingLog.swelling || false,
          warmth: existingLog.warmth || false,
          tenderness: existingLog.tenderness || false,
          painLevel: existingLog.pain_score || 0,
          sensations: existingLog.sensations || [],
          discharge: existingLog.discharge_type || "none",
          feverOrChills: existingLog.chills_fever || false,
        });

        setHealingStatus(existingLog.healing_status || "normal");
        setGuidance(existingLog.guidance || "");

        // toast.info("Loaded today's incision check");
      }
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

  const updateField = (field: keyof HealingCheck, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSensation = (sensation: string) => {
    setFormData((prev) => ({
      ...prev,
      sensations: prev.sensations.includes(sensation)
        ? prev.sensations.filter((s) => s !== sensation)
        : [...prev.sensations, sensation],
    }));
  };

  // Calculate healing status based on inputs
  const calculateHealingStatus = () => {
    const concerns = [];

    if (["moderate", "severe"].includes(formData.redness)) {
      concerns.push("redness");
    }
    if (formData.swelling) concerns.push("swelling");
    if (formData.warmth) concerns.push("warmth");
    if (formData.painLevel > 6) concerns.push("high pain");
    if (["yellow", "blood"].includes(formData.discharge)) {
      concerns.push("abnormal discharge");
    }
    if (formData.feverOrChills) concerns.push("fever");

    if (concerns.length === 0) {
      return {
        status: "normal",
        guidance:
          "Your incision appears to be healing normally. Keep the area clean and dry. Avoid tight clothing.",
      };
    } else if (concerns.length <= 2) {
      return {
        status: "monitor",
        guidance:
          "Monitor the following symptoms closely. If they worsen, contact your healthcare provider. Apply cold compress twice daily.",
      };
    } else {
      return {
        status: "attention_needed",
        guidance:
          "Multiple concerning signs detected. Please contact your healthcare provider soon for evaluation.",
      };
    }
  };

  // Build payload for API
  const buildPayload = () => {
    const today = new Date().toISOString().split("T")[0];
    const { status, guidance } = calculateHealingStatus();

    return {
      redness: formData.redness,
      swelling: formData.swelling,
      warmth: formData.warmth,
      tenderness: formData.tenderness,
      pain_score: formData.painLevel,
      sensations: formData.sensations,
      discharge_type: formData.discharge,
      chills_fever: formData.feverOrChills,
      healing_status: status,
      guidance: guidance,
      log_date: today,
    };
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const payload = buildPayload();
      console.log("Submitting incision check:", payload);

      const response = await createIncisionHealingCheck(payload).unwrap();
      console.log("Incision check saved:", response);

      // Update local state with response
      if (response?.data) {
        setHealingStatus(response.data.healing_status || "normal");
        setGuidance(response.data.guidance || "");
      }

      toast.success("Incision check submitted successfully!");
      next();
    } catch (error: any) {
      console.error("Failed to save incision check", error);

      let errorMessage = "Failed to save incision check. Please try again.";
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
    toast.success("Incision check completed!");
  };

  // Calculate progress percentage (5 steps total: 0=intro, 1-3=form, 4=success)
  const totalSteps = 5;
  const progressPercentage = (step / totalSteps) * 100;

  const getHealingSummary = () => {
    const concerns = [];
    if (["moderate", "severe"].includes(formData.redness))
      concerns.push(`Redness: ${formData.redness}`);
    if (formData.swelling) concerns.push("Swelling");
    if (formData.warmth) concerns.push("Warmth");
    if (formData.tenderness) concerns.push("Tenderness");
    if (formData.painLevel > 5) concerns.push(`Pain: ${formData.painLevel}/10`);
    if (["yellow", "blood"].includes(formData.discharge))
      concerns.push(`Discharge: ${formData.discharge}`);
    if (formData.feverOrChills) concerns.push("Fever/chills");

    return {
      status: healingStatus,
      redness: formData.redness,
      pain: `${formData.painLevel}/10`,
      discharge: formData.discharge,
      fever: formData.feverOrChills ? "Yes" : "No",
      concerns,
    };
  };

  function renderStep() {
    const summary = getHealingSummary();

    switch (step) {
      // STEP 0 — Intro
      case 0:
        return (
          <FirstStep
            Icon={HeartPulse}
            title="Incision Healing Check"
            description="Your C-section incision needs daily attention. A quick check helps detect early signs of infection and supports safe healing."
            buttonText="Start Check"
            onNext={next}
            alert="Most issues are minor when caught early."
          />
        );

      // STEP 1 — Look at Your Incision (observations)
      case 1:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Look at Your Incision"
              description="Check for visual signs around your incision area"
            />

            {/* Placeholder for illustration */}
            <div className="h-24 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-gray-200">
              📍 C-section incision placement illustration
            </div>

            <div>
              <p className="text-sm font-medium mb-3">
                Do you notice any of the following?
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.swelling}
                    onChange={(e) => updateField("swelling", e.target.checked)}
                    className="accent-[#229ECF] w-4 h-4"
                  />
                  <span className="text-sm">Swelling of the area</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.warmth}
                    onChange={(e) => updateField("warmth", e.target.checked)}
                    className="accent-[#229ECF] w-4 h-4"
                  />
                  <span className="text-sm">Warmth around the incision</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.tenderness}
                    onChange={(e) =>
                      updateField("tenderness", e.target.checked)
                    }
                    className="accent-[#229ECF] w-4 h-4"
                  />
                  <span className="text-sm">Increased tenderness</span>
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">
                Redness severity (if any)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "none", label: "None" },
                  { value: "mild", label: "Mild" },
                  { value: "moderate", label: "Moderate" },
                  { value: "severe", label: "Severe" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.redness === opt.value
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={formData.redness === opt.value}
                      onChange={() => updateField("redness", opt.value)}
                      className="accent-[#229ECF]"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 2 — Pain Check
      case 2:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Pain Check"
              description="How does your incision feel today?"
            />

            <div>
              <p className="text-sm font-medium mb-3">Pain Level</p>
              <div className="mx-auto text-center bg-[#229ECF]/10 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-semibold text-[#229ECF] mb-4">
                {formData.painLevel}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>No pain</span>
                <span>Severe pain</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.painLevel}
                onChange={(e) =>
                  updateField("painLevel", Number(e.target.value))
                }
                className="w-full accent-[#229ECF]"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-3">
                What sensations do you feel? (select all that apply)
              </p>
              <div className="space-y-2">
                {SENSATION_OPTIONS.map((sensation) => (
                  <label
                    key={sensation}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${
                      formData.sensations.includes(sensation)
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.sensations.includes(sensation)}
                      onChange={() => toggleSensation(sensation)}
                      className="accent-[#229ECF] w-4 h-4"
                    />
                    <span className="text-sm capitalize">{sensation}</span>
                  </label>
                ))}
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 3 — Signs of Infection
      case 3:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Signs of Infection"
              description="Check for discharge or fever"
            />

            <div>
              <p className="text-sm font-medium mb-3">Any discharge?</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "none", label: "None" },
                  { value: "clear", label: "Clear" },
                  { value: "yellow", label: "Yellow" },
                  { value: "blood", label: "Blood" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.discharge === opt.value
                        ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={formData.discharge === opt.value}
                      onChange={() => updateField("discharge", opt.value)}
                      className="accent-[#229ECF]"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Fever or chills today?</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField("feverOrChills", true)}
                  className={`flex-1 p-3 border rounded-lg transition-all ${
                    formData.feverOrChills
                      ? "bg-[#229ECF]/10 border-[#229ECF]/40 text-[#229ECF] font-medium"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateField("feverOrChills", false)}
                  className={`flex-1 p-3 border rounded-lg transition-all ${
                    !formData.feverOrChills
                      ? "bg-[#229ECF] border-[#229ECF] text-white font-medium"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {(formData.discharge === "yellow" ||
              formData.discharge === "blood" ||
              formData.feverOrChills) && (
              <CommonAlert alert="Yellow/blood discharge or fever may require medical attention. Please contact your healthcare provider." />
            )}

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

      // STEP 4 — Success / Summary
      case 4:
        return (
          <div className="space-y-6">
            <LastModalHeader title="Today's Healing Status" />

            <SummeryTable
              tableTitle="Summary"
              items={[
                {
                  label: "Status:",
                  value: (
                    <span
                      className={`font-semibold ${
                        healingStatus === "normal"
                          ? "text-green-600"
                          : healingStatus === "monitor"
                            ? "text-orange-600"
                            : "text-red-600"
                      }`}
                    >
                      {healingStatus === "normal"
                        ? "Normal Healing"
                        : healingStatus === "monitor"
                          ? "Monitor Closely"
                          : "Attention Needed"}
                    </span>
                  ),
                },
                {
                  label: "Redness:",
                  value: (
                    <span
                      className={`capitalize ${
                        ["moderate", "severe"].includes(summary.redness)
                          ? "text-red-600 font-semibold"
                          : "text-[#229ECF]"
                      }`}
                    >
                      {summary.redness}
                    </span>
                  ),
                },
                {
                  label: "Pain:",
                  value: (
                    <span
                      className={`${
                        formData.painLevel > 6
                          ? "text-red-600 font-semibold"
                          : "text-[#229ECF]"
                      }`}
                    >
                      {summary.pain}
                    </span>
                  ),
                },
                {
                  label: "Discharge:",
                  value: (
                    <span
                      className={`capitalize ${
                        ["yellow", "blood"].includes(summary.discharge)
                          ? "text-red-600 font-semibold"
                          : "text-[#229ECF]"
                      }`}
                    >
                      {summary.discharge}
                    </span>
                  ),
                },
                {
                  label: "Fever:",
                  value: (
                    <span
                      className={
                        summary.fever === "Yes"
                          ? "text-red-600 font-semibold"
                          : "text-[#229ECF]"
                      }
                    >
                      {summary.fever}
                    </span>
                  ),
                },
              ]}
            />

            <div
              className={`p-4 rounded-lg border ${
                healingStatus === "normal"
                  ? "bg-green-50 border-green-200"
                  : healingStatus === "monitor"
                    ? "bg-orange-50 border-orange-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`font-medium mb-2 ${
                  healingStatus === "normal"
                    ? "text-green-700"
                    : healingStatus === "monitor"
                      ? "text-orange-700"
                      : "text-red-700"
                }`}
              >
                Guidance
              </p>
              <p className="text-sm text-gray-700">{guidance}</p>
            </div>

            <DialogClose asChild>
              <Button className="w-full bg-[#229ECF]" onClick={handleFinish}>
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
        <DialogTitle>Incision Healing Check</DialogTitle>
      </DialogHeader>

      {/* Progress Bar - Show during steps 1-4 */}
      {step > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{step === 4 ? "Complete" : `Step ${step} of 3`}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                step === 4 ? "bg-green-600" : "bg-[#229ECF]"
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
