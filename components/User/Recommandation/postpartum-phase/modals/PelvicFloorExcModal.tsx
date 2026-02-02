/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Play, Pause, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import StepControllButtons from "../../../postpartumPhase/daily-task-modals/reusable/StepControllButtons";
import TipsCard from "../../../postpartumPhase/daily-task-modals/reusable/TipsCard";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import CommonAlert from "@/components/User/postpartumPhase/daily-task-modals/reusable/CommonAlert";
import { 
  useGetPelvicExerciseLogsQuery,
  useCreatePelvicExerciseLogMutation 
} from "@/redux/features/api/user/postpurtum/palvicLog";
import { toast } from "sonner";

type FormData = {
  streak: number;
  time: number;
  tip: string;
};

const STEPS = [
  "Inhale and relax.",
  "Tighten your pelvic floor muscles.",
  "Hold for 3-5 seconds.",
  "Release and breathe out.",
  "Repeat",
];

const EXERCISE_DURATION = 180; // 3 minutes in seconds

export default function PelvicFloorExcModal() {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(EXERCISE_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // API hooks
  const { data, isLoading } = useGetPelvicExerciseLogsQuery(undefined);
  const [createPelvicExerciseLog, { isLoading: isSubmitting }] = 
    useCreatePelvicExerciseLogMutation();

  const [formData, setFormData] = useState<FormData>({
    streak: 0,
    time: 0,
    tip: "Consistency strengthens your core and speeds recovery.",
  });

  // Check if today's exercise is already completed
  const todayLog = data?.data;
  const isCompletedToday = todayLog?.completed === true;

  // useEffect(() => {
  //   if (isCompletedToday) {
  //     toast.info("You've already completed today's pelvic floor exercise!");
  //   }
  // }, [isCompletedToday]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimerComplete = async () => {
    try {
      await createPelvicExerciseLog({
        completed: true,
        duration_seconds: EXERCISE_DURATION,
        log_date: new Date().toISOString().split("T")[0],
        skipped: false,
      }).unwrap();

      toast.success("Great job! Exercise completed successfully!");
      next();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save exercise log");
    }
  };

  const handleSkip = () => {
    if (isSubmitting) return; // Prevent multiple clicks
    
    createPelvicExerciseLog({
      completed: false,
      duration_seconds: EXERCISE_DURATION - timer,
      log_date: new Date().toISOString().split("T")[0],
      skipped: true,
    }).unwrap()
      .then(() => {
        toast.info("Exercise skipped");
        next();
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || "Failed to save skip log");
      });
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleFinish = () => {
    setStep(0);
    setTimer(EXERCISE_DURATION);
    setIsTimerRunning(false);
    setFormData({
      streak: 0,
      time: 0,
      tip: "Consistency strengthens your core and speeds recovery.",
    });
  };

  const handleStartTimer = () => {
    setTimer(EXERCISE_DURATION);
    setIsTimerRunning(true);
    next();
  };

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Pelvic Floor Exercise"
            description="After vaginal delivery, pelvic muscles may feel weak or strained. Gentle daily exercises help restore strength and bladder control."
            buttonText={isCompletedToday ? "View Exercise" : "Start Exercise"}
            onNext={next}
          />
        );

      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-center text-lg font-semibold">
              How to Perform
            </h1>

            <div>
              <p className="text-sm font-medium mb-2">Steps to follow</p>
              <ul className="space-y-2">
                {STEPS.map((step, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#229ECF]/10 text-[#229ECF] rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-500">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <TipsCard
              title="Note"
              tips="Avoid tightening stomach or thigh muscles."
            />

            <StepControllButtons
              back={back}
              next={handleStartTimer}
              forwardBtnName="Start Timer"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-center text-lg font-semibold">
              Kegel Exercise
            </h1>
            
            {/* Timer Display with Play/Pause Button */}
            <div 
              className="w-fit mx-auto p-1 text-center text-lg font-semibold border-2 border-[#229ECF]/50 rounded-full cursor-pointer hover:border-[#229ECF] transition-colors"
              onClick={toggleTimer}
            >
              <div className="w-20 h-20 rounded-full bg-[#229ECF]/10 text-3xl mx-auto flex items-center justify-center">
                {isTimerRunning ? (
                  <Pause className="w-10 h-10 text-[#229ECF]" />
                ) : (
                  <Play className="w-10 h-10 text-[#229ECF] ml-1" />
                )}
              </div>
            </div>

            {/* Timer Text */}
            <h1 className="text-center text-4xl font-bold text-[#229ECF]">
              {formatTime(timer)}
            </h1>

            {/* Status Text */}
            <p className="text-center text-sm text-gray-500">
              {isTimerRunning ? "Exercise in progress..." : "Tap play to start"}
            </p>

            <CommonAlert alert="Repeat the tighten-hold-release cycle." />
            
            <StepControllButtons
              back={back}
              next={handleSkip}
              forwardBtnName={isSubmitting ? "Skipping..." : "Skip"}
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h3 className="text-sm font-regular">Well Done!</h3>
              <p className="text-sm text-gray-500">
                You finished today&apos;s pelvic floor session.
              </p>
            </div>

            <div className="px-2 py-1 border border-[#229ECF]/40 rounded-lg">
              <TipsCard tips="Consistency improves recovery and comfort." />
            </div>
            <DialogClose asChild>
              <Button className="w-full" onClick={handleFinish}>
                Back to Recommendation
              </Button>
            </DialogClose>
          </div>
        );
    }
  }

  if (isLoading) {
    return (
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#229ECF]"></div>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle> </DialogTitle>
      </DialogHeader>

      {renderStep()}
    </DialogContent>
  );
}