"use client";

import { useState } from "react";
import { comfortaa } from "@/app/fonts";

import { Menu, Settings2, X } from "lucide-react";

import { settingsTabs } from "@/lib/data/SettingsData";
import Personalization from "@/components/landing/Settings/Personalization";
import Notifications from "@/components/landing/Settings/Notifications";
import PrivacyData from "@/components/landing/Settings/PrivacyData";
import SmartPersonalization from "@/components/landing/Settings/SmartPersonalization";
import Subscription from "@/components/landing/Settings/Subscription";
import HelpSupport from "@/components/landing/Settings/HelpSupport";

const Page = () => {
  const [activeTab, setActiveTab] = useState(settingsTabs[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`pt-12 ${comfortaa.className} space-y-7 md:space-y-16`}>
      <div className="flex md:items-center gap-3 ">
        <div className="w-5 md:w-14 h-5 md:h-14 bg-primary text-white rounded-full flex items-center justify-center">
          <Settings2 />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl mb-1">Settings</h1>
          <p className="text-sm md:text-lg text-[#4A5565]">
            Fine-tune your Mamabot experience — your comfort, your control.
          </p>
        </div>
      </div>
      {/* Tabs */}

      <div className="mb-8 md:mb-16">
        {/* Mobile Hamburger */}

        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white"
          >
            <span className="font-medium">{activeTab}</span>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-md overflow-hidden">
              {settingsTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsOpen(false); // ✅ auto close on select
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition
            ${
              activeTab === tab
                ? "bg-[#229ECF] text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:grid grid-cols-6 overflow-hidden border-2 border-white! bg-white/25">
          {settingsTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm cursor-pointer border-r-2 border-r-white! font-medium transition
          ${
            activeTab === tab
              ? "bg-[#229ECF] text-white"
              : "text-gray-600 hover:bg-gray-50"
          }
        `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}

      {activeTab === "Personalization" && (
        <Personalization activeTab={activeTab} />
      )}
      {activeTab === "Notifications" && <Notifications activeTab={activeTab} />}
      {activeTab === "Privacy & Data" && <PrivacyData activeTab={activeTab} />}
      {activeTab === "Smart Personalization" && (
        <SmartPersonalization activeTab={activeTab} />
      )}
      {activeTab === "Subscription" && <Subscription activeTab={activeTab} />}
      {activeTab === "Help & Support" && <HelpSupport activeTab={activeTab} />}
    </div>
  );
};

export default Page;
