/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Plus, Bot } from "lucide-react";
import ProjectList from "./ProjectList";
import HistoryList from "./HistoryList";
import SidebarActions from "./SidebarActions";

export default function Sidebar({ store }: any) {
  return (
    <div className="m-3 shadow-2xl w-[280px] shrink-0 bg-white border-r h-full flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-pink-500 font-bold text-xl tracking-tight">
          <div className="bg-pink-100 p-1.5 rounded-full flex items-center justify-center">
             <Bot className="w-5 h-5 text-pink-500" />
          </div>
          Mamabot
        </div>
        <button className="text-gray-400 hover:text-gray-600">
           <Search className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mb-2">
        <button
          onClick={() => store.createChat(null)}
          className="w-full bg-[#1EA1F1] hover:bg-sky-500 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> New Chat
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1">
        
        {/* Actions Menu */}
        <SidebarActions />

        <div className="my-4 border-t border-gray-100" />

        {/* Projects */}
        <ProjectList store={store} />

        <div className="my-4 border-t border-gray-100" />

        {/* History */}
        <HistoryList store={store} />
      </div>
    </div>
  );
}
