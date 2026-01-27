import Image from "next/image";
import ChatBotIcon from "@/public/images/icon.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "@/types/chat";
import { AlertTriangle } from "lucide-react";

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const isEmergency = msg.metadata?.is_emergency;

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5 my-2`}
    >
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-1">
          <Image
            src={ChatBotIcon}
            alt="Bot"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[85%] md:max-w-[75%] p-4 text-md font-medium leading-relaxed shadow-sm ${
          isUser
            ? "bg-pink-500 text-white rounded-[20px] rounded-br-sm"
            : isEmergency
              ? "bg-red-50 border border-red-200 text-red-900 rounded-[20px] rounded-bl-sm"
              : "bg-gray-100 text-gray-800 rounded-[20px] rounded-bl-sm"
        }`}
      >
        {isEmergency && (
          <div className="flex items-center gap-2 mb-2 text-red-600 font-bold border-b border-red-200 pb-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Emergency Alert</span>
          </div>
        )}

        {isUser ? (
          msg.text
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5 text-gray-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-8 h-8 rounded-full text-pink-600 bg-pink-50  border border-pink-600/40! flex items-center justify-center text-xs font-normal shrink-0 shadow-sm mt-1">
          Me
        </div>
      )}
    </div>
  );
}
