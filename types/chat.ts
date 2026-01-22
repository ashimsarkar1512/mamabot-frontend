// export interface Message {
//     id: string;
//     role: 'user' | 'assistant';
//     content: string;
//     timestamp: Date;
// }

// export interface Chat {
//     id: string;
//     name: string;
//     messages: Message[];
//     createdAt: Date;
//     updatedAt: Date;
// }

// export interface HistoryItem {
//     id: string;
//     title: string;
//     excerpt: string;
//     date: string;
// }

export type Role = "user" | "ai";

export interface Message {
  id: string;
  role: Role;
  text: string;
  createdAt: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface Project {
  id: string;
  name: string;
  chats: Chat[];
}
