"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
type Props = {
  activeTab: string;
};
const Personalization = ({ activeTab }: Props) => {
  const [aiTone, setAiTone] = useState("Empathetic");
  const [chatbotSpeed, setChatbotSpeed] = useState("Normal");
  const [backgroundSound, setBackgroundSound] = useState("Enable");

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
              {/* <div className="relative w-2/3">
                <span className="text-lg absolute  font-bold text-[#229ECF] bg-white shadow-sm px-1 py-1 rounded-full">•</span>
                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full appearance-none bg-white/25 border-2 !border-white shadow-md rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#229ECF] focus:border-transparent cursor-pointer"
                >
                  <option>Empathetic</option>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div> */}
              <div className="relative  w-2/3 flex items-center gap-2">
                {/* Bullet */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-sm text-primary text-4xl font-bold pointer-events-none">
                  •
                </span>

                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full pl-10 appearance-none bg-white/25 border-2 !border-white shadow-md rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#229ECF] focus:border-transparent cursor-pointer"
                >
                  <option>Empathetic</option>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
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

              {["Calm", "Normal", "Fast"].map((speed) => {
                const isActive = chatbotSpeed === speed;

                return (
                  <button
                    key={speed}
                    onClick={() => setChatbotSpeed(speed)}
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
                    {speed}
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
                {["Enable", "Disabled"].map((option) => {
                  const isActive = backgroundSound === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setBackgroundSound(option)}
                      className={`flex items-center gap-6 justify-center cursor-pointer hover:opacity-80 py-2.5 px-6 rounded-lg text-sm font-medium transition-all ${
                        backgroundSound === option
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
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
