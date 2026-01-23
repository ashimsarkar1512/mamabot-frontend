"use client";

import { X, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import BabyMovementModal from "./BabyMovementModal";

interface MovementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export default function MovementHistoryModal({ isOpen, onClose, onBack }: MovementHistoryModalProps) {

    const [showMonitoring, setShowMonitoring] = useState(false);

  if (showMonitoring) {
    return (
      <BabyMovementModal
        isOpen={true} 
        onClose={onClose} 
        pregnancyWeek={22} 
      />
    );
  }


  if (!isOpen) return null;

  const historyData = [
    { id: 1, date: "2025-10-21", time: "09:32 AM", kicks: 15, duration: "0:08", status: "Normal" },
    { id: 2, date: "2025-10-19", time: "05:45 PM", kicks: 8, duration: "65:00", status: "Below Average" },
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-2xl">👶</div>
            <h2 className="text-[22px] font-bold text-slate-800">Movement History & Insights</h2>
          </div>
          <p className="text-gray-500 text-sm">Track your baby's movement patterns over time</p>
        </div>

        {/* AI Insight Card */}
        <div className="bg-[#f8f5ff] border border-purple-100 rounded-2xl p-5 mb-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
            <TrendingUp className="text-purple-500" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-purple-900 mb-1">AI Insight</h3>
            <p className="text-purple-800 text-sm leading-relaxed">
              Your baby's movement is consistent with week 22. Average of 14 kicks per session.
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4 mb-8">
          {historyData.map((item) => (
            <div key={item.id} className="border border-pink-100 rounded-2xl p-5 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-slate-700">{item.date}</div>
                  <div className="text-xs text-gray-400">{item.time}</div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === 'Normal' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {item.status === 'Normal' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {item.status}
                </span>
              </div>
              
              <div className="flex gap-12">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Kicks</p>
                  <p className="font-bold text-pink-600 text-lg">{item.kicks}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Duration</p>
                  <p className="font-bold text-slate-700 text-lg">{item.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
         onClick={() => setShowMonitoring(true)}
          className="w-full py-4 border border-gray-200 rounded-xl text-slate-700 font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          Back To Monitoring
        </button>
      </div>
    </div>
  );
}