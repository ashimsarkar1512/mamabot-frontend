"use client";

import Image from "next/image";

export default function SupportCards() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* General Support Card */}
        <div className="relative bg-[#FBE9F2] border-2 !border-white rounded-3xl p-6 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Icon + Title */}
          <div className="flex items-center mb-6">
            <div className="w-9 md:w-14 h-9 md:h-14 rounded-full flex items-center justify-center mr-2 md:mr-4">
              <Image
                src="/images/Contact-us/support1.png"
                className="w-full h-full"
                alt="support-image"
                width={56}
                height={56}
              />
            </div>
            <h3 className="text-xl md:text-[32px] font-bold text-gray-900">
              General Support
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            Need help using Mamabot or have general questions?
          </p>

          {/* Email & Response Time */}
          <div className="mb-6">
            <a
              href="mailto:support@mamabot.com"
              className="text-primary text-base md:text-lg font-medium hover:underline"
            >
              support@mamabot.com
            </a>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Response Time: Within 24 hours (Mon–Fri)
            </p>
          </div>

          {/* Button */}
          <a
            href="mailto:support@mamabot.com"
            className="inline-flex items-center px-4 md:px-8 py-2 md:py-3.5 bg-primary text-white font-medium rounded-full hover:opacity-80 cursor-pointer transition shadow-md"
          >
            Email Us
          </a>

          {/* Illustration (bottom right) */}
          <div className="absolute bottom-12 right-12 w-48 md:w-[232px] opacity-30 pointer-events-none">
            <Image
              src="/images/Contact-us/support.png"
              className="w-full h-full"
              alt="support-image"
              width={232}
              height={180}
            />
          </div>
        </div>

        {/* Feedback & Suggestions Card */}
        <div className="relative bg-[#DEF0F8] border-2 !border-white rounded-3xl p-6 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Icon + Title */}
          <div className="flex items-center mb-6">
            <div className="w-9 md:w-14 h-9 md:h-14 rounded-full flex items-center justify-center mr-2 md:mr-4">
              <Image
                src="/images/Contact-us/support2.png"
                className="w-full h-full"
                alt="support-image"
                width={56}
                height={56}
              />
            </div>
            <h3 className="text-xl md:text-[32px] font-bold text-gray-900">
              Feedback & Suggestions
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            We love hearing your thoughts – help us improve Mamabot.
          </p>

          {/* Email & Response Time */}
          <div className="mb-8">
            <a
              href="mailto:support@mamabot.com"
              className="text-cyan-600 font-medium text-base md:text-lg hover:underline"
            >
              support@mamabot.com
            </a>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Response Time: Within 24 hours (Mon–Fri)
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() =>
              (window.location.href = "mailto:support@mamabot.com")
            }
            className="inline-flex items-center px-4 md:px-8  py-2 md:py-3.5 bg-[#229ECF] text-white font-medium rounded-full cursor-pointer hover:opacity-80 transition shadow-md"
          >
            Share Feedback
          </button>

          {/* Illustration (bottom right) */}
          <div className="absolute bottom-12 right-12 w-48 md:w-[232px] opacity-30 cursor-pointer pointer-events-none">
            <Image
              src="/images/Contact-us/feedback.png"
              className="w-full h-full"
              alt="support-image"
              width={232}
              height={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
