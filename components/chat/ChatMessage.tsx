import React from 'react';
import { Message } from '@/types/chat';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[80%] rounded-lg p-4 ${isUser
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
};