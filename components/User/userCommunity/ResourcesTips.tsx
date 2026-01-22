import React from "react";
import { BookOpen, Shield, Music, Play, ChevronRight } from "lucide-react";

const ResourcesTips = () => {
  return (
    <div className="w-full md:w-98 bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden font-sans">
      {/* --- Header Section --- */}
      <div className="bg-[#FFEAF5] px-6 py-6 flex items-center gap-3">
        {/* Book Icon */}
        <BookOpen className="w-7 h-7 text-[#E73F80]" strokeWidth={2} />
        <h2 className="text-xl md:text-2xl font-bold text-[#E73F80]">
          Resources & Tips
        </h2>
      </div>

      {/* --- Content Body --- */}
      <div className="p-4 flex flex-col gap-4">
        {/* 1. Community Guidelines Card */}
        <div className="border border-pink-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-gray-800" />
            <span className="font-semibold text-lg text-gray-900">
              Community Guidelines
            </span>
          </div>

          <button className="w-full border border-pink-200 rounded-xl px-4 py-3 flex justify-between items-center bg-white hover:bg-pink-50 transition-colors group">
            <span className="text-[#E73F80] font-medium">Read Guidelines</span>
            <ChevronRight className="w-5 h-5 text-[#E73F80] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2. Relaxation Audio Card */}
        <div className="border border-blue-200 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              {/* Custom colored music icon to match image */}
              <div className="relative">
                <Music className="w-6 h-6 text-pink-400 absolute -left-1 top-0 opacity-80" />
                <Music className="w-6 h-6 text-blue-500 relative left-1" />
              </div>
              <span className="font-semibold text-lg text-gray-900 ml-1">
                Relaxation Audio
              </span>
            </div>
            <button className="text-xs font-bold text-[#E73F80] hover:underline">
              View Playlist
            </button>
          </div>

          <button className="w-full bg-[#2898CD] hover:bg-[#2080af] text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
            <div className="border-2 border-white rounded-full p-0.5">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="font-medium text-lg">Listen Now</span>
          </button>
        </div>

        {/* 3. Popular Topics Card */}
        <div className="border border-blue-200 rounded-2xl p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-3">
            Popular Topics This Week
          </h3>

          <div className="flex flex-col gap-2.5">
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Stretch Marks Prevention
            </div>
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Baby Kicks Awareness
            </div>
            <div className="border border-blue-100 rounded-xl px-4 py-3 text-gray-700 bg-white hover:border-blue-300 cursor-pointer transition-colors">
              Emotional Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTips;
