"use client";

import { useGetFaqsQuery } from "@/redux/features/api/user/Faq";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetFaqsQuery();

  const faqs = data?.data?.filter((faq) => faq.is_active === 1) || [];

 const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <section className="py-10 text-center text-gray-500">
        Loading FAQs...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 text-center text-red-500">
        Failed to load FAQs
      </section>
    );
  }
  return (
    <section id="faq" className="w-full py-3 md:py-6 scroll-mt-5">
      <div className="mx-auto">
        <div className="">
          <h2 className="text-xl text-center md:text-[32px] font-semibold ">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mb-5 md:mb-14 h-0.5 w-full mx-auto bg-[#BAE1F0] " />

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
