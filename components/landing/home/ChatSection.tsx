'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, Settings, Activity, AlertCircle, FileText, Paperclip, ImageIcon, Zap } from 'lucide-react';



export default function ChatSection() {
  const [command, setCommand] = useState('');


  return (
    <div className="flex h-screen bg-gray-50 mb-32 max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-72 bg-white  p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Mamabot</h1>
        </div>

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
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">New</span>
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
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 px-4">Project</h3>
          <div className="space-y-1">
            {['Chat Name 1', 'Chat Name 2', 'Chat Name 3'].map((chat, idx) => (
              <div key={idx} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                {chat}
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 px-4">History</h3>
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition">
              Today
            </div>
            {['File Name 1', 'File Name 2'].map((file, idx) => (
              <div key={idx} className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-center gap-3">
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">Not medical advice</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">In emergencies Call 112</span>
          <span className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-pink-200 transition">Read Disclaimer</span>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-start pt-16 px-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-2xl">👩‍⚕️</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Command Your Health Journey
          </h1>
          <h2 className="text-4xl font-bold text-center mb-8">
            With<span className="text-pink-500 ml-2">Mamabot AI</span><span className="text-gray-900 ml-2">Studios.</span>
          </h2>

          {/* Input Area */}
          <div className="w-full max-w-2xl mb-12">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-4 flex items-center gap-3">
              <input
                type="text"
                placeholder="Write here your command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 text-gray-700 placeholder-gray-400 outline-none text-sm"
              />
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </button>
                <button className="bg-pink-300 hover:bg-pink-400 text-white px-6 py-2 rounded-full font-medium transition">
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="w-full max-w-4xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">History</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* History Item 1 */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition cursor-pointer">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">
                  You Could Use Some of Your Equity To Put Down on Your Next Home
                </h4>
                <p className="text-gray-600 text-xs mb-3">
                  If you are a homeowner, chanceless are you have built up a lot of wealth just by living in your house and watching...
                </p>
                <p className="text-gray-400 text-xs">May 21, 2025</p>
              </div>

              {/* History Item 2 */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition cursor-pointer">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">
                  More Homes for Sale Is not a Warning Sign  It is Your Buying Opportunity
                </h4>
                <p className="text-gray-600 text-xs mb-3">
                  If you are a homeowner, chanceless are you have built up a lot of wealth  just by living in your house and watching...
                </p>
                <p className="text-gray-400 text-xs">May 21, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Recommended */}
      <div className="w-24 bg-white border-l border-gray-200  flex items-center justify-center">
        <div className="text-pink-500 font-bold text-sm tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Recommended For You
        </div>
      </div>
    </div>
  );
}
