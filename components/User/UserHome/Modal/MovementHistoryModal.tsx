"use client";

import { useGetbabyMovementLogsQuery } from "@/redux/features/api/user/baby-movement-logs";
import { X, TrendingUp, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useMemo } from "react";

interface MovementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface BabyMovementLog {
  id: number;
  user_id: number;
  log_date: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  kick_count: number;
  movement_status: "normal" | "reduced";
  note: string;
  pregnancy_week: number;
  created_at: string;
  updated_at: string;
}

export default function MovementHistoryModal({
  isOpen,
  onClose,
  onBack,
}: MovementHistoryModalProps) {
  const { data: movement, isLoading, error } = useGetbabyMovementLogsQuery(undefined);

  // Calculate insights from movement data
  const insights = useMemo(() => {
    if (!movement?.data || movement.data.length === 0) {
      return {
        averageKicks: 0,
        totalSessions: 0,
        normalSessions: 0,
        reducedSessions: 0,
      };
    }

    const logs = movement.data as BabyMovementLog[];
    const totalKicks = logs.reduce((sum, log) => sum + log.kick_count, 0);
    const normalSessions = logs.filter((log) => log.movement_status === "normal").length;
    const reducedSessions = logs.filter((log) => log.movement_status === "reduced").length;

    return {
      averageKicks: Math.round(totalKicks / logs.length),
      totalSessions: logs.length,
      normalSessions,
      reducedSessions,
    };
  }, [movement]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
              👶
            </div>
            <h2 className="text-[22px] font-bold text-slate-800">
              Movement History & Insights
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Track your baby's movement patterns over time
          </p>
        </div>

        {/* AI Insight Card */}
        {!isLoading && insights.totalSessions > 0 && (
          <div className="bg-[#f8f5ff] border border-purple-100 rounded-2xl p-5 mb-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
              <TrendingUp className="text-purple-500" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-purple-900 mb-1">AI Insight</h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                You've tracked {insights.totalSessions} session{insights.totalSessions !== 1 ? "s" : ""} with an average of {insights.averageKicks} kicks per session.
                {insights.normalSessions > 0 && (
                  <> {insights.normalSessions} session{insights.normalSessions !== 1 ? "s" : ""} showed normal movement patterns.</>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm">
              Failed to load movement history. Please try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!movement?.data || movement.data.length === 0) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Movement Logs Yet
            </h3>
            <p className="text-gray-500 text-sm">
              Start tracking your baby's movements to see the history here
            </p>
          </div>
        )}

        {/* History List */}
        {!isLoading && movement?.data && movement.data.length > 0 && (
          <div className="space-y-4 mb-8">
            {(movement.data as BabyMovementLog[])
              .sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime())
              .map((item) => (
                <div
                  key={item.id}
                  className="border border-pink-100 rounded-2xl p-5 relative hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-slate-700">
                        {formatDate(item.log_date)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatTime(item.start_time)} - {formatTime(item.end_time)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Week {item.pregnancy_week}
                      </div>
                    </div>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        item.movement_status === "normal"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.movement_status === "normal" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <AlertCircle size={14} />
                      )}
                      {item.movement_status === "normal" ? "Normal" : "Alert"}
                    </span>
                  </div>

                  <div className="flex gap-12 mb-3">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Kicks</p>
                      <p className="font-bold text-pink-600 text-lg">
                        {item.kick_count}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Duration</p>
                      <p className="font-bold text-slate-700 text-lg">
                        {formatDuration(item.duration_seconds)}
                      </p>
                    </div>
                  </div>

                  {item.note && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-xs text-gray-600 italic">
                        Note: {item.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-4 border border-gray-200 rounded-xl text-slate-700 font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          Back To Monitoring
        </button>
      </div>
    </div>
  );
}