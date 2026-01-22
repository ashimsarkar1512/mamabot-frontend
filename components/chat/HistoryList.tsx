/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { History, ChevronDown, ChevronRight, MessageCircle, X } from "lucide-react";

export default function HistoryList({ store }: any) {
  const [isOpen, setIsOpen] = useState(true);

  // Use history from store (standalone chats)
  // Assuming store.history is a flat list.
  // The image shows grouping by date (Today).
  // For now we just implement the "Today" group wrapper or flat list.
  
  return (
    <div>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
           <History className="w-4 h-4 text-gray-400" />
           History
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>

      {isOpen && (
        <div className="mt-1 pl-2 space-y-1">
           {/* "Today" label logic? For now hardcode "Today" if history exists */}
           {store.history.length > 0 && (
             <div className="px-3 py-1 text-xs text-gray-400 font-medium">Today</div>
           )}

           {store.history.map((c: any) => {
             // Check if active: activeChatId matches AND activeProjectId is null
             const isActive = store.activeChatId === c.id && store.activeProjectId === null;

             return (
               <div 
                 key={c.id} 
                 className={`
                    group flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                    ${isActive ? "bg-pink-50 text-pink-600 font-medium" : "text-gray-500 hover:bg-gray-50"}
                 `}
                 onClick={() => {
                   // Ensure we switch to history mode
                   store.setActiveProjectId(null);
                   store.setActiveChatId(c.id);
                 }}
               >
                  <div className="flex items-center gap-2 truncate">
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{c.title}</span>
                  </div>

                  <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       // Delete from history
                       store.setActiveProjectId(null); // Ensure context
                       store.deleteChat(c.id);
                     }}
                     className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-500 transition-all"
                  >
                     <X className="w-3 h-3" />
                  </button>
               </div>
             );
           })}
           
           {store.history.length === 0 && (
             <div className="px-3 py-2 text-xs text-gray-400 italic">No history yet.</div>
           )}
        </div>
      )}
    </div>
  );
}
