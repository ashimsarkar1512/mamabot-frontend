"use client";


// "use client";

// import { useCreateHydrationLogMutation, useGetHydrationLogsQuery } from "@/redux/features/api/user/hydration";
// import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
// import { X } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface HydrationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentGlasses?: number;
// }

// export default function HydrationModal({
//   isOpen,
//   onClose,
//   currentGlasses = 0,
// }: HydrationModalProps) {
//   const maxGlasses = 10;

//   const [glasses, setGlasses] = useState(currentGlasses);
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
// const{data:profile}=useGetMyProfileQuery(undefined)
// console.log(profile,"profile gfdgdfgdfgddff ")
// const {data:hydration}=useGetHydrationLogsQuery(undefined)
// console.log(hydration,"hydration fghfghfghfgfhfgh")
// const [hydrationCreate]=useCreateHydrationLogMutation()

//   // ⏱ Timer logic
//   useEffect(() => {
//     if (!isRunning) return;

//     const interval = setInterval(() => {
//       setSeconds((prev) => prev + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isRunning]);

//   // ⏱ Format time mm:ss
//   const formatTime = (secs: number) => {
//     const min = String(Math.floor(secs / 60)).padStart(2, "0");
//     const sec = String(secs % 60).padStart(2, "0");
//     return `${min}:${sec}`;
//   };

//   // 🥛 Click glass → increase count + start timer
//   const handleGlassClick = () => {
//     if (glasses < maxGlasses) {
//       setGlasses((prev) => prev + 1);
//       setIsRunning(true);
//     }
//   };

//   // 🔄 Reset everything
//   const handleReset = () => {
//     setGlasses(0);
//     setSeconds(0);
//     setIsRunning(false);
//   };

//   // ✅ Finish → stop timer + close modal
//   const handleFinish = () => {
//     setIsRunning(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
//         >
//           <X className="h-6 w-6 text-gray-600" />
//         </button>

//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//             <svg
//             className="h-8 w-8"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12.6453 3.25195V4.28345C12.6453 4.45605 12.7136 4.62134 12.8357 4.74341L14.8193 6.72705C15.551 7.45874 15.9622 8.45142 15.9622 9.48633V14.1138C15.9622 14.4587 15.8252 14.7898 15.5813 15.0337L15.4978 15.1172C15.2539 15.3611 15.1167 15.6919 15.1167 16.0369V17.4309C15.1167 17.7759 15.2539 18.1067 15.4978 18.3506L15.5813 18.4341C15.8252 18.6782 15.9622 19.009 15.9622 19.354V29.3982C15.9622 30.8352 14.7974 32 13.3606 32H6.72656C5.28979 32 4.125 30.8352 4.125 29.3982V19.354C4.125 19.009 4.26196 18.6782 4.50586 18.4343L4.58936 18.3508C4.83325 18.1069 4.97046 17.7759 4.97046 17.4309V16.0371C4.97046 15.6919 4.83325 15.3611 4.58936 15.1172L4.50586 15.0337C4.26196 14.7898 4.125 14.459 4.125 14.1138V9.48633C4.125 8.45142 4.53589 7.45898 5.26782 6.72705L7.25146 4.74341C7.37354 4.62134 7.44189 4.45605 7.44189 4.28345V3.25195H12.6453Z"
//               fill="#D7F1FF"
//             />
//             <path
//               d="M4.125 12.0325C4.125 12.0325 4.91016 11.1218 7.08447 11.1218C8.71045 11.1218 10.0437 12.0325 10.0437 12.0325C10.0437 12.0325 11.5398 12.9431 13.0032 12.9431C15.1775 12.9431 15.9624 12.0325 15.9624 12.0325V29.3982C15.9624 30.8352 14.7976 32 13.3608 32H6.72681C5.29004 32 4.12524 30.8352 4.12524 29.3982V12.0325H4.125Z"
//               fill="#5ACEF2"
//             />
//           </svg>
//           <h2 className="text-2xl font-bold text-gray-800">Hydration Goal</h2>
//         </div>

//         {/* Progress */}
//         <div className="bg-cyan-50 rounded-2xl p-6 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-cyan-600 font-medium">Glass of water</span>
//             <span className="text-gray-600 font-mono font-medium">
//               {formatTime(seconds)}
//             </span>
//           </div>

//           <div className="h-2 bg-cyan-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-cyan-500 transition-all duration-500 ease-out"
//               style={{ width: `${(glasses / maxGlasses) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Total Drunk */}
//         <div className="text-center mb-4">
//           <h3 className="text-xl text-gray-700 mb-3">Total Drunk</h3>

//           <div className="text-5xl font-bold text-cyan-500 mb-3">{glasses}</div>

//           {/* Clickable Glass */}
//           <div className="flex justify-center mb-12">
//             <div
//               onClick={handleGlassClick}
//               className="
//                 relative w-32 h-32
//                 rounded-full
//                 bg-[#E9F5FA]
//                 flex items-center justify-center
//                 cursor-pointer
//                 active:scale-95
//                 transition
//                 shadow-[inset_-4px_0_12.444px_rgba(0,0,0,0.12),inset_3.111px_0_12.444px_rgba(0,0,0,0.12),inset_0_-3.111px_12.444px_rgba(0,0,0,0.12),inset_0_3.111px_12.444px_rgba(0,0,0,0.12)]
//               "
//             >
//               <Image
//                 src="/images/user/glass.png"
//                 alt="glass"
//                 width={80}
//                 height={80}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleReset}
//             className="
//     flex-1
//     py-3 px-6
//     border border-white
//     text-gray-700 font-medium
//     rounded-xl
   
//     transition-colors
//     flex items-center justify-center gap-2 cursor-pointer
//   "
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//               />
//             </svg>
//             Reset
//           </button>

//           <button
//             onClick={handleFinish}
//             disabled={glasses === 0}
//             className={`flex-1 py-3 px-6 font-medium rounded-xl transition-all ${
//               glasses === 0
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-secondary text-white  cursor-pointer"
//             }`}
//           >
//             Finish
//           </button>
//         </div>

//         {/* Footer text */}
//         <p className="text-center text-sm text-gray-500">
//           {glasses} of {maxGlasses} glasses completed
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useCreateHydrationLogMutation, useGetHydrationLogsQuery } from "@/redux/features/api/user/hydration";
import { IProfileResponse } from "@/types/user/profile";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface HydrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: IProfileResponse;

}

export default function HydrationModal({ isOpen, onClose,profile }: HydrationModalProps) {
  const maxGlasses = 10;

  // Redux queries
 
  const { data: hydrationLogs, isLoading: isFetchingLogs } = useGetHydrationLogsQuery(undefined);
  console.log(hydrationLogs,"hayfsferdf")
  const [createHydration, { isLoading: isPosting }] = useCreateHydrationLogMutation();

  // ✅ Determine today's log
const todayLog = hydrationLogs?.data ?? null;
  

    console.log(todayLog,"fkjlatfg")
    const waterSound = new Audio("/sounds/drinkwater1.mp3");
    waterSound.preload = "auto";

  // State
 const [glasses, setGlasses] = useState<number>(todayLog?.glass_count || 0);
const [seconds, setSeconds] = useState<number>(todayLog?.duration_seconds || 0);
const [isRunning, setIsRunning] = useState<boolean>(false);
useEffect(() => {
  if (todayLog) {
    setGlasses(todayLog.glass_count);
    setSeconds(todayLog.duration_seconds);
  }
}, [todayLog]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1); // ✅ TypeScript infers prev as number
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format mm:ss
  const formatTime = (secs: number) => {
    const min = String(Math.floor(secs / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Click glass → increment + start timer
  const handleGlassClick = () => {
    if (glasses < maxGlasses) {
      setGlasses(prev => prev + 1);
      setIsRunning(true);
      waterSound.currentTime = 0;
    waterSound.play().catch(err => console.log("Sound play failed:", err));
    }
  };

  // Reset
  const handleReset = () => {
    setGlasses(0);
    setSeconds(0);
    setIsRunning(false);
  };

  // Finish → post hydration log + toast + close
  const handleFinish = async () => {
    setIsRunning(false);
    try {
      await createHydration({
        glass_count: glasses,
        duration_seconds: seconds,
      }).unwrap();

      toast.success("Hydration log saved!");
    } catch (err) {
      console.error("Failed to post hydration log:", err);
      toast.error("Failed to save hydration log.");
    }

    onClose();
  };

  if (!isOpen) return null;

  // ✅ Show loading if fetching previous logs
  if (isFetchingLogs) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          Loading hydration logs...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6453 3.25195V4.28345C12.6453 4.45605 12.7136 4.62134 12.8357 4.74341L14.8193 6.72705C15.551 7.45874 15.9622 8.45142 15.9622 9.48633V14.1138C15.9622 14.4587 15.8252 14.7898 15.5813 15.0337L15.4978 15.1172C15.2539 15.3611 15.1167 15.6919 15.1167 16.0369V17.4309C15.1167 17.7759 15.2539 18.1067 15.4978 18.3506L15.5813 18.4341C15.8252 18.6782 15.9622 19.009 15.9622 19.354V29.3982C15.9622 30.8352 14.7974 32 13.3606 32H6.72656C5.28979 32 4.125 30.8352 4.125 29.3982V19.354C4.125 19.009 4.26196 18.6782 4.50586 18.4343L4.58936 18.3508C4.83325 18.1069 4.97046 17.7759 4.97046 17.4309V16.0371C4.97046 15.6919 4.83325 15.3611 4.58936 15.1172L4.50586 15.0337C4.26196 14.7898 4.125 14.459 4.125 14.1138V9.48633C4.125 8.45142 4.53589 7.45898 5.26782 6.72705L7.25146 4.74341C7.37354 4.62134 7.44189 4.45605 7.44189 4.28345V3.25195H12.6453Z"
              fill="#D7F1FF"
            />
            <path
              d="M4.125 12.0325C4.125 12.0325 4.91016 11.1218 7.08447 11.1218C8.71045 11.1218 10.0437 12.0325 10.0437 12.0325C10.0437 12.0325 11.5398 12.9431 13.0032 12.9431C15.1775 12.9431 15.9624 12.0325 15.9624 12.0325V29.3982C15.9624 30.8352 14.7976 32 13.3608 32H6.72681C5.29004 32 4.12524 30.8352 4.12524 29.3982V12.0325H4.125Z"
              fill="#5ACEF2"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Hydration Goal</h2>
        </div>

        {/* Progress */}
        <div className="bg-cyan-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-cyan-600 font-medium">Glass of water</span>
            <span className="text-gray-600 font-mono font-medium">{formatTime(seconds)}</span>
          </div>
          <div className="h-2 bg-cyan-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${(glasses / maxGlasses) * 100}%` }}
            />
          </div>
        </div>

        {/* Total Drunk */}
        <div className="text-center mb-4">
          <h3 className="text-xl text-gray-700 mb-3">Total Drunk</h3>
          <div className="text-5xl font-bold text-cyan-500 mb-3">{glasses}</div>
          <div className="flex justify-center mb-12">
            <div
              onClick={handleGlassClick}
              className={`relative w-32 h-32 rounded-full bg-[#E9F5FA] flex items-center justify-center 
                ${glasses === maxGlasses ? "cursor-not-allowed opacity-70" : "cursor-pointer"} 
                active:scale-95 transition shadow-[inset_-4px_0_12.444px_rgba(0,0,0,0.12),inset_3.111px_0_12.444px_rgba(0,0,0,0.12),inset_0_-3.111px_12.444px_rgba(0,0,0,0.12),inset_0_3.111px_12.444px_rgba(0,0,0,0.12)]`}
            >
              <Image src="/images/user/glass.png" alt="glass" width={80} height={80} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-6 border border-white text-gray-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg
               className="w-5 h-5"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
               />
             </svg>
            Reset
          </button>

          <button
            onClick={handleFinish}
            disabled={glasses === 0 || isPosting}
            className={`flex-1 py-3 px-6 font-medium rounded-xl transition-all ${
              glasses === 0 || isPosting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-secondary text-white cursor-pointer"
            }`}
          >
            {isPosting ? "Saving..." : "Finish"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">{glasses} of {maxGlasses} glasses completed</p>
      </div>
    </div>
  );
}
