"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (t: string) => void }) {
  const [text, setText] = useState("");

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        className="flex-1 border rounded px-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write here your command..."
      />
      <button
        className="bg-pink-400 text-white px-4 rounded"
        onClick={() => {
          if (!text.trim()) return;
          onSend(text);
          setText("");
        }}
      >
        Generate
      </button>
    </div>
  );
}
