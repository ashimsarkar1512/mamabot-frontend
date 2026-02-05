"use client";

import { JSX, useState } from "react";

import {
  AlertTriangleIcon,
  CrownIcon,
  Download,
  Smartphone,
} from "lucide-react";
import DeviceModal from "./UserDevicesModal";
import { useGetSubscriptionByUserQuery } from "@/redux/features/api/user/settings/SubscriptionPlan";
type Props = {
  activeTab: string;
};
interface SubscriptionItem {
  id: string;
  title: string;
  value?: string;
  description?: string;
  actionLabel?: string;
  actionVariant?: "primary" | "outline" | "upgrade";
}

const Subscription = ({ activeTab }: Props) => {
  const [showDevices, setShowDevices] = useState(false);
  const { data, isLoading } = useGetSubscriptionByUserQuery();

  const user = data?.data.user;
  const subscriptionItems: SubscriptionItem[] = [
    {
      id: "current-plan",
      title: "Current Plan",
      value: isLoading ? "Loading..." : (user?.["subscription Plan"] ?? "Free"),
    },

    {
      id: "payment-method",
      title: "Payment Method",
      value: isLoading
        ? "Loading..."
        : user?.last_four_digits
          ? `Stripe **** ${user.last_four_digits}`
          : "Not added",
      actionVariant: "outline",
    },

    {
      id: "device-management",
      title: "Device Management",
      description: "Manage logged-in devices",
      actionLabel: "View Devices",
      actionVariant: "outline",
    },

    {
      id: "billing-history",
      title: "Billing History",
      description: "View past payments",
      actionLabel: "View Invoices",
      actionVariant: "outline",
    },
  ];

  return (
    <div className=" ">
      <div className="bg-white/25 border-2  rounded-2xl !border-white mb-8 md:mb-16">
        {/* Header */}
        <div className=" bg-[#DEF0F8] p-3 md:p-6  rounded-2xl">
          <h1 className="text-lg mb-1 sm:text-2xl font-semibold text-gray-800 ">
            Subscription & Billing
          </h1>
          <p className="text-sm text-gray-500">
            Manage your membership, billing and connected devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
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

            // button styles
            let buttonClass = `
              px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex justify-between cursor-pointer hover:bg-gray-100 items-center gap-2
              ${item.actionVariant === "primary" && "bg-pink-600 text-white hover:bg-pink-700"}
              
              ${item.actionVariant === "outline" && "border border-gray-300 text-gray-700 "}
              ${item.actionVariant === "upgrade" && "border border-gray-300 bg-primary text-white"}
              
            `;

            return (
              <div
                key={item.id}
                className={`
    px-2 md:px-6 py-5 md:py-10 bg-white/30
    ${idx < subscriptionItems.length - 2 ? "border-b-2 !border-b-[#DEF0F8]" : ""}
  `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-gray-800">
                      {item.title}
                    </h4>
                    {item.value && (
                      <p className="text-sm text-[#6A7282] font-semibold mt-1">
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
                    <button
                      className={buttonClass}
                      onClick={() => {
                        if (item.id === "device-management") {
                          setShowDevices(true);
                        }

                        if (
                          item.id === "billing-history" &&
                          user?.invoice_link
                        ) {
                          window.open(user.invoice_link, "_blank");
                        }
                      }}
                    >
                      {buttonIcon && <span>{buttonIcon}</span>}
                      <span>{item.actionLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showDevices && <DeviceModal onClose={() => setShowDevices(false)} />}
    </div>
  );
};

export default Subscription;
