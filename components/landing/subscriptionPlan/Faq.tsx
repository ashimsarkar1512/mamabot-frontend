"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. There are no long-term commitments.",
  },
  {
    question: "What happens if I switch devices?",
    answer:
      "Your account is cloud-based, so you can access Mamabot from any device by logging in with your credentials.",
  },
  {
    question: "Do I lose access if I downgrade?",
    answer:
      "If you downgrade, you’ll retain access to features included in your new plan. Premium features will be disabled.",
  },
  {
    question: "Is Mamabot Premium medical advice?",
    answer:
      "No. Mamabot provides informational support only and does not replace professional medical advice.",
  },
];
const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="w-full py-3 md:py-6 ">
      <div className="mx-auto">
        <div className="">
          <h2 className="text-xl text-center md:text-[32px] font-semibold ">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mb-5 md:mb-14 h-[2px] w-full mx-auto bg-[#BAE1F0] " />

        <div className="space-y-4 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full cursor-pointer flex items-center justify-between px-5 py-4 text-left text-sm md:text-base font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 text-sm text-gray-600 transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 pb-4 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
