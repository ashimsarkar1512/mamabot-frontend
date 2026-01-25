"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle2, HeartPulse, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import ModalHeadingOne from "../../postpartumPhase/daily-task-modals/reusable/ModalHeadingOne";
import SummeryTable from "../../postpartumPhase/daily-task-modals/reusable/SummeryTable";
import LastModalHeader from "../../postpartumPhase/daily-task-modals/reusable/LastModalHeader";
import FirstStep from "../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import CommonAlert from "../../postpartumPhase/daily-task-modals/reusable/CommonAlert";
import StepControllButtons from "../../postpartumPhase/daily-task-modals/reusable/StepControllButtons";

type HealingCheck = {
  // Step 1
  redness: "None" | "Mild" | "Moderate" | "Severe";
  swelling: boolean;
  warmth: boolean;
  tenderness: boolean;
  // Step 2
  painLevel: number; // 0-10
  sensation: "No pain" | "Mild soreness" | "Pulling" | "Burning" | "Sharp pain";
  // Step 3
  discharge: "None" | "Clear" | "Yellow" | "Blood";
  feverOrChills: boolean;
};

export default function IncisionHealingCheckModal() {
  const [step, setStep] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<HealingCheck>({
    redness: "None",
    swelling: false,
    warmth: false,
    tenderness: false,
    painLevel: 5,
    sensation: "No pain",
    discharge: "None",
    feverOrChills: false,
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const updateField = (field: keyof HealingCheck, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate save / API
    setIsSubmitting(false);
    next(); // go to success screen
  };

  const handleFinish = () => {
    setStep(0);
    setFormData({
      redness: "None",
      swelling: false,
      warmth: false,
      tenderness: false,
      painLevel: 5,
      sensation: "No pain",
      discharge: "None",
      feverOrChills: false,
    });
    // modal closes via DialogClose
  };

  const getHealingSummary = () => {
    const concerns = [];
    if (["Moderate", "Severe"].includes(formData.redness))
      concerns.push(`Redness: ${formData.redness}`);
    if (formData.swelling) concerns.push("Swelling");
    if (formData.warmth) concerns.push("Warmth");
    if (formData.tenderness) concerns.push("Tenderness");
    if (formData.painLevel > 5) concerns.push(`Pain: ${formData.painLevel}/10`);
    if (["Yellow", "Blood"].includes(formData.discharge))
      concerns.push(`Discharge: ${formData.discharge}`);
    if (formData.feverOrChills) concerns.push("Fever/chills");

    return {
      status: concerns.length === 0 ? "Normal healing" : "Monitor closely",
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
      // SCREEN 1: DASHBOARD VIEW
      case -1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <button className="text-gray-400">
                <ArrowLeft size={20} />
              </button>
              <h3 className="font-semibold text-lg">Incision Care</h3>
              <div className="w-5" /> {/* spacer */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-[10px] text-green-600 font-medium">
                  Healing Stage
                </p>
                <p className="text-sm font-bold text-green-700">
                  Normal (Week 4)
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-[10px] text-blue-400 font-medium">
                  Last Checked
                </p>
                <p className="text-sm font-bold text-blue-500">Today</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold">Daily Care Checklist</p>
              {[
                "Clean gently with water",
                "Pat dry (no rubbing)",
                "Wear loose clothing",
                "Keep area ventilated",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl text-sm text-gray-600"
                >
                  <div className="w-4 h-4 border border-blue-300 rounded" />{" "}
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-orange-500">Warning Signs</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-medium">
                <div className="bg-orange-50 text-orange-600 p-2 rounded text-center">
                  Increased redness
                </div>
                <div className="bg-orange-50 text-orange-600 p-2 rounded text-center">
                  Pus or foul smell
                </div>
                <div className="bg-orange-50 text-orange-600 p-2 rounded text-center">
                  Opening of stitches
                </div>
                <div className="bg-orange-50 text-orange-600 p-2 rounded text-center">
                  Fever with pain
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-[#229ECF]! py-6 rounded-xl"
                onClick={next}
              >
                Log Incision Check
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-500 py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone size={16} /> Contact Doctor
              </Button>
            </div>
          </div>
        );

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
              description="Do you notice any of the following?"
            />

            {/* Placeholder for illustration */}
            <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
              Illustration: C-section incision placement
            </div>

            <div className="">
              <h1 className="text-md font-medium mb-2">
                Do you notice any of the following?
              </h1>
              <div className="grid grid-cols-1 gap-1">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={
                      formData.redness === "Moderate" ||
                      formData.redness === "Severe"
                    } // Simplified for checkbox feel, logically connected to redness state
                    onChange={(e) =>
                      updateField(
                        "redness",
                        e.target.checked ? "Moderate" : "None",
                      )
                    } // Simple toggle logic for demo
                    className="accent-[#229ECF]"
                  />
                  Redness around the incision
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.swelling}
                    onChange={(e) => updateField("swelling", e.target.checked)}
                    className="accent-[#229ECF]"
                  />
                  Swelling of the area
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.warmth}
                    onChange={(e) => updateField("warmth", e.target.checked)}
                    className="accent-[#229ECF]"
                  />
                  Warmth around the incision
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.tenderness}
                    onChange={(e) =>
                      updateField("tenderness", e.target.checked)
                    }
                    className="accent-[#229ECF]"
                  />
                  Increased tenderness
                </label>
              </div>
            </div>

            <StepControllButtons back={back} next={next} />
          </div>
        );

      // STEP 2 — Daily Movement Check (pain & sensation)
      case 2:
        return (
          <div className="space-y-6">
            <ModalHeadingOne
              title="Daily Movement Check"
              description="How is your mobility today?"
            />

            <div className="space-y-4">
              <div>
                <div className="mx-auto text-center bg-[#229ECF]/10 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-medium text-[#229ECF] mt-2">
                  {formData.painLevel}
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">No pain</span>
                  <span className="text-sm">Severe Pain</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.painLevel}
                    onChange={(e) =>
                      updateField("painLevel", Number(e.target.value))
                    }
                    className="flex-1 accent-[#229ECF]"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Sensation Check</p>
                <div className="space-y-2">
                  {[
                    "No pain",
                    "Mild soreness",
                    "Pulling",
                    "Burning",
                    "Sharp pain",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        formData.sensation === opt
                          ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formData.sensation === opt}
                        onChange={() => updateField("sensation", opt)}
                        className="accent-[#229ECF]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
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
              description="Check for discharge or fever."
            />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Any discharge?</p>
                <div className="grid grid-cols-2 gap-2">
                  {["None", "Clear", "Yellow", "Blood"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                        formData.discharge === opt
                          ? "bg-[#229ECF]/10 border-[#229ECF]/40"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={formData.discharge === opt}
                        onChange={() => updateField("discharge", opt)}
                        className="accent-[#229ECF]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  Fever or chills today?
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border border-[#229ECF]! text-[#229ECF] rounded-xl"
                    onClick={() => updateField("feverOrChills", true)}
                  >
                    Yes
                  </Button>
                  <Button
                    className={`flex-1 bg-[#229ECF]! border border-[#229ECF]! text-white rounded-xl`}
                    onClick={() => updateField("feverOrChills", false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>

            <CommonAlert alert="Yellow discharge or fever may require medical attention." />

            <StepControllButtons
              back={back}
              next={handleSubmit}
              forwardBtnName="Submit"
            />
          </div>
        );

      // STEP 4 — Success / Summary
      case 4:
        return (
          <div className="space-y-6">
            <LastModalHeader title="Today's Healing Status" />

            <SummeryTable
              tableTitle="Today's Summary"
              items={[
                {
                  label: "Redness:",
                  value: (
                    <span
                      className={
                        ["Moderate", "Severe"].includes(summary.redness)
                          ? "text-red-600"
                          : ""
                      }
                    >
                      {summary.redness}
                    </span>
                  ),
                },
                {
                  label: "Pain:",
                  value: (
                    <span
                      className={formData.painLevel > 5 ? "text-red-600" : ""}
                    >
                      {summary.pain}
                    </span>
                  ),
                },
                {
                  label: "Discharge:",
                  value: (
                    <span
                      className={
                        ["Yellow", "Blood"].includes(summary.discharge)
                          ? "text-red-600"
                          : ""
                      }
                    >
                      {summary.discharge}
                    </span>
                  ),
                },
                {
                  label: "Fever:",
                  value: (
                    <span
                      className={summary.fever === "Yes" ? "text-red-600" : ""}
                    >
                      {summary.fever}
                    </span>
                  ),
                },
              ]}
            />

            <div className="bg-[#229ECF]/10 p-4 rounded space-y-2 text-sm text-gray-700">
              <p className="font-medium text-[#229ECF]">Guidance</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Your incision appears to be healing normally.</li>
                <li>Keep the area clean and dry.</li>
                <li>Avoid tight clothing.</li>
              </ul>
            </div>

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
