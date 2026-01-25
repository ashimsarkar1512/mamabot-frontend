"use client";

import { useState } from "react";
import { comfortaa } from "@/app/fonts";
type Props = {
  activeTab: string;
};

const Personalization = ({ activeTab }: Props) => {
  const [aiTone, setAiTone] = useState("Empathetic");
  const [chatbotSpeed, setChatbotSpeed] = useState("Normal");
  const [backgroundSound, setBackgroundSound] = useState("Enable");

  return (
    <div
      className={`relative ${comfortaa.className} bg-[#f0f9ff] rounded-2xl p-6 md:p-8 space-y-6 border border-white/30 shadow-sm`}
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Personalization & App Experience
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Adjust Mamabot’s look, tone, and how it interacts with you.
        </p>
      </div>

      {/* AI Tone Style */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
        <div className="flex-1">
          <p className="font-semibold text-gray-800">AI Tone Style</p>
          <p className="text-sm text-gray-500">How Mamabot speaks to you</p>
        </div>
        <div className="relative min-w-[140px] md:min-w-[160px]">
          <select
            value={aiTone}
            onChange={(e) => setAiTone(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option>Empathetic</option>
            {/* Add more options as needed */}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chatbot Speed */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
        <div className="flex-1">
          <p className="font-semibold text-gray-800">Chatbot Speed</p>
          <p className="text-sm text-gray-500">Adjust AI reply pace</p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {["Normal", "Calm", "Fast"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="chatbotSpeed"
                value={option}
                checked={chatbotSpeed === option}
                onChange={(e) => setChatbotSpeed(e.target.value)}
                className="sr-only peer"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  chatbotSpeed === option
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 peer-hover:border-blue-400"
                }`}
              />
              <span
                className={`text-sm md:text-base transition-colors ${
                  chatbotSpeed === option
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Background Sound */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
        <div className="flex-1">
          <p className="font-semibold text-gray-800">Background Sound</p>
          <p className="text-sm text-gray-500">Gentle ambient music</p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {["Enable", "Disabled"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="backgroundSound"
                value={option}
                checked={backgroundSound === option}
                onChange={(e) => setBackgroundSound(e.target.value)}
                className="sr-only peer"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  backgroundSound === option
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 peer-hover:border-blue-400"
                }`}
              />
              <span
                className={`text-sm md:text-base transition-colors ${
                  backgroundSound === option
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Decorative Icon (bottom-right, matching screenshot) */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm border border-white/50">
          {/* Replace with actual icon/SVG from design (chat bubbles + person) */}
          <div className="text-xs text-gray-500">💬👤</div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
