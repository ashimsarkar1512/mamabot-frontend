'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatService } from '@/lib/chat-service';
import {
    MessageSquare,
    Plus,
    LayoutDashboard,
    Activity,
    FileText,
    AlertCircle,
    Settings,
    Folder,
    Clock,
    Search
} from 'lucide-react';
import Button from '../ui/Button';

export const ChatSidebar: React.FC = () => {
    const [chats] = useState(chatService.getAllChats());
    const history = chatService.getHistory();

    const handleNewChat = () => {
        chatService.createNewChat();
        window.location.reload(); // In production, use proper state management
    };

    return (
        <div className="w-80 bg-white border-r h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🤖</span>
                    </div>
                    <h1 className="text-2xl font-bold text-pink-500">Mamabot</h1>
                    <button className="ml-auto p-2 hover:bg-gray-100 rounded-lg">
                        <Search className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
                <Button
                    onClick={handleNewChat}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Chat
                </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1">
                <nav className="px-4 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-lg">
                        <MessageSquare className="w-5 h-5" />
                        <span>Chatbot</span>
                        <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Activity className="w-5 h-5" />
                        <span>Symptom Tracker</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <FileText className="w-5 h-5" />
                        <span>Report & Analytics</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>Emergency</span>
                    </a>

                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Settings className="w-5 h-5" />
                        <span>Settings & Personalization</span>
                    </a>
                </nav>

                {/* Projects */}
                <div className="px-4 mt-6">
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
                        <Folder className="w-5 h-5" />
                        <span>Project</span>
                        <span className="ml-auto text-gray-400">▼</span>
                    </button>
                    <div className="ml-8 mt-2 space-y-1">
                        {chats.slice(0, 3).map((chat, index) => (
                            <a key={chat.id} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                Chat Name {index + 1}
                            </a>
                        ))}
                    </div>
                </div>

                {/* History */}
                <div className="px-4 mt-6 pb-6">
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
                        <Clock className="w-5 h-5" />
                        <span>History</span>
                        <span className="ml-auto text-gray-400">▼</span>
                    </button>
                    <div className="ml-8 mt-2 space-y-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Today</a>
                        {history.map((item, index) => (
                            <a key={item.id} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                File Name {index + 1}
                            </a>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};