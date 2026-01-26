"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { DialogContent, DialogClose } from "@/components/ui/dialog";
import Button from "@/components/ui/Button";

// Mock Data
const SAFE_ACTIVITIES = [
  "Short, slow walks (5—10 minutes)",
  "Gentle stretching of arms and legs",
  "Sitting upright with back support",
  "Standing up using side-roll technique",
];

const ACTIVITIES_TO_AVOID = [
  {
    label: "Lifting anything heavier than 5 kg",
    color: "text-[#E74C3C]",
  },
  { label: "Sudden twisting or bending", color: "text-[#E67E22]" },
  { label: "Running or jumping", color: "text-[#E67E22]" },
  { label: "Core or abdominal workouts", color: "text-[#E67E22]" },
  {
    label: "Standing or sitting for very long periods",
    color: "text-[#E67E22]",
  },
];

const SAFE_MOVEMENT_TECHNIQUES = [
  {
    id: 1,
    title: "Getting Out of Bed",
    steps: [
      "Roll onto your side",
      "Use your arms to push up",
      "Swing legs down slowly",
    ],
  },
  {
    id: 2,
    title: "Sitting Down",
    steps: [
      "Keep your back straight",
      "Use arm support if needed",
      "Avoid slouching",
    ],
  },
];

const RECOMMENDED_MOVEMENTS = [
  {
    id: 1,
    title: "1. Walking",
    tips: ["Improves circulation", "Reduces stiffness", "Helps bowel movement"],
  },
  {
    id: 2,
    title: "2. Light Stretching",
    tips: ["Neck and shoulder rolls", "Gentle leg stretches (seated)"],
  },
  {
    id: 3,
    title: "3. Daily Activities",
    tips: ["Feeding your baby", "Light household movement (no lifting)"],
  },
];

export default function MovementMobilityGuide() {
  const [comfortLevel, setComfortLevel] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const handleMarkAsDone = () => {
    setIsDone(true);
    console.log("Movement logged:", { comfortLevel, date: new Date() });
  };

  return (
    <DialogContent className="max-w-4xl w-full h-[95vh] overflow-y-auto p-0 gap-0 rounded-3xl border-none">
      {/* Custom Header Section */}
      <div className="sticky top-0 bg-white z-10 px-6 py-4 flex items-center justify-between ">
        <DialogClose className="p-1 rounded-full hover:bg-gray-100">
          <X size={20} className="text-gray-400" />
        </DialogClose>
      </div>

      <div className="p-8 space-y-10">
        {/* Title Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            Movement & Mobility
          </h2>
          <p className="text-gray-500 mt-1">
            Safe movements and activity guidance tailored to your C-section
            recovery (Week 4)
          </p>
        </section>

        {/* Green Box: What you can Safely Do */}
        <div className="bg-[#E9F7EF] rounded-2xl p-6 border border-[#27AE60]/10">
          <h3 className="text-[#27AE60] font-bold text-lg mb-4">
            What You can Safely Do Today
          </h3>
          <ul className="space-y-3">
            {SAFE_ACTIVITIES.map((item, i) => (
              <li
                key={i}
                className="flex items-start text-[#27AE60] font-medium text-sm"
              >
                <span className="mr-2">•</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-[#27AE60]/70 italic">
            Micro Note: Listen to your body. Stop if you feel pulling or sharp
            pain.
          </p>
        </div>

        {/* Recommended Movements Cards */}
        <section>
          <h3 className="text-lg font-bold mb-4">Recommended Movements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RECOMMENDED_MOVEMENTS.map((move) => (
              <div
                key={move.id}
                className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm"
              >
                <h4 className="font-bold text-sm mb-3">{move.title}</h4>
                <ul className="space-y-2">
                  {move.tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-500 flex items-start"
                    >
                      <span className="mr-2">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Orange Box: Avoid These */}
        <div className="border border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[#E67E22] font-bold">Avoid These for Now</h3>
              <span className="bg-[#FDEDEC] text-[#E74C3C] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Critical
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
            {ACTIVITIES_TO_AVOID.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-medium"
              >
                <span className="text-[#E74C3C]">✕</span>
                <span className={item.color}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#FFF4E5] rounded-xl p-3 flex items-center gap-3">
            <AlertTriangle size={18} className="text-[#E67E22] shrink-0" />
            <p className="text-[11px] text-[#E67E22] font-medium">
              Highlight Note: Your abdominal muscles are still healing
              internally.
            </p>
          </div>
        </div>

        {/* How to Move Safely Section */}
        <section>
          <h3 className="text-lg font-bold mb-4">How to Move Safely</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAFE_MOVEMENT_TECHNIQUES.map((technique) => (
              <div
                key={technique.id}
                className="border border-blue-50 rounded-2xl p-5"
              >
                <h4 className="font-bold text-sm mb-3">{technique.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {technique.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {step}
                      {idx < technique.steps.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Section: Comfort Level */}
        <section className="bg-white border border-blue-50 rounded-2xl p-6">
          <h3 className="text-md font-bold mb-2">Check Your Comfort Level</h3>
          <p className="text-sm font-medium mb-1">
            Did you feel any of the following today?
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Pulling sensation near incision | Sharp pain while moving |
            Increased soreness after walking
          </p>

          <div className="grid grid-cols-3 gap-3">
            {["No discomfort", "Mild discomfort", "Severe pain"].map(
              (level) => (
                <button
                  key={level}
                  onClick={() => setComfortLevel(level)}
                  className={`py-3 px-2 rounded-xl text-xs font-medium border transition-all ${
                    comfortLevel === level
                      ? "bg-[#229ECF] text-white border-[#229ECF]"
                      : "border-blue-100 text-[#229ECF] hover:bg-blue-50"
                  }`}
                >
                  {level}
                </button>
              ),
            )}
          </div>
        </section>

        {/* Quote Block */}
        <div className="bg-[#F0FBFF] rounded-xl p-4 text-center border border-[#229ECF]/10">
          <p className="text-[#229ECF] text-sm font-medium italic">
            &quot;Recovery is not a race. Small, consistent movements help your
            body heal safely.&quot;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <Button
            onClick={handleMarkAsDone}
            className={`w-full py-6 rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition-all bg-[#229ECF]! hover:bg-[#229ECF]/90! hover:text-white !hover:text-white  ${
              isDone
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#229ECF]! hover:bg-[#229ECF]/90!"
            }`}
          >
            {isDone ? <CheckCircle size={20} /> : <CheckCircle size={20} />}
            {isDone ? "Completed for Today" : "Mark Today's Movement as Done"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-[#229ECF] text-[#229ECF] py-6 flex items-center justify-center gap-2"
            >
              <Clock size={18} /> Set Reminder
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-[#229ECF] text-[#229ECF] py-6 flex items-center justify-center gap-2"
              >
                <ChevronLeft size={18} /> Back to Tips
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
