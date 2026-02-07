"use client";

import { AlertCircleIcon, Mail, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  activeTab: string;
};
const helpSupport = [
  {
    id: "1",
    title: "Visit Help Center",
    description: "Quick answers to common question and step-by-step guides.",
    icon: <AlertCircleIcon className="w-5 h-5 text-[#229ECF]" />,
  },
  {
    id: "2",
    title: "Contact Our Support Team",
    description: "Get personalized help via email(we reply within 24 hours).",
    icon: <Mail className="w-5 h-5 text-[#229ECF]" />,
  },
  {
    id: "3",
    title: "Send Feedback",
    description: "Share your thoughts and help us improve Mamabot.",
    icon: <MessageCircleMore className="w-5 h-5 text-[#229ECF]" />,
  },
];
const HelpSupport = ({ activeTab }: Props) => {
  const router = useRouter();
  const handleNavigation = (id: string) => {
    if (id === "1") {
      router.push("/user-dashboard/subscription-plan#faq");
    }

    if (id === "2") {
      router.push("/user-dashboard/contact-us?section=support");
    }

    if (id === "3") {
      router.push("/user-dashboard/contact-us?section=feedback");
    }
  };

  return (
    <div className="bg-white/25 border-2  rounded-2xl !border-white mb-8 md:mb-1 ">
      <div className="6">
        {/* Header */}
        <div className=" bg-[#DEF0F8] p-3 md:p-6  rounded-2xl">
          <h1 className="text-lg mb-1 sm:text-2xl font-semibold text-gray-800 ">
            Help & Support
          </h1>
          <p className="text-sm text-gray-500">
            We're here for you, mama. Whether you have a quick question or need
            support, we're ready to help.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        {helpSupport.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`flex items-start gap-2 md:gap-4 px-2 md:px-6 py-5 md:py-10
              cursor-pointer hover:opacity-80 transition
              ${
                idx < helpSupport.length - 1
                  ? "border-b-2 !border-b-[#DEF0F8]"
                  : ""
              }
            `}
          >
            <div className="mt-1">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-base text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;
