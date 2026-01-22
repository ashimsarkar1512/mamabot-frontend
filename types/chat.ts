export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface Chat {
    id: string;
    name: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export interface HistoryItem {
    id: string;
    title: string;
    excerpt: string;
    date: string;
}