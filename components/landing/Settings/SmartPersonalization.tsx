"use client";

import { useState } from "react";
import { BellOffIcon } from "lucide-react";
import {
  SmartPersonalizationSetting,
  smartPersonalizationSettings,
} from "@/lib/data/SettingsData";
type Props = {
  activeTab: string;
};
const SmartPersonalization = ({ activeTab }: Props) => {
  const [backgroundSound, setBackgroundSound] = useState("Enable");

  const [toggles, setToggles] = useState<Record<string, boolean>>(
    smartPersonalizationSettings.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.defaultEnabled ?? false,
      }),
      {} as Record<string, boolean>,
    ),
  );

  const toggleSetting = (id: string) => {
    setToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const groupedSettings = smartPersonalizationSettings.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SmartPersonalizationSetting[]>,
  );
  return (
    <div className=" ">
      <div className="bg-white/25 border-2  rounded-2xl !border-white mb-8 md:mb-16">
        {/* Header */}
        <div className=" bg-[#DEF0F8] p-6  rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 ">
            Notifications & Alerts
          </h1>
          <p className="text-sm text-gray-500">
            Choose which reminders, updates, and emails you'd like to receive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gapx-x-6">
          {Object.entries(groupedSettings).map(([category, items]) => (
            <div
              key={category}
              className="px-3 md:px-6 py-5 md:py-10 border-b-2 !border-b-[#DEF0F8] flex flex-col md:flex-row items-center justify-between gap-x-3 md:gap-x-6"
            >
              {/* Left grid */}
              <div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-[#DEF0F8] last:border-b-0"
                  >
                    <div>
                      <p className="text-base font-bold text-gray-800">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-sm text-[#6A7282] mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right grid*/}
              <div>
                {items.map((item, idx) => {
                  const indexText = "reminder-style";
                  // index 3: Background Sound style
                  if (item.id === indexText) {
                    return (
                      <div key={item.id} className="flex gap-2 w-2/3">
                        {["Normal", "Calm"].map((option) => {
                          const isActive = backgroundSound === option;
                          return (
                            <button
                              key={option}
                              onClick={() => setBackgroundSound(option)}
                              className={`flex items-center gap-2 justify-center cursor-pointer hover:opacity-80 py-2.5 px-6 rounded-lg text-sm font-medium transition-all ${
                                isActive
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
                    );
                  }

                  // Normal toggle for others
                  return (
                    <label
                      key={item.id}
                      className="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={toggles[item.id]}
                        onChange={() => toggleSetting(item.id)}
                        className="sr-only peer"
                      />
                      <div
                        className="w-11 h-6 bg-[#677381] rounded-full peer peer-checked:bg-primary
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border after:rounded-full after:h-5 after:w-5
                after:transition-all peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartPersonalization;
