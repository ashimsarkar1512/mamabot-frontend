"use client";

import { useEffect, useState } from "react";

import {
  SmartPersonalizationPayload,
  useGetSmartPersonalizationQuery,
  useUpdateSmartPersonalizationMutation,
} from "@/redux/features/api/user/settings/smartPersonalization";

type Props = {
  activeTab: string;
};
const toggleKeys: (keyof SmartPersonalizationPayload)[] = [
  "motherhood_context",
  "activity_awareness",
  "personalized_nutrition",
  "mood_tracking",
  "voice_feedback",
  "analytics_cookies",
  "two_factor_auth",
];

const selectKeys: Record<keyof SmartPersonalizationPayload, string[]> = {
  AI_tone: ["empathetic", "neutral", "friendly"],
  chatbot_speed: ["slow", "normal", "fast"],
  background_sound: ["disabled", "enabled"],
  reminder_style: ["normal", "calm"],

  motherhood_context: [],
  activity_awareness: [],
  personalized_nutrition: [],
  mood_tracking: [],
  voice_feedback: [],
  analytics_cookies: [],
  two_factor_auth: [],
};

const SmartPersonalization = ({ activeTab }: Props) => {
  const { data, isLoading } = useGetSmartPersonalizationQuery();
  const [updateSettings] = useUpdateSmartPersonalizationMutation();

  const [formState, setFormState] = useState<SmartPersonalizationPayload>({
    AI_tone: "empathetic",
    chatbot_speed: "normal",
    background_sound: "disabled",
    motherhood_context: 0,
    activity_awareness: 1,
    personalized_nutrition: 0,
    reminder_style: "normal",
    mood_tracking: 0,
    voice_feedback: 1,
    analytics_cookies: 0,
    two_factor_auth: 1,
  });

  // Populate state from API GET response
  useEffect(() => {
    if (data?.data) {
      setFormState({
        AI_tone: data.data.AI_tone ?? "empathetic",
        chatbot_speed: data.data.chatbot_speed ?? "normal",
        background_sound: data.data.background_sound ?? "disabled",
        motherhood_context: Number(data.data.motherhood_context ?? 0),
        activity_awareness: Number(data.data.activity_awareness ?? 0),
        personalized_nutrition: Number(data.data.personalized_nutrition ?? 0),
        reminder_style: data.data.reminder_style ?? "normal",
        mood_tracking: Number(data.data.mood_tracking ?? 0),
        voice_feedback: Number(data.data.voice_feedback ?? 0),
        analytics_cookies: Number(data.data.analytics_cookies ?? 0),
        two_factor_auth: Number(data.data.two_factor_auth ?? 0),
      });
    }
  }, [data]);

  const handleToggle = (key: keyof SmartPersonalizationPayload) => {
    const updated = {
      ...formState,
      [key]: formState[key] === 1 || formState[key] === "1" ? 0 : 1,
    };
    setFormState(updated);
    updateSettings(updated).unwrap().catch(console.error);
  };

  const handleSelect = (
    key: keyof SmartPersonalizationPayload,
    value: string,
  ) => {
    const updated = { ...formState, [key]: value };
    setFormState(updated);
    updateSettings(updated).unwrap().catch(console.error);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" ">
      <div className="bg-white/25 border-2  rounded-2xl !border-white mb-8 md:mb-16">
        {/* Header */}
        <div className=" bg-[#DEF0F8] p-6  rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 ">
            Smart Personalization
          </h1>
          <p className="text-sm text-gray-500">
            Choose which reminders, updates, and emails you'd like to receive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {Object.entries(formState).map(([key, value]) => {
            const typedKey = key as keyof SmartPersonalizationPayload;

            // Render toggle
            if (toggleKeys.includes(typedKey)) {
              return (
                <div
                  key={key}
                  className="flex justify-between items-center px-3 md:px-6 py-5 md:py-10 border-b !border-[#DEF0F8]"
                >
                  <p className="text-base font-bold text-gray-800">
                    {key.replace(/_/g, " ")}
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!value}
                      onChange={() => handleToggle(typedKey)}
                      className="sr-only peer"
                    />
                    <div
                      className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border after:rounded-full after:h-5 after:w-5
                    after:transition-all peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                </div>
              );
            }

            // Render select options
            if (selectKeys[typedKey]?.length) {
              return (
                <div
                  key={key}
                  className="flex justify-between items-center px-3 md:px-6 py-5 md:py-10 border-b !border-[#DEF0F8]"
                >
                  <p className="text-base font-bold text-gray-800">
                    {key.replace(/_/g, " ")}
                  </p>
                  <div className="flex gap-2">
                    {selectKeys[typedKey].map((option) => {
                      const isActive = value === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelect(typedKey, option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            isActive
                              ? "bg-white/25 text-[#229ECF] border-2 border-white"
                              : "text-gray-600"
                          }`}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartPersonalization;
