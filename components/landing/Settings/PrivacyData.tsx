"use client";

import React, { JSX, useEffect, useState } from "react";
import { Download, Smartphone } from "lucide-react";

import {
  PrivacyDataSettingsPayload,
  useCreatePrivacyDataSettingsMutation,
  useGetPrivacyDataSettingsQuery,
} from "@/redux/features/api/user/settings/privacyData";

type Props = { activeTab: string };

const PRIVACY_UI: {
  id: keyof PrivacyDataSettingsPayload | "download-data";
  title: string;
  description: string;
  variant: "toggle" | "button";
  actionLabel?: string;
}[] = [
  {
    id: "analytics_cookies",
    title: "Analytics Cookies",
    description: "Allow cookies for analytics purposes",
    variant: "toggle",
  },
  {
    id: "two_factor_auth",
    title: "Two Factor Authentication",
    description: "Enable 2FA for extra security",
    variant: "toggle",
  },
];

const PrivacyData = ({ activeTab }: Props) => {
  const { data, isLoading } = useGetPrivacyDataSettingsQuery();
  const [updateSettings] = useCreatePrivacyDataSettingsMutation();

  const iconMap: Record<string, JSX.Element> = {
    "download-data": <Download className="w-5 h-5 text-[#677381]" />,
    "connected-apps": <Smartphone className="w-5 h-5 text-[#677381]" />,
  };

  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data?.data) {
      setToggles({
        analytics_cookies: Boolean(data.data.analytics_cookies),
        two_factor_auth: Boolean(data.data.two_factor_auth),
      });
    }
  }, [data]);

  const handleToggle = async (key: keyof PrivacyDataSettingsPayload) => {
    const updated = { ...toggles, [key]: !toggles[key] };
    setToggles(updated);

    const payload: PrivacyDataSettingsPayload = {
      analytics_cookies: updated.analytics_cookies ? 1 : 0,
      two_factor_auth: updated.two_factor_auth ? 1 : 0,
    };

    try {
      await updateSettings(payload).unwrap();
      console.log("✅ Privacy setting updated");
    } catch (err) {
      console.error("❌ Update failed", err);
    }
  };

  const handleAction = (id: string) => {
    if (id === "download-data") alert("Downloading your data...");
    else if (id === "connected-apps") alert("Opening connections manager...");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-white/25 border-2 rounded-2xl !border-white mb-8 md:mb-16">
        {/* Header */}
        <div className="bg-[#DEF0F8] p-6 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Privacy & Data
          </h1>
          <p className="text-sm text-gray-500">
            Choose your privacy & data settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIVACY_UI.map((item, index) => (
            <div
              key={item.id}
              className="px-3 md:px-6 py-5 md:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
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
                      checked={
                        toggles[item.id as keyof PrivacyDataSettingsPayload] ??
                        false
                      }
                      onChange={() =>
                        handleToggle(
                          item.id as keyof PrivacyDataSettingsPayload,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                ) : item.variant === "button" ? (
                  <button
                    onClick={() => handleAction(item.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:opacity-80 transition-colors ${
                      item.actionLabel?.includes("Enable")
                        ? "text-[#677381] bg-white border-2 border-[#229ECF] hover:bg-[#1a7bb8] hover:text-white"
                        : "bg-white/40 border border-white/70 text-gray-700 hover:bg-white/60"
                    }`}
                  >
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
