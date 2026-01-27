"use client";

import { useState } from "react";
import { Chat, Message, Project } from "@/types/chat";
import { mockAIReply } from "@/lib/mockAI";

function uid() {
  return Math.random().toString(36).slice(2);
}

export function useChatStore() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "p1",
      name: "Default Project",
      chats: [],
    },
  ]);

  // Standalone chats (History) -----------------------------------------------------------------
  const [history, setHistory] = useState<Chat[]>([
    {
      id: "h1",
      title: "You Could Use Some of Your Equity...",
      messages: [],
      createdAt: 1737517000000,
    },
    {
      id: "h2",
      title: "More Homes for Sale Isn't a Warning...",
      messages: [],
      createdAt: 1737417000000,
    },
  ]);

  // If null, we are in History mode. If string, we are in Project mode.
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) || null
    : null;

  const activeChat = activeProjectId
    ? activeProject?.chats.find((c) => c.id === activeChatId) || null
    : history.find((c) => c.id === activeChatId) || null;

  function createProject(name: string) {
    const newProject = { id: uid(), name, chats: [] };
    setProjects((p) => [...p, newProject]);
  }

  function deleteProject(projectId: string) {
    setProjects((p) => p.filter((x) => x.id !== projectId));
    if (projectId === activeProjectId) {
      setActiveProjectId(null);
      setActiveChatId(null);
    }
  }

  /**
   * Create a create in specific context.
   * If projectId is provided, create in that project.
   * If null/undefined, create in history.
   */
  function createChat(targetProjectId?: string | null) {
    const newChat: Chat = {
      id: uid(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };

    // If targetProjectId is explicitly null, use history.
    // If undefined, use current activeProjectId.
    const pid =
      targetProjectId !== undefined ? targetProjectId : activeProjectId;

    if (pid) {
      // Add to Project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === pid ? { ...p, chats: [newChat, ...p.chats] } : p,
        ),
      );
      setActiveProjectId(pid);
    } else {
      // Add to History
      setHistory((prev) => [newChat, ...prev]);
      setActiveProjectId(null);
    }

    setActiveChatId(newChat.id);
  }

  function deleteChat(chatId: string) {
    if (activeProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeProjectId
            ? { ...p, chats: p.chats.filter((c) => c.id !== chatId) }
            : p,
        ),
      );
    } else {
      setHistory((prev) => prev.filter((c) => c.id !== chatId));
    }

    if (chatId === activeChatId) {
      setActiveChatId(null);
    }
  }

  async function sendMessageHelper({
    token,
    chat_id,
    message,
  }: {
    token: string;
    chat_id: string;
    message: string;
  }) {
    const formData = new FormData();

    formData.append("chat_id", chat_id);
    formData.append("message", message);
    formData.append("language", "en");
    formData.append("country", "bd");
    formData.append("mode", "pregnancy");
    formData.append("pregnancy_week", "3");
    formData.append("postpartum_day", "0");
    formData.append("delivery_type", "vaginal");
    formData.append("tone_of_ai", "empathetic");
    formData.append("support_type", "emotional");
    formData.append("dietary_preferences", "no_restriction");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai-chat-logs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    return res.json();
  }

  async function sendMessage(text: string) {
    if (!activeChatId) return;
    const chatId = activeChatId;
    // i want to get actual token from the server which is stored in the cookie
    const token = "7|nj0jpk41OpTSSsSVo7ZjG6AmQiKjJqz3kZuLS9d1707584ba";

    // Helper to add message
    const addMsg = (role: "user" | "ai", content: string) => {
      const msg: Message = {
        id: uid(),
        role,
        text: content,
        createdAt: Date.now(),
      };

      if (activeProjectId) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === activeProjectId
              ? {
                  ...p,
                  chats: p.chats.map((c) =>
                    c.id === activeChatId
                      ? { ...c, messages: [...c.messages, msg] }
                      : c,
                  ),
                }
              : p,
          ),
        );
      } else {
        setHistory((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...c.messages, msg] }
              : c,
          ),
        );
      }
      return msg;
    };

    addMsg("user", text);
    const aiText = await sendMessageHelper({
      token: token,
      chat_id: chatId,
      message: text,
    });
    console.log("response is:", aiText);

    addMsg("ai", aiText.data.ai_response);
  }

  return {
    projects,
    history,
    activeProjectId,
    activeChatId,
    activeProject,
    activeChat,
    setActiveProjectId,
    setActiveChatId,
    createProject,
    deleteProject,
    createChat,
    deleteChat,
    sendMessage,
  };
}
