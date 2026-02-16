"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import {
  Paperclip,
  Camera,
  Mic,
  ArrowUp,
  ChessQueen,
  Loader2,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatBotIcon from "@/public/images/icon.png";
import Image from "next/image";
import { toast } from "sonner";

export default function ChatArea({ store }: any) {
  const chat = store.activeChat;

  // Render Landing Page if no chat or empty chat
  if (!chat || chat.messages.length === 0) {
    return <LandingPage store={store} chat={chat} />;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {chat.messages.map((m: any) => (
          <MessageBubble key={m.id} msg={m} />
        ))}

        {/* Loading indicator */}
        {store.isLoading && (
          <div className="flex w-full justify-start items-end gap-2.5 my-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <Image
                src={ChatBotIcon}
                alt="Bot"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="max-w-[70%] p-4 bg-gray-100 text-gray-800 rounded-[20px] rounded-bl-sm shadow-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-600">Typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area (Pinned Bottom) */}
      <div className="p-4 bg-white border-t border-gray-100!">
        <ActiveChatInput
          onSend={(text, files) => store.sendMessage(text, files)}
          isLoading={store.isLoading}
        />
      </div>
    </div>
  );
}

function LandingPage({ store, chat }: any) {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const files: any = {};
    if (selectedImage) files.image = selectedImage;
    if (selectedFile) files.file = selectedFile;

    if (!chat) {
      const newChatId = store.createChat(null);
      store.sendMessage(inputValue, files, { chatId: newChatId, projectId: null });
      setInputValue("");
      setSelectedImage(null);
      setSelectedFile(null);
    } else {
      store.sendMessage(inputValue, files);
      setInputValue("");
      setSelectedImage(null);
      setSelectedFile(null);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File attached: ${file.name}`);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast.success(`Image attached: ${file.name}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FDFDFD] relative overflow-y-auto">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment" // Forces camera on mobile
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Top Disclaimer */}
      <div className="hidden md:flex justify-center pt-4 pb-2">
        <div className="bg-orange-50 border !border-orange-200 text-orange-600 text-xs px-3 py-1 rounded-full flex gap-2">
          <span className="font-semibold">Not medical advice</span>
          <span className="text-orange-300">|</span>
          <span>In emergencies: Call 112</span>
          <span className="text-orange-300">|</span>
          <span className="underline cursor-pointer">Read Disclaimer</span>
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-6 -mt-20">
        {/* Logo */}
        <div className="bg-pink-100 p-4 rounded-full mb-6  border hover:scale-105 hover:cursor-pointer transition-transform duration-300 animate-pulse-slow">
          <Image src={ChatBotIcon} alt="ChatBot" height={60} width={60} />
        </div>

        {/* Headline */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2 text-gray-800">
          Command Your Health Journey
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-10 text-gray-800">
          With <span className="text-pink-500">Mamabot AI</span> Studios.
        </h2>

        {/* Input Box */}
        <div className="w-full bg-white border border-gray-200 rounded-3xl p-2 shadow-sm relative focus-within:ring-2 focus-within:ring-pink-100 transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Write here your command..."
            className="w-full min-h-[50px] max-h-[120px] resize-none outline-none text-gray-700 p-3 bg-transparent"
          />

          {/* File attachments preview */}
          {(selectedImage || selectedFile) && (
            <div className="px-3 pb-2 flex gap-2 flex-wrap">
              {selectedImage && (
                <div className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {selectedImage.name}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="ml-1 hover:text-pink-800"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedFile && (
                <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Paperclip className="w-3 h-3" />
                  {selectedFile.name}
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="ml-1 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                title="Attach File"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                title="Use Camera"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 items-center">
              {/* <button
                onClick={() =>
                  toast("Listening... (Microphone access not implemented)")
                }
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                title="Voice Input"
              >
                <Mic className="w-5 h-5" />
              </button> */}
              <button
                onClick={handleSend}
                disabled={store.isLoading}
                className={`bg-pink-300  text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${inputValue.trim() && !store.isLoading ? "bg-pink-400 hover:bg-pink-400 cursor-pointer" : "cursor-not-allowed opacity-50"}`}
              >
                {store.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* History / Suggestions */}
        <div className="w-full mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-blue-100 bg-blue-50/30 p-4 rounded-xl cursor-pointer hover:border-blue-200 transition-colors">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                You Could Use Some of Your Equity To Put Down on Your Next Home
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">
                If you&apos;re a homeowner, chances are you&apos;ve built up a
                lot of wealth...
              </p>
              <div className="mt-2 text-[10px] text-gray-400">May 21, 2025</div>
            </div>
            <div className="border border-blue-100 bg-blue-50/30 p-4 rounded-xl cursor-pointer hover:border-blue-200 transition-colors">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                More Homes for Sale Isn&apos;t a Warning Sign – It&apos;s Your
                Buying Opportunity
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">
                If you&apos;re a homeowner, chances are you&apos;ve built up a
                lot of wealth...
              </p>
              <div className="mt-2 text-[10px] text-gray-400">May 21, 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Pro Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white py-4 px-1 rounded-l-md writing-mode-vertical cursor-pointer flex flex-col items-center gap-2">
        <span
          className="block transform -rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Upgrade Pro
        </span>

        <ChessQueen
          className="w-4 h-4 text-yellow-500 block transform -rotate-90"
          style={{ writingMode: "vertical-rl" }}
        />
      </div>
    </div>
  );
}

function ActiveChatInput({
  onSend,
  isLoading,
}: {
  onSend: (t: string, files?: any) => void;
  isLoading: boolean;
}) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() || isLoading) return;

    const files: any = {};
    if (selectedImage) files.image = selectedImage;
    if (selectedFile) files.file = selectedFile;

    onSend(text, files);
    setText("");
    setSelectedImage(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File attached: ${file.name}`);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast.success(`Image attached: ${file.name}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full relative">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* File attachments preview */}
      {(selectedImage || selectedFile) && (
        <div className="mb-2 flex gap-2 flex-wrap">
          {selectedImage && (
            <div className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Camera className="w-3 h-3" />
              {selectedImage.name}
              <button
                onClick={() => setSelectedImage(null)}
                className="ml-1 hover:text-pink-800"
              >
                ×
              </button>
            </div>
          )}
          {selectedFile && (
            <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              {selectedFile.name}
              <button
                onClick={() => setSelectedFile(null)}
                className="ml-1 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 items-center bg-white border rounded-full px-2 py-2 shadow-sm">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <button
          onClick={() => imageInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <Camera className="w-4 h-4" />
        </button>
        <input
          className="flex-1 outline-none text-sm px-2"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={isLoading}
        />
        <button
          className={`bg-pink-500 text-white p-2 rounded-full transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowUp className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
