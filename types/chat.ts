export type Role = "user" | "ai";

export interface Message {
  id: string;
  role: Role;
  text: string;        // <-- was "content"
  createdAt: number;   // <-- was Date
}

export interface Chat {
  id: string;
  title: string;       // <-- was "name"
  messages: Message[];
  createdAt: number;   // <-- was Date
}

export interface HistoryItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}
export interface Project {
  id: string;
  name: string;
  chats: Chat[];
}
