"use client";

import { AlertTriangle } from "lucide-react";

export default function HangingAlertCard() {
  return (
    <div className="relative w-full flex justify-center py-24 md:py-32">
      {/* Pin / Nail (STAYS FIXED) */}
      <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center  ">
        <div className="w-4 h-4 bg-radial from-red-400 from-40% to-red-700 rounded-full shadow-md" />
      </div>

      {/*   SWAYING GROUP   */}
      <div
        className="relative w-full md:w-[92%] max-w-4xl! "
        style={{
          transformOrigin: "top center",
          animation: "gentleHangSway 7s ease-in-out infinite",
        }}
      >
        {/* Strings */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[280px] flex justify-between z-10">
          <div
            className="w-[140px] h-[2px] bg-gray-300 origin-right"
            style={{
              transform: "rotate(-12deg)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
          <div
            className="w-[140px] h-[2px] bg-gray-300 origin-left"
            style={{
              transform: "rotate(12deg)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Main card */}
        <div
          className="relative mt-6 w-full bg-gradient-to-b from-yellow-50/60 to-yellow-100/20 
                     border border-yellow-300/40! rounded-2xl shadow-lg p-7 md:p-9 text-center
                     overflow-hidden"
        >
          {/* Depth layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-200/10 rounded-2xl pointer-events-none" />

          <div className="relative flex items-center justify-center gap-3 text-red-600 font-regular text-lg mb-5">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span>Call Your Doctor If</span>
          </div>

          <div className="space-y-3 text-xs lg:text-base text-gray-500 leading-relaxed">
            <p>• For any emergency, call 112</p>
            <p>• Heavy bleeding (soaking pad in less than 1 hour)</p>
            <p>• Severe pain or signs of infection</p>
            <p>• Severe anxiety or depression symptoms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
