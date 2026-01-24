"use client";

import React from "react";

const PostpartumCard: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  p-4 pb-12">
      {/* Main Card Container */}
      <div className="w-full max-w-4xl rounded-xl border border-white bg-white/25 px-6 py-10 text-center shadow-lg shadow-blue-100/50 backdrop-blur-sm">
        {/* Header Section */}
        <h1 className="mb-4 text-3xl font-semibold text-[#38b6ff]">
          Congratulations on Your Baby! 🎉
        </h1>

        {/* Description */}
        <p className="mb-10 text-gray-600">
          Activate postpartum mode. You&apos;ll receive newborn-care tools and
          recovery insights.
        </p>

        {/* Action Button */}
        <button
          className="inline-block rounded-xl bg-secondary px-12 py-4 font-medium text-white transition-all  cursor-pointer"
          onClick={() => console.log("Mode Activated")}
        >
          Start Postpartum Period
        </button>
      </div>
    </div>
  );
};

export default PostpartumCard;
