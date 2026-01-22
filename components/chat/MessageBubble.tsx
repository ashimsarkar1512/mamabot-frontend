/* eslint-disable @typescript-eslint/no-explicit-any */
export default function MessageBubble({ msg }: any) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[60%] p-3 rounded ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
