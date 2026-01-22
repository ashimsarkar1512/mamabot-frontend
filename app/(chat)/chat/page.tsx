import { ChatInterface } from '@/components/chat/ChatInterface';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import React from 'react';

export default function ChatPage() {
    return (
        <div className='flex h-screen'>
            <ChatSidebar />
            <main className="flex-1 overflow-hidden">
                <ChatInterface />
            </main>
        </div>
    );
}