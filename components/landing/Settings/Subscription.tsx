"use client";

import React, { JSX, useState } from "react";

import { privacySettings, subscriptionItems } from "@/lib/data/SettingsData";
import {
  AlertTriangleIcon,
  CrownIcon,
  Download,
  MonitorSmartphoneIcon,
  Smartphone,
} from "lucide-react";
type Props = {
  activeTab: string;
};
const Subscription = ({ activeTab }: Props) => {
  const iconMap: Record<string, JSX.Element> = {
    "upgrade-plan": <CrownIcon className="w-5 h-5 text-[#677381]" />,
    "cancel-subscription": (
      <AlertTriangleIcon className="w-5 h-5 text-[#677381]" />
    ),
    "device-management": (
      <MonitorSmartphoneIcon className="w-5 h-5 text-[#677381]" />
    ),
    "billing-history": <Download className="w-5 h-5 text-[#677381]" />,
  };

  // Toggle state only for items that are toggles
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    subscriptionItems.reduce(
      (acc, item) => {
        acc[item.id] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

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
            Subscription & Billing
          </h1>
          <p className="text-sm text-gray-500">
            Manage your membership, billing and connected devices.
          </p>
        </div>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subscriptionItems.map((item, idx) => {
              // Determine icon inside button
              let buttonIcon: JSX.Element | null = null;
              if (idx === 0)
                buttonIcon = <CrownIcon className="w-4 h-4 text-yellow-400" />;
              if (idx === 1)
                buttonIcon = (
                  <AlertTriangleIcon className="w-4 h-4 text-yellow-400" />
                );
              if (idx === 3) buttonIcon = <Smartphone className="w-4 h-4" />;
              if (idx === 4) buttonIcon = <Download className="w-4 h-4" />;

              // Determine button styles
              let buttonClass = `
              px-4 py-2 rounded-lg text-sm font-medium flex justify-between cursor-pointer hover:bg-gray-100 items-center gap-2
              ${item.actionVariant === "primary" && "bg-pink-600 text-white hover:bg-pink-700"}
              ${item.actionVariant === "danger" && idx === 1 ? " border " : item.actionVariant === "danger" ? "" : ""}
              ${item.actionVariant === "outline" && "border border-gray-300 text-gray-700 "}
              ${item.actionVariant === "upgrade" && "border border-gray-300 bg-primary text-white"}
              
            `;

              return (
                <div key={item.id} className={`p-5 rounded-xl  bg-white/30  `}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-gray-800">
                        {item.title}
                      </h4>
                      {item.value && (
                        <p className="text-base text-[#6A7282] font-semibold mt-1">
                          {item.value}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-sm text-[#6A7282] mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.actionLabel && (
                      <button className={buttonClass}>
                        {idx === 1 ? (
                          <>
                            <span>{item.actionLabel}</span>
                            {buttonIcon && <span>{buttonIcon}</span>}
                          </>
                        ) : (
                          <>
                            {buttonIcon && <span>{buttonIcon}</span>}
                            <span>{item.actionLabel}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
