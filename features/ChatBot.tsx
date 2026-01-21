"use client"
import ChatBotIcon from "@/public/images/ChatIcon.jpg"
import Image from "next/image";

const COLORS = {
    primary: "#D82479",
    accent: "#ed6e6a",
    dark: "#4E4D59",
    light: "#F0F3F7",
};

const ChatBot = () => {
    return (
        <>
            <button
                className="fixed bottom-14 md:bottom-8 right-8 bg-white border p-2 rounded-3xl shadow-2xl hover:scale-105 hover:cursor-pointer transition-transform duration-300 z-9999 animate-pulse-slow"
            >
                <Image src={ChatBotIcon} alt="ChatBot" height={60} width={60} />
            </button>

            {/* ANIMATIONS */}
            <style jsx global>{`
        /* Floating Button Pulse Animation */
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 ${COLORS.primary}90;
          }
          50% {
            box-shadow: 0 0 0 8px ${COLORS.primary}00;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* Chat Window Slide In */
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        /* Override link/button style inside bot message */
        .bg-white button#open-meeting-modal {
            /* Styling for the embedded button in the bot message */
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
      `}</style>
        </>
    );
};

export default ChatBot;