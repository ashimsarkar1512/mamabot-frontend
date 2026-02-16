"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { useChatStore } from "@/redux/store/chatStore";
import { Menu } from "lucide-react";

export default function ChatLayout() {
  const store = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 
          transform transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 md:inset-auto md:z-auto
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]"}
        `}
      >
        <Sidebar store={store} />
      </div>

      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden absolute top-4 left-4 z-30 p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-500 hover:text-pink-500 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full h-full relative flex flex-col min-w-0">
        <ChatArea store={store} />
      </div>
    </div>
  );
}
