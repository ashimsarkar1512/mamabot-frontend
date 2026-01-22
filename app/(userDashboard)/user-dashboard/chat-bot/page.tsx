"use client";

import Link from "next/link";

export default function ChatBotPage() {
  return (
    <div>
      <h1>
        ChatBot Page -{" "}
        <Link
          href="/chatBot"
          className="text-pink-500 font-medium hover:text-pink-600 hover:cursor-pointer transition-transform duration-300"
        >
          Go to ChatBot
        </Link>
      </h1>
    </div>
  );
}
