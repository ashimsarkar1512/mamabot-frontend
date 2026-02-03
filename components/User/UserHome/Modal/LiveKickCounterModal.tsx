"use client";

import {
  X,
  Play,
  RotateCcw,
  ChevronRight,
  Pause,
  Save,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import MovementHistoryModal from "./MovementHistoryModal";
import { useCreatebabyMovementLogMutation } from "@/redux/features/api/user/baby-movement-logs";
import { toast } from "sonner";

interface LiveKickCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingData: {
    week: number;
    date: string;
    time: string;
  };
}

export default function LiveKickCounterModal({
  isOpen,
  onClose,
  trackingData,
}: LiveKickCounterModalProps) {
  const MAX_KICKS = 15;

  const [kicks, setKicks] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [note, setNote] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Lazy initialization of Audio to avoid SSR issues
  const babyKickSoundRef = useRef<HTMLAudioElement | null>(null);

  const getBabyKickSound = () => {
    if (typeof window === "undefined") return null;
    if (!babyKickSoundRef.current) {
      babyKickSoundRef.current = new Audio("/sounds/babykick.mp3");
    }
    return babyKickSoundRef.current;
  };

  const [createBabyMovement, { isLoading }] =
    useCreatebabyMovementLogMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && !isFinished) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, isFinished]);

  const formatTime = (secs: number) => {
    const min = String(Math.floor(secs / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const formatTimeToHHMMSS = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleKickCount = () => {
    if (kicks < MAX_KICKS && !isFinished) {
      // Start tracking and set start time on first kick
      if (!isTracking) {
        setIsTracking(true);
        setStartTime(new Date());
      }

      setKicks((prev) => prev + 1);

      // Play sound
      const sound = getBabyKickSound();
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch((err) => console.log("Sound play failed:", err));
      }
    }
  };

  const handleReset = () => {
    setKicks(0);
    setSeconds(0);
    setIsTracking(false);
    setIsFinished(false);
    setIsSaved(false);
    setNote("");
    setStartTime(null);
    setEndTime(null);
  };

  const handleFinish = () => {
    setIsTracking(false);
    setIsFinished(true);
    setEndTime(new Date());
  };

  const handleSaveLog = async () => {
    if (!startTime) {
      toast.error("Invalid tracking session");
      return;
    }

    const finalEndTime = endTime || new Date();
    const movementStatus = kicks >= 10 ? "normal" : "reduced";

    try {
      // Parse the date string from trackingData
      const logDate = new Date(trackingData.date);
      
      const payload = {
        log_date: logDate.toISOString().split("T")[0], // yyyy-mm-dd
        start_time: formatTimeToHHMMSS(startTime), // hh:mm:ss
        end_time: formatTimeToHHMMSS(finalEndTime), // hh:mm:ss
        kick_count: kicks,
        movement_status: movementStatus,
        pregnancy_week: trackingData.week,
        note: note.trim() || "",
      };

      await createBabyMovement(payload).unwrap();

      toast.success("Baby movement log saved successfully!");
      setIsSaved(true);
    } catch (error: any) {
      console.error("Save log error:", error);
      toast.error(
        error?.data?.error || "Failed to save the log. Please try again."
      );
    }
  };

  const handleAllClose = () => {
    setIsHistoryOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-xl overflow-hidden min-h-100 flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {isSaved ? (
            /* --- LOG SAVED SUCCESS MODAL --- */
            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
              <div className="mb-6">
                <CheckCircle2
                  size={100}
                  className="text-green-500 stroke-[1.5]"
                />
              </div>

              <h2 className="text-[32px] font-semibold text-slate-800 mb-8">
                Log Saved
              </h2>

              <button
                onClick={() => setIsHistoryOpen(true)}
                className="flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-xl text-slate-600 font-medium hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={18} />
                View Past Logs
              </button>
            </div>
          ) : !isFinished ? (
            /* --- KICK COUNTER INTERFACE --- */
            <>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/user/baby1.png"
                    width={36}
                    height={36}
                    alt="Baby icon"
                  />
                </div>
                <h2 className="text-[20px] font-medium text-slate-700">
                  Live Kick Counter
                </h2>
              </div>

              <div className="bg-[#fff5f8] border border-pink-100 rounded-xl p-5 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#5b638c] font-medium">
                    Tracking Time
                  </span>
                  <span className="text-2xl font-normal text-slate-800 tabular-nums">
                    {formatTime(seconds)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e63c8a] transition-all duration-500"
                    style={{ width: `${(kicks / MAX_KICKS) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center mb-8">
                <p className="text-[#7d85a0] font-medium mb-2">Total Kicks</p>
                <span className="text-[80px] font-normal text-[#d6336c] mb-3">
                  {kicks}
                </span>
                <button
                  onClick={handleKickCount}
                  disabled={kicks >= MAX_KICKS}
                  className="w-28 h-28 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed relative"
                  aria-label="Count kick"
                >
                  <Image
                    src="/images/user/kicks.png"
                    alt="Kick button"
                    width={112}
                    height={112}
                    priority
                  />
                </button>
              </div>

              <div className="bg-[#fcfaff] border border-pink-50 rounded-2xl p-5 mb-8 text-[#5b638c] text-sm leading-relaxed">
                <span className="font-bold">Tip: </span> On average, babies{" "}
                <span className="text-[#e63c8a] font-bold">Kick 15</span> times
                within 1 hour.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsTracking(!isTracking)}
                  disabled={kicks === 0}
                  className="flex-1 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  {isTracking ? <Pause size={18} /> : <Play size={18} />}{" "}
                  {isTracking ? "Pause" : "Play"}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw size={18} /> Reset
                </button>
                <button
                  onClick={handleFinish}
                  disabled={kicks === 0}
                  className="flex-1 py-3 bg-[#e63c8a] text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#d12e76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Finish <ChevronRight size={18} />
                </button>
              </div>
            </>
          ) : (
            /* --- TRACKING SUMMARY INTERFACE --- */
            <div className="animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/user/baby1.png"
                    width={36}
                    height={36}
                    alt="Baby icon"
                  />
                </div>
                <h2 className="text-[20px] font-medium text-slate-700">
                  Tracking Summary
                </h2>
              </div>

              <div className="border border-pink-100 rounded-2xl p-6 mb-6 space-y-4">
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500">Total Kicks Counted</span>
                  <span
                    className={`font-bold ${kicks < 10 ? "text-red-500" : "text-pink-600"}`}
                  >
                    {kicks}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-slate-700">
                    {formatTime(seconds)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Movement Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${kicks >= 10 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    {kicks >= 10 ? "Normal" : "Alert"}
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${kicks >= 10 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                <span className="text-lg">{kicks >= 10 ? "✅" : "⚠️"}</span>
                <p className="text-sm">
                  {kicks >= 10
                    ? "Great! Your baby's movement is within the normal range."
                    : "Movement is significantly reduced. Contact healthcare provider."}
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  rows={3}
                  placeholder="E.g., 'Felt less movement tonight'..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsFinished(false)}
                  disabled={isLoading}
                  className="flex-1 py-4 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <X size={18} /> Discard
                </button>
                <button
                  onClick={handleSaveLog}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-[#e63c8a] text-white rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-[#d12e76] transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save size={18} /> Save Log
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <MovementHistoryModal
        isOpen={isHistoryOpen}
        onClose={handleAllClose}
        onBack={() => setIsHistoryOpen(false)}
      />
    </>
  );
}