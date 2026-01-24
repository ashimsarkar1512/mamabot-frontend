import { Chat, Message, HistoryItem,Project} from "@/types/chat";

// Mock history
const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "1",
    title: "You Could Use Some of Your Equity To Put Down on Your Next Home",
    excerpt: "If you're a homeowner, chances are you've built up a lot of wealth – just by living in your house and watching...",
    date: "May 21, 2025",
  },
  {
    id: "2",
    title: "More Homes for Sale Isn't a Warning Sign – It's Your Buying Opportunity",
    excerpt: "If you're a homeowner, chances are you've built up a lot of wealth – just by living in your house and watching...",
    date: "May 21, 2025",
  },
];

class ChatService {
  private chats: Map<string, Chat> = new Map();
  private currentChatId: string | null = null;

  constructor() {
    const defaultChat = this.createNewChat();
    this.currentChatId = defaultChat.id;
  }

  createNewChat(): Chat {
    const chat: Chat = {
      id: `chat_${Date.now()}`,
      title: `Chat ${this.chats.size + 1}`,  // <-- updated to "title"
      messages: [],
      createdAt: Date.now(),                 // <-- use number
    };
    this.chats.set(chat.id, chat);
    return chat;
  }

  getCurrentChat(): Chat | null {
    if (!this.currentChatId) return null;
    return this.chats.get(this.currentChatId) || null;
  }

  setCurrentChat(chatId: string): void {
    if (this.chats.has(chatId)) this.currentChatId = chatId;
  }

  async sendMessage(text: string): Promise<Message> {
    const chat = this.getCurrentChat();
    if (!chat) throw new Error("No active chat");

    // User message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      text,
      createdAt: Date.now(),
    };
    chat.messages.push(userMessage);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // AI response
    const aiMessage: Message = {
      id: `msg_${Date.now() + 1}`,
      role: "ai",
      text: this.generateMockResponse(text),
      createdAt: Date.now(),
    };
    chat.messages.push(aiMessage);

    return aiMessage;
  }

  private generateMockResponse(userInput: string): string {
    const responses = [
      "I understand your question. Based on the information you've provided, here's what I can help you with...",
      "That's an interesting point. Let me provide you with some detailed information about that...",
      "Thank you for asking. Here's a comprehensive answer to your question...",
      "I'd be happy to help you with that. Based on current health guidelines...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getAllChats(): Chat[] {
    return Array.from(this.chats.values());
  }

  getHistory(): HistoryItem[] {
    return MOCK_HISTORY;
  }

  deleteChat(chatId: string): void {
    this.chats.delete(chatId);
    if (this.currentChatId === chatId) {
      const remainingChats = this.getAllChats();
      this.currentChatId = remainingChats.length > 0 ? remainingChats[0].id : null;
    }
  }
}

export const chatService = new ChatService();
