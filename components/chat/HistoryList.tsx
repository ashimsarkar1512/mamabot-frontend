/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { History, ChevronDown, ChevronRight, MessageCircle, X } from "lucide-react";

export default function HistoryList({ store }: any) {
  const [isOpen, setIsOpen] = useState(true);

  // Fetch history on mount
  // Fetch history on mount
  useEffect(() => {
    store.fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group chats by date
  const groupedHistory = store.history.reduce((acc: any, chat: any) => {
    const date = new Date(chat.createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    let category = "Older";
    if (date >= today) category = "Today";
    else if (date >= yesterday) category = "Yesterday";
    else if (date >= lastWeek) category = "Previous 7 Days";

    if (!acc[category]) acc[category] = [];
    acc[category].push(chat);
    return acc;
  }, {});

  const categories = ["Today", "Yesterday", "Previous 7 Days", "Older"];

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
        <div className="mt-1 pl-2 space-y-4">
           {categories.map(category => {
             const chats = groupedHistory[category];
             if (!chats || chats.length === 0) return null;

             return (
               <div key={category}>
                 <div className="px-3 py-1 text-xs text-gray-400 font-medium uppercase tracking-wider">{category}</div>
                 <div className="space-y-1">
                   {chats.map((c: any) => {
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
                          <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                              <MessageCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-pink-500" : "text-gray-400"}`} />
                              <span className="truncate">{c.title}</span>
                          </div>

                          <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               // Delete from history
                               store.setActiveProjectId(null); // Ensure context
                               store.deleteChat(c.id);
                             }}
                             className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-500 transition-all shrink-0"
                             title="Delete chat"
                          >
                             <X className="w-3 h-3" />
                          </button>
                       </div>
                     );
                   })}
                 </div>
               </div>
             );
           })}
           
           {store.history.length === 0 && (
             <div className="px-3 py-2 text-xs text-center text-gray-400 italic">No history available</div>
           )}
        </div>
      )}
    </div>
  );
}
