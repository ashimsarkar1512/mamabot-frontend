"use client";

import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { useChatStore } from "@/redux/store/chatStore";

export default function ChatLayout() {
  const store = useChatStore();

  return (
    <div className="flex h-screen bg-white">
      <Sidebar store={store} />
      <ChatArea store={store} />
    </div>
  );
}
