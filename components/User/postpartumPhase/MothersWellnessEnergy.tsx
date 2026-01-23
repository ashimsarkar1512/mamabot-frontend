"use client";

import { ClipboardList } from "lucide-react";
import { useState } from "react";

type EnergyLevel = "good" | "neutral" | "low";

const energyLevels: { value: EnergyLevel; label: string; emoji: string }[] = [
  { value: "good", label: "Good", emoji: "😄" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "low", label: "Low", emoji: "😔" },
];

export default function MothersWellnessEnergy() {
  const [selected, setSelected] = useState<EnergyLevel>("good");

  return (
    <div className="w-full  mx-auto bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="py-4 ">
        <div className="flex items-center gap-3">
          <div className="grow">
            <h2 className="pb-3 text-lg font-semibold text-[#229ECF] border-b border-[#229ECF]/40!">
              Mother&apos;s Wellness
            </h2>
            <p className="pt-3 text-sm ">How are you feeling today?</p>
          </div>
        </div>
      </div>

      {/* Emoji Cards */}
      <div className="p-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          {energyLevels.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelected(item.value)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200
                border-2 border-white! shadow-sm
                ${
                  selected === item.value
                    ? "border-cyan-500 bg-cyan-50/60 shadow-md"
                    : "border-transparent hover:border-gray-200 bg-gray-50/40 hover:bg-gray-100"
                }
              `}
            >
              {/* Emoji */}
              <span className="text-5xl md:text-6xl mb-3">{item.emoji}</span>

              {/* Label */}
              <span
                className={`
                  text-base font-medium
                  ${selected === item.value ? "text-cyan-700" : "text-gray-600"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Radio-style selector */}
      <div className="px-6 py-5 rounded-3xl bg-gray-50">
        <div className="flex items-center  gap-10">
          <span className="text-sm font-medium text-gray-700">
            Energy level
          </span>

          <div className="flex items-center gap-10">
            {energyLevels.map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="energy"
                  value={item.value}
                  checked={selected === item.value}
                  onChange={() => setSelected(item.value)}
                  className="hidden"
                />
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      selected === item.value
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300 group-hover:border-gray-400"
                    }
                  `}
                >
                  {selected === item.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`
                    text-sm font-medium
                    ${
                      selected === item.value
                        ? "text-cyan-700"
                        : "text-gray-600 group-hover:text-gray-800"
                    }
                  `}
                >
                  {item.label === "Good" ? "Good" : item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
