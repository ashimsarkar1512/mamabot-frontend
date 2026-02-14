"use client";

import React, { useState } from "react";
import {
  Search,
  MessageSquare,
  Settings,
  Activity,
  AlertCircle,
  FileText,
  Paperclip,
  ImageIcon,
  Zap,
  Menu,
  X,
  Crown,
  Mic,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function ChatSection() {
  const [command, setCommand] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex md:h-screen rounded-2xl border border-white/50 bg-white/50 backdrop-blur-md flex-col lg:flex-row pl-4 py-4">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-200 rounded-lg transition"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed lg:static inset-0 w-72 m-3 bg-white rounded-2xl border border-gray-200 p-6 transform transition-transform duration-300 lg:translate-x-0 z-40 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image src="/images/icon.png" alt="Mamabot" width={40} height={40} />
          <span className="text-lg  text-[#D82479]">Mamabot</span>
        </Link>

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
        </div>

        {/* New Chat Button */}
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg py-2 px-4 mb-6 flex items-center gap-2 font-medium transition">
          <MessageSquare className="w-4 h-4" />
          New Chat
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </div>

          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <div className="flex items-center gap-2 text-gray-700">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chatbot</span>
            </div>
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Symptom Tracker</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Report & Analytics</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Emergency</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings & Personalization</span>
          </div>
        </nav>

        {/* Project Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 px-4">
            Project
          </h3>
          <div className="space-y-1">
            {["Chat Name 1", "Chat Name 2", "Chat Name 3"].map((chat, idx) => (
              <div
                key={idx}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              >
                {chat}
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 px-4">
            History
          </h3>
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition">
              Today
            </div>
            {["File Name 1", "File Name 2"].map((file, idx) => (
              <div
                key={idx}
                className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              >
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto ">
        {/* Top Badges */}
        <div className="flex justify-center w-full py-2 ">
          <div className="flex flex-col md:flex-row items-center gap-3 px-2 md:px-4 py-1 md:border md:!border-[#FF9800] md:bg-orange-50/30 rounded-full md:shadow-sm">
            {/* Section 1: Not medical advice */}
            <span className="text-[11px] text-[#FF9800] sm:text-xs font-medium  whitespace-nowrap">
              Not medical advice
            </span>

            {/* Vertical Divider */}
            <div className="md:block hidden w-px h-4 bg-[#FF9800] self-center"></div>

            {/* Section 2: In emergencies */}
            <span className="text-[11px] sm:text-xs font-medium text-[#FF9800] whitespace-nowrap">
              In emergencies: Call{" "}
              <span className="text-red-400 font-bold">112</span>
            </span>

            {/* Vertical Divider */}
            <div className="md:block hidden w-px h-4 bg-[#FF9800] self-center"></div>

            {/* Section 3: Read Disclaimer */}
            <button className="text-[11px] sm:text-xs font-bold text-[#E91E63] transition-colors whitespace-nowrap underline-offset-2">
              Read Disclaimer
            </button>
          </div>
        </div>

        {/* Hero Content Section */}
        <div className="flex-1 flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-6 lg:px-8 overflow-y-auto">
          {/* Icon */}
          <Link href="/" className="flex items-center gap-2 mb-6 ">
            <Image
              src="/images/icon.png"
              alt="Mamabot"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Heading */}
          <div className="mb-8 sm:mb-12 grow">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 leading-tight">
              Command Your Health Journey
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
              With <span className="text-pink-400">Mamabot AI</span>{" "}
              <span className="text-gray-900">Studios.</span>
            </h2>
          </div>

          {/* Input Area */}
          <div className="w-full max-w-4xl mb-12 ">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-50 p-3 sm:p-5 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Write here your command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 text-gray-700 placeholder-gray-300 outline-none text-base sm:text-lg px-2"
              />
              <div className="flex items-center justify-between border-t border-gray-50 pt-3 sm:pt-0 sm:border-t-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="bg-pink-200 hover:bg-pink-300 text-white px-6 sm:px-10 py-2.5 rounded-full font-bold transition shadow-sm cursor-pointer">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="w-full max-w-4xl pb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-6">History</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* History Item 1 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <h4 className="font-bold text-gray-800 text-sm sm:text-[15px] mb-3 group-hover:text-pink-500 transition-colors leading-snug">
                  You Could Use Some of Your Equity To Put Down on Your Next
                  Home
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                  If you are a homeowner, chances are you have built up a lot of
                  wealth – just by living in your house and watching...
                </p>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                  May 21, 2025
                </p>
              </div>

              {/* History Item 2 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <h4 className="font-bold text-gray-800 text-sm sm:text-[15px] mb-3 group-hover:text-pink-500 transition-colors leading-snug">
                  More Homes for Sale Is not a Warning Sign – It is Your Buying
                  Opportunity
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                  If you are a homeowner, chances are you have built up a lot of
                  wealth – just by living in your house and watching...
                </p>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                  May 21, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Recommended (Hidden on mobile, visible on larger screens) */}
      <div className="hidden lg:flex items-center justify-center shrink-0">
        <div
          className=" px-2 py-1 rounded-r-xl flex items-center gap-1 text-white font-bold tracking-widest bg-primary"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <Crown
            className="w-5 h-5 text-yellow-500"
            style={{ transform: "rotate(90deg)" }} // rotate icon to align with vertical text
          />
          <span className="text-sm">Upgrade Pro</span>
        </div>
      </div>
    </div>
  );
}
