/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import ChatBotIcon from "@/public/images/icon.png";

export default function MessageBubble({ msg }: any) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} items-end gap-2.5 my-2`}>
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Image src={ChatBotIcon} alt="Bot" width={40} height={40} className="object-contain" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[70%] p-4 text-md font-medium leading-relaxed shadow-sm ${
          isUser
            ? "bg-pink-500 text-white rounded-[20px] rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-[20px] rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-8 h-8 rounded-full text-pink-600 bg-pink-50  border border-pink-600/40! flex items-center justify-center text-xs font-normal shrink-0 shadow-sm">
          Me
        </div>
      )}
    </div>
  );
}
