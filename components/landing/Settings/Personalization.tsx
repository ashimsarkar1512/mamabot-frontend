
"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCreatePersonalizationMutation, useGetPersonalizationQuery } from "@/redux/features/api/user/settings/personalizeSetting";
import Loading from "@/components/Loading";
import { toast } from "sonner";


type Props = {
  activeTab: string;
};

const Personalization = ({ activeTab }: Props) => {
  // State for your settings
  const [aiTone, setAiTone] = useState("empathetic");
  const [chatbotSpeed, setChatbotSpeed] = useState("normal");
  const [backgroundSound, setBackgroundSound] = useState("enabled");

  // Fetch personalization from API
  const { data, isLoading,  } = useGetPersonalizationQuery(undefined);
  const [createPersonalization, { isLoading: isSaving }] = useCreatePersonalizationMutation();
  console.log(data,"sdhfksdhfks")

  // When API data arrives, set state
  useEffect(() => {
    if (data?.data) {
      setAiTone(data.data.AI_tone || "empathetic");
      setChatbotSpeed(data.data.chatbot_speed || "normal");
      setBackgroundSound(data.data.background_sound || "enabled");
    }
  }, [data]);

const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append("AI_tone", aiTone.toLowerCase());
    formData.append("chatbot_speed", chatbotSpeed.toLowerCase());
    formData.append("background_sound", backgroundSound.toLowerCase());

    // Always POST first (create or update on backend)
    await createPersonalization(formData).unwrap();

    toast.success("Settings saved successfully!");
  } catch (error) {
    console.error("Failed to save settings:", error);
    toast.error("Error saving settings.");
  }
};
  if (isLoading) return <Loading/>;

  return (
    <div className=" bg-white/25 border-2  rounded-2xl !border-white ">
      <div className="">
        <div className=" ">
          {/* Header */}
          <div className=" bg-[#DEF0F8] p-6  rounded-2xl">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 ">
              Personalization & App Experience
            </h1>
            <p className="text-sm text-gray-500">
              Adjust Manobot's look, tone, and how it interacts with you.
            </p>
          </div>

          <div className="w-1/2">
            {/* AI Tone Style */}
            <div className="px-3 md:px-6 py-5 md:py-10 border-b-2 !border-b-[#DEF0F8] flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <label className="block mb-2 w-1/3">
                <span className="text-sm font-medium text-gray-700">
                  AI Tone Style
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  How Manobot speaks to you
                </span>
              </label>
              
              <div className="relative  w-2/3 flex items-center gap-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-sm text-primary text-4xl font-bold pointer-events-none">
                  •
                </span>

                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full pl-10 appearance-none bg-white/25 border-2 !border-white shadow-md rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#229ECF] focus:border-transparent cursor-pointer"
                >
                  <option value="empathetic">Empathetic</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Chatbot Speed */}
            <div className="px-3 md:px-6 py-5 md:py-10 border-b-2 !border-b-[#DEF0F8] flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <label className="block mb-2 w-1/3">
                <span className="text-sm font-medium text-gray-700">
                  Chatbot Speed
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Adjust AI reply pace
                </span>
              </label>

              {[
                { label: "Calm", value: "calm" },
                { label: "Normal", value: "normal" },
                { label: "Fast", value: "fast" }
              ].map((speed) => {
                const isActive = chatbotSpeed === speed.value;
                return (
                  <button
                    key={speed.value}
                    onClick={() => setChatbotSpeed(speed.value)}
                    className={`flex items-center cursor-pointer justify-center gap-2 py-2.5 px-8 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-[#229ECF] bg-white/25 border-2 !border-white shadow-md"
                        : "text-gray-600"
                    }  hover:opacity-80`}
                  >
                    <span
                      className={`text-4xl w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-sm ${
                        isActive ? "text-[#229ECF]" : "text-gray-400"
                      }`}
                    >
                      •
                    </span>
                    {speed.label}
                  </button>
                );
              })}
            </div>

            {/* Background Sound */}
            <div className="px-3 md:px-6 py-5 md:py-10  flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <label className="block mb-2 w-1/3">
                <span className="text-sm font-medium text-gray-700">
                  Background Sound
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Gentle ambient music
                </span>
              </label>
              <div className="flex gap-2 w-2/3">
                {[
                  { label: "Enable", value: "enabled" },
                  { label: "Disabled", value: "disabled" }
                ].map((option) => {
                  const isActive = backgroundSound === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setBackgroundSound(option.value)}
                      className={`flex items-center gap-6 justify-center cursor-pointer hover:opacity-80 py-2.5 px-6 rounded-lg text-sm font-medium transition-all ${
                        backgroundSound === option.value
                          ? "text-[#229ECF] bg-white/25 border-2 !border-white shadow-md"
                          : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`text-4xl w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-sm ${
                          isActive ? "text-[#229ECF]" : "text-gray-400"
                        }`}
                      >
                        •
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="px-6 py-5">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#229ECF] hover:bg-[#1b82b8] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
