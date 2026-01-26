"use client";

import React, { JSX, useState } from "react";

import { privacySettings } from "@/lib/data/SettingsData";
import { Download, Smartphone } from "lucide-react";
type Props = {
  activeTab: string;
};
const PrivacyData = ({ activeTab }: Props) => {
  const iconMap: Record<string, JSX.Element> = {
    "download-data": <Download className="w-5 h-5 text-[#677381]" />,
    "connected-apps": <Smartphone className="w-5 h-5 text-[#677381]" />,
  };

  // Toggle state only for items that are toggles
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    privacySettings.reduce(
      (acc, item) => {
        if (item.variant === "toggle") {
          acc[item.id] = item.defaultEnabled ?? true;
        }
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleSetting = (id: string) => {
    setToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // For real app → these would call API / trigger download / open modal etc.
  const handleAction = (id: string) => {
    if (id === "download-data") {
      alert("Downloading your data... (mock)");
    } else if (id === "connected-apps") {
      alert("Opening connections manager... (mock)");
    } else if (id === "two-factor-auth") {
      alert("Setting up 2FA... (mock)");
    }
  };
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
          {privacySettings.map((item, index) => (
            <div
              key={item.id}
              className={` px-3 md:px-6 py-5 md:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4  last:border-b-0 ${
                index + 2 < privacySettings.length
                  ? "md:border-b-2 md:!border-b-[#DEF0F8]"
                  : ""
              }`}
            >
              <div className=" ">
                <h3 className="text-base font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>

              <div className="flex items-center gap-4">
                {item.variant === "toggle" ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles[item.id] ?? false}
                      onChange={() => toggleSetting(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                ) : item.variant === "button" ? (
                  <button
                    onClick={() => handleAction(item.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:opacity-80 transition-colors
      ${
        item.actionLabel?.includes("Enable")
          ? "text-[#677381] bg-white border-2 border-[#229ECF] hover:bg-[#1a7bb8] hover:text-white"
          : "bg-white/40 border border-white/70 text-gray-700 hover:bg-white/60"
      }
    `}
                  >
                    {/* Icon inside button */}
                    {iconMap[item.id] && (
                      <span className="w-5 h-5 flex items-center justify-center">
                        {iconMap[item.id]}
                      </span>
                    )}

                    <span>{item.actionLabel}</span>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyData;
