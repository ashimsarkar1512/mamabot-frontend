'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { chatService } from '@/lib/chat-service';
import { Message } from '@/types/chat';
import { Mic, Paperclip, Image, Send } from 'lucide-react';
import Button from '../ui/Button';

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chat = chatService.getCurrentChat();
        if (chat) {
            setMessages(chat.messages);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userInput = input;
        setInput('');
        setIsLoading(true);

        try {
            await chatService.sendMessage(userInput);
            const chat = chatService.getCurrentChat();
            if (chat) {
                setMessages([...chat.messages]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">🤖</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Command Your Health Journey With
                                <span className="text-pink-500"> Mamabot AI</span> Studios.
                            </h1>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="bg-yellow-100 px-3 py-1 rounded-full">Not medical advice</span>
                        <span className="ml-2">In emergencies: Call 112</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>Start a conversation by typing a message below</p>
                    </div>
                ) : (
                    messages.map(message => (
                        <ChatMessage key={message.id} message={message} />
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gray-50 rounded-full border border-gray-200 flex items-center px-4 py-3">
                        <button className="p-2 hover:bg-gray-200 rounded-full transition">
                            <Paperclip className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-full transition">
                            <Image className="w-5 h-5 text-gray-500" />
                        </button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Write here your command..."
                            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            disabled={isLoading}
                        />
                        <button className="p-2 hover:bg-gray-200 rounded-full transition">
                            <Mic className="w-5 h-5 text-gray-500" />
                        </button>
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="ml-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full px-6"
                        >
                            Generate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};