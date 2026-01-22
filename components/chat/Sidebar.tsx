/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Plus, X } from "lucide-react";
import ProjectList from "./ProjectList";
import HistoryList from "./HistoryList";
import SidebarActions from "./SidebarActions";
import ChatBotIcon from "@/public/images/icon.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ store }: any) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="m-3 shadow-lg w-[280px] shrink-0 bg-white h-[98vh] rounded-2xl flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link
          href="/user-dashboard"
          className="flex items-center gap-2 text-pink-500 font-medium text-2xl tracking-tight hover:text-pink-600 hover:cursor-pointer transition-transform duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Image
              src={ChatBotIcon}
              alt="Bot"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          Mamabot
        </Link>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => setShowSearch(true)}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      {/* search bar - leftside search icon , middle side input box, right side close icon */}
      {showSearch && (
        <div className="mx-4 my-3 flex items-center justify-between gap-2 px-3 py-2 border border-gray-100! rounded-lg">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowSearch(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {/* New Chat Button */}
      <div className="px-4 mb-2">
        <button
          onClick={() => store.createChat(null)}
          className="w-full bg-[#229ECF] hover:bg-sky-500 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> New Chat
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1">
        {/* Actions Menu */}
        <SidebarActions />

        <div className="my-4 border-t border-gray-100!" />

        {/* Projects */}
        <ProjectList store={store} />

        <div className="my-4 border-t border-gray-100!" />

        {/* History */}
        <HistoryList store={store} />
      </div>
    </div>
  );
}
