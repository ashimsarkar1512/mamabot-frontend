
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Play, Pause, RotateCw, Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "./reusable/StepControllButtons";
import ModalHeadingOne from "./reusable/ModalHeadingOne";
import TipsCard from "./reusable/TipsCard";
import SummeryTable from "./reusable/SummeryTable";
import FirstStep from "./reusable/FirstStep";
import { toast } from "sonner";
import { useCreatePelvicExerciseLogMutation, useGetPelvicExerciseLogsQuery } from "@/redux/features/api/user/postpurtum/palvicLog";

type FormData = {
  streak: number;
  time: number;
  tip: string;
  completed: boolean;
  skipped: boolean;
};

const STEPS = [
  "Inhale and relax.",
  "Tighten your pelvic floor muscles.",
  "Hold for 3-5 seconds.",
  "Release and breathe out.",
  "Repeat",
];

const EXERCISE_DURATION = 180; // 3 minutes in seconds

export default function PelvicFloorExerciseModal() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(EXERCISE_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasExistingLog, setHasExistingLog] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch existing logs
  const { data: logsData } = useGetPelvicExerciseLogsQuery(undefined);
  const [createPelvicExerciseLog] = useCreatePelvicExerciseLogMutation();

  const [formData, setFormData] = useState<FormData>({
    streak: 0,
    time: 0,
    tip: "Consistency strengthens your core and speeds recovery.",
    completed: false,
    skipped: false,
  });

  // Load existing data from GET API
  useEffect(() => {
    if (logsData?.data) {
      const existingLog = logsData.data;
      console.log("Existing log data:", existingLog);

      // Check if this is today's log
      const today = new Date().toISOString().split("T")[0];
      const logDate = existingLog.log_date?.split("T")[0];
      
      if (logDate === today) {
        // User already has a log for today
        setHasExistingLog(true);
        
        // Pre-fill form with existing data
        setFormData({
          streak: existingLog.streak_count || 0,
          time: existingLog.duration_seconds || 0,
          tip: existingLog.tip_shown || "Consistency strengthens your core and speeds recovery.",
          completed: existingLog.completed || false,
          skipped: existingLog.skipped || false,
        });

        // If already completed today, show success message
        if (existingLog.completed) {
          toast.info("You've already completed today's exercise!");
        }
      } else {
        // No log for today, but we have streak from previous logs
        setHasExistingLog(false);
        setFormData(prev => ({
          ...prev,
          streak: existingLog.streak_count || 0,
        }));
      }
    }
  }, [logsData]);

  // Initialize audio on component mount
  useEffect(() => {
    // You can use a royalty-free meditation/relaxation music URL
    // For now, using a placeholder - replace with your music file
    audioRef.current = new Audio("/sounds/meditation-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timer]);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const togglePlayPause = () => {
    setIsRunning(!isRunning);
    
    if (audioRef.current) {
      if (!isRunning) {
        audioRef.current.play().catch(err => {
          console.log("Audio play failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleExerciseComplete = async () => {
    const completedTime = EXERCISE_DURATION - timer;
    
    try {
      const payload = {
        completed: true,
        duration_seconds: completedTime,
        log_date: new Date().toISOString().split("T")[0],
        skipped: false,
      };

      console.log("Submitting payload:", payload);
      await createPelvicExerciseLog(payload).unwrap();
      
      // Update form data with new values
      setFormData(prev => ({
        ...prev,
        time: completedTime,
        completed: true,
        skipped: false,
        // Increment streak only if completing for first time today
        streak: hasExistingLog && prev.completed ? prev.streak : prev.streak + 1,
      }));

      toast.success("Exercise completed!");
      next();
    } catch (error: any) {
      console.error("Failed to save exercise log", error);
      
      let errorMessage = "Failed to save exercise log";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.error) {
        errorMessage = error.data.error;
      }
      
      toast.error(errorMessage);
    }
  };

  const handleSkip = async () => {
    setIsRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const completedTime = EXERCISE_DURATION - timer;

    try {
      const payload = {
        completed: false,
        duration_seconds: completedTime,
        log_date: new Date().toISOString().split("T")[0],
        skipped: true,
      };

      console.log("Skipping with payload:", payload);
      await createPelvicExerciseLog(payload).unwrap();
      
      setFormData(prev => ({
        ...prev,
        time: completedTime,
        completed: false,
        skipped: true,
      }));

      toast.info("Exercise skipped");
      next();
    } catch (error: any) {
      console.error("Failed to save exercise log", error);
      
      let errorMessage = "Failed to save exercise log";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.error) {
        errorMessage = error.data.error;
      }
      
      toast.error(errorMessage);
    }
  };

  const handleFinish = () => {
    setStep(0);
    setTimer(EXERCISE_DURATION);
    setIsRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercentage = ((EXERCISE_DURATION - timer) / EXERCISE_DURATION) * 100;

  function renderStep() {
    switch (step) {
      // STEP 0 — INTRO
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Pelvic Floor Exercise"
            description={
              hasExistingLog && formData.completed
                ? "You've already completed today's exercise. Great job keeping up your streak!"
                : "Strengthen your pelvic floor with quick Kegel exercises. This helps with bladder control and overall postpartum recovery."
            }
            buttonText={
              hasExistingLog && formData.completed
                ? "Do It Again"
                : "Start Exercise"
            }
            onNext={next}
          />
        );

      // STEP 1 — EXERCISE
      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <h1 className="text-center text-lg font-semibold flex-1">
                Kegel Exercise
              </h1>
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-600" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#229ECF]" />
                )}
              </button>
            </div>

            {/* Show current streak */}
            {formData.streak > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Current Streak:{" "}
                  <span className="font-bold text-[#229ECF]">
                    {formData.streak} days 🔥
                  </span>
                </p>
              </div>
            )}

            <div className="w-fit mx-auto relative">
              {/* Progress Circle */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#229ECF"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                
                {/* Play/Pause button in center */}
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={isRunning ? "Pause" : "Play"}
                >
                  <div className="w-20 h-20 rounded-full bg-[#229ECF]/10 hover:bg-[#229ECF]/20 flex items-center justify-center transition-colors">
                    {isRunning ? (
                      <Pause className="w-10 h-10 text-[#229ECF]" />
                    ) : (
                      <Play className="w-10 h-10 text-[#229ECF] ml-1" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <h1 className="text-center text-4xl font-semibold text-[#229ECF]">
              {formatTime(timer)}
            </h1>

            <div>
              <p className="text-sm font-medium mb-3">Steps to follow</p>
              <ul className="space-y-2">
                {STEPS.map((stepText, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#229ECF]/10 text-[#229ECF] rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{stepText}</span>
                  </li>
                ))}
              </ul>
            </div>

            <StepControllButtons
              back={back}
              next={handleSkip}
              forwardBtnName="Skip"
            />
          </div>
        );

      // STEP 2 — SUCCESS
      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold">
                {formData.completed ? "Great Job!" : "Exercise Skipped"}
              </h3>
              <p className="text-sm text-gray-500">
                {formData.completed
                  ? "You finished today's pelvic floor session."
                  : "You can try again later."}
              </p>
            </div>

            <SummeryTable
              items={[
                {
                  label: "Streak: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold text-md">
                      {formData.streak} days 🔥
                    </p>
                  ),
                },
                {
                  label: "Time: ",
                  value: (
                    <p className="text-[#229ECF] font-semibold text-md">
                      {formatTime(formData.time)}
                    </p>
                  ),
                },
                {
                  label: "Status: ",
                  value: (
                    <p className={`font-semibold text-md ${
                      formData.completed ? "text-green-600" : "text-orange-600"
                    }`}>
                      {formData.completed ? "✓ Completed" : "⊘ Skipped"}
                    </p>
                  ),
                },
              ]}
            >
              <TipsCard tips={formData.tip} />
            </SummeryTable>
            <DialogClose asChild>
              <Button className="w-full" onClick={handleFinish}>
                Done
              </Button>
            </DialogClose>
          </div>
        );
    }
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Pelvic Floor Exercise</DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}