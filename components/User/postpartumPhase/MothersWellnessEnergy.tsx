"use client";

import {
  useCreateMotherWellnessLogMutation,
  useGetMotherWellnessLogsQuery,
} from "@/redux/features/api/user/postpurtum/motherWellnessLog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MoodLevel = "good" | "neutral" | "low";
type EnergyLevel = "good" | "medium" | "low";

const moodLevels: { value: MoodLevel; label: string; emoji: string }[] = [
  { value: "good", label: "Good", emoji: "😄" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "low", label: "Low", emoji: "😔" },
];

const energyLevels: { value: EnergyLevel; label: string }[] = [
  { value: "good", label: "Good" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function MothersWellnessEnergy() {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(
    null,
  );

  const { data: wellness } = useGetMotherWellnessLogsQuery(undefined);
  const [createWellness, { isLoading }] = useCreateMotherWellnessLogMutation();

  console.log(wellness, "wellness");

  // Set initial values from existing data
  useEffect(() => {
    if (wellness?.data) {
      // Check if data is an array
      const dataArray = Array.isArray(wellness.data)
        ? wellness.data
        : [wellness.data];

      const todayLog = dataArray.find((log: any) => {
        const logDate = new Date(log.log_date).toDateString();
        const today = new Date().toDateString();
        return logDate === today;
      });

      if (todayLog) {
        setSelectedMood(todayLog.mood);
        setSelectedEnergy(todayLog.energy_level);
      }
    }
  }, [wellness]);

  const handleMoodSelect = async (mood: MoodLevel) => {
    setSelectedMood(mood);

    // Auto-save when mood is selected
    if (selectedEnergy) {
      await saveWellnessLog(mood, selectedEnergy);
    }
  };

  const handleEnergySelect = async (energy: EnergyLevel) => {
    setSelectedEnergy(energy);

    // Auto-save when energy is selected
    if (selectedMood) {
      await saveWellnessLog(selectedMood, energy);
    }
  };

  const saveWellnessLog = async (mood: MoodLevel, energy: EnergyLevel) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const response = await createWellness({
        log_date: today,
        mood: mood,
        energy_level: energy,
        provider_override: false,
        override_reason: "optional",
      }).unwrap();

      toast.success(response.message || "Wellness log saved successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save wellness log");
    }
  };

  return (
    <div className="w-full mx-auto rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="py-4">
        <div className="flex items-center gap-3">
          <div className="grow">
            <h2 className="pb-3 text-lg font-semibold text-[#229ECF] border-b border-[#229ECF]/40!">
              Mother&apos;s Wellness
            </h2>
            <p className="pt-3 text-sm">How are you feeling today?</p>
          </div>
        </div>
      </div>

      {/* Emoji Cards - Mood Selection */}
      <div className="md:p-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moodLevels.map((item) => (
            <button
              key={item.value}
              onClick={() => handleMoodSelect(item.value)}
              disabled={isLoading}
              className={`
                relative flex flex-col items-center justify-center px-3 md:px-6 py-8 md:py-18 rounded-xl transition-all duration-200
                border-3 border-white! shadow-sm cursor-pointer
                ${
                  selectedMood === item.value
                    ? "border-cyan-500 bg-cyan-100/50 shadow-md"
                    : "border-transparent hover:border-gray-200 bg-gray-50/40 hover:bg-gray-100"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {/* Emoji */}
              <span className="text-3xl md:text-6xl mb-3">{item.emoji}</span>

              {/* Label */}
              <span
                className={`
                  text-base font-medium
                  ${selectedMood === item.value ? "text-cyan-700" : "text-gray-600"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Radio-style selector - Energy Level */}
      <div className="px-6 py-5 rounded-3xl bg-gray-50 border-2 border-white!">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
          <span className="text-base md:text-lg font-medium text-gray-700">
            Energy level
          </span>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
            {energyLevels.map((item) => (
              <label
                key={item.value}
                className={`flex items-center gap-2 cursor-pointer group ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="radio"
                  name="energy"
                  value={item.value}
                  checked={selectedEnergy === item.value}
                  onChange={() => handleEnergySelect(item.value)}
                  disabled={isLoading}
                  className="hidden"
                />
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      selectedEnergy === item.value
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300 group-hover:border-gray-400"
                    }
                  `}
                >
                  {selectedEnergy === item.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`
                    text-sm font-medium
                    ${
                      selectedEnergy === item.value
                        ? "text-cyan-700"
                        : "text-gray-600 group-hover:text-gray-800"
                    }
                  `}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
