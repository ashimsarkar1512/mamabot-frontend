"use client";

import { X, Calendar, Clock, RefreshCw, Play } from "lucide-react";
import { useState } from "react";
import LiveKickCounterModal from "./LiveKickCounterModal";
import Image from "next/image";
import MovementHistoryModal from "./MovementHistoryModal";
import { IProfileResponse } from "@/types/user/profile";

interface BabyMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: IProfileResponse;
}

export default function BabyMovementModal({
  isOpen,
  onClose,
  profile,
}: BabyMovementModalProps) {
  const pregnancyWeek = profile?.data?.current_week ?? 0;
  const [currentDate] = useState(new Date());
  const [isKickCounterOpen, setIsKickCounterOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [trackingData, setTrackingData] = useState<{
    week: number;
    date: string;
    time: string;
  } | null>(null);

  // Early return if modal is closed
  if (!isOpen) return null;

  // Render history modal
  if (showHistory) {
    return (
      <MovementHistoryModal
        isOpen={true}
        onClose={() => {
          setShowHistory(false);
          onClose();
        }}
        onBack={() => setShowHistory(false)}
      />
    );
  }

  // Render kick counter modal
  if (isKickCounterOpen && trackingData) {
    return (
      <LiveKickCounterModal
        isOpen={true}
        onClose={() => {
          setIsKickCounterOpen(false);
          setTrackingData(null); // Reset tracking data
          onClose();
        }}
        trackingData={trackingData}
      />
    );
  }

  const formatDate = () => {
    return currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = () => {
    return currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleStartTracking = () => {
    setTrackingData({
      week: pregnancyWeek,
      date: formatDate(),
      time: formatTime(),
    });
    setIsKickCounterOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/images/user/baby1.png"
                width={36}
                height={36}
                alt="Baby icon"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Monitor Baby Movement
            </h2>
          </div>
          <p className="text-gray-600 text-base">
            Track your baby's kicks to monitor their well-being
          </p>
        </div>

        <div className="bg-linear-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border border-pink-100">
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-pink-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Calendar className="h-5 w-5 text-pink-500" />
              </div>
              <span className="text-gray-700 font-medium text-lg">
                Pregnancy Week
              </span>
            </div>
            <div className="px-6 py-2 bg-linear-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full text-lg shadow-md">
              Week {pregnancyWeek}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-gray-700 font-medium text-lg">
                Date & Time
              </span>
            </div>
            <div className="text-right">
              <div className="text-gray-800 font-semibold">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-gray-600 text-sm mt-0.5">
                {currentDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1.5">Tip</h3>
              <p className="text-blue-800 leading-relaxed">
                Relax in a comfortable position and start counting every
                movement you feel.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowHistory(true)}
            className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <RefreshCw className="h-5 w-5" />
            View Past Logs
          </button>

          <button
            onClick={handleStartTracking}
            className="flex-1 py-4 px-6 bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <Play className="h-5 w-5 fill-white" />
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
}