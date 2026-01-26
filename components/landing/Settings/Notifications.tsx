"use client";

import React, { useState } from "react";
import { BellOffIcon, ChevronDown } from "lucide-react";
import {
  NotificationSetting,
  notificationSettings,
} from "@/lib/data/SettingsData";
type Props = {
  activeTab: string;
};
const Notifications = ({ activeTab }: Props) => {
  const [aiTone, setAiTone] = useState("Empathetic");
  const [chatbotSpeed, setChatbotSpeed] = useState("Normal");
  const [backgroundSound, setBackgroundSound] = useState("Enable");

  const [toggles, setToggles] = useState<Record<string, boolean>>(
    notificationSettings.reduce(
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
  const groupedSettings = notificationSettings.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, NotificationSetting[]>,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSettings).map(([category, items]) => (
            <div
              key={category}
              className="px-3 md:px-6 py-5 md:py-10 border-b-2 !border-b-[#DEF0F8] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6"
            >
              <div>
                <h3 className="text-base font-bold ">{category}</h3>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-[#DEF0F8] last:border-b-0"
                  >
                    <div>
                      <p className="text-sm text-[#6A7282] font-medium ">
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

              {items.map((item) => (
                <div>
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
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
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-white flex justify-center text-sm md:text-lg items-center gap-2 text-[#229ECF] border-2 border-[#229ECF] px-2 md:px-8 py-2 md:py-4 rounded-lg hover:bg-[#229ECF] hover:text-white cursor-pointer transition-colors">
          <BellOffIcon className="w-5 h-5" />
          <span>Turn Off All Notifications</span>
        </button>
      </div>
    </div>
  );
};

export default Notifications;
