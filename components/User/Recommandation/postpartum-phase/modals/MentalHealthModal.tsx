/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Heart, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import LastModalHeader from "../../../postpartumPhase/daily-task-modals/reusable/LastModalHeader";
import Link from "next/link";
import { useCreateMentalHealthLogMutation, useGetMentalHealthLogsQuery } from "@/redux/features/api/user/postpurtum/mentalHealth";
import { toast } from "sonner";

type MentalHealthData = {
  mood: string;
  energy: string;
  sleep: string;
};

// Helper function to generate tips based on mood, energy, and sleep
const generateTip = (mood: string, energy: string, sleep: string): string => {
  const moodLower = mood.toLowerCase();
  const energyLower = energy.toLowerCase();
  const sleepLower = sleep.toLowerCase();

  // Tips based on combinations
  if (moodLower === "calm" && energyLower === "good" && sleepLower === "good") {
    return "You're doing great! Keep maintaining this balanced routine.";
  }
  
  if (sleepLower === "poor") {
    return "Quality sleep is crucial for recovery. Try to rest when your baby sleeps and create a calm bedtime routine.";
  }
  
  if (moodLower === "overwhelmed" || moodLower === "anxious") {
    return "It's okay to feel this way. Consider talking to someone you trust or reaching out for professional support.";
  }
  
  if (energyLower === "low") {
    return "Low energy is common after childbirth. Stay hydrated, eat nutritious meals, and rest whenever possible.";
  }
  
  if (moodLower === "sad") {
    return "Your feelings are valid. Make sure to connect with loved ones and don't hesitate to seek help if needed.";
  }
  
  if (moodLower === "tired") {
    return "Fatigue is normal for new mothers. Prioritize rest and accept help from family and friends.";
  }

  if (energyLower === "good" && sleepLower === "good") {
    return "Great job taking care of yourself! Your body and mind are recovering well.";
  }

  if (moodLower === "calm" && sleepLower === "poor") {
    return "You're staying calm despite poor sleep - that's wonderful! Try to catch up on rest when you can.";
  }
  
  // Default tip
  return "You're doing great! Remember to take care of yourself while caring for your baby.";
};

export default function MentalHealthModal() {
  const [step, setStep] = useState(0);

  const { data, isLoading, error, refetch } = useGetMentalHealthLogsQuery(undefined);
  const [createMentalHealthLog, { isLoading: isSubmitting }] =
    useCreateMentalHealthLogMutation();

  const [formData, setFormData] = useState<MentalHealthData>({
    mood: "",
    energy: "",
    sleep: "",
  });

  const [serverTip, setServerTip] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  // Handle GET API errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to load mental health logs");
      console.error("Error loading mental health logs:", error);
    }
  }, [error]);

  // Pre-fill form with today's data if it exists
  useEffect(() => {
    if (data?.success && data?.data && Array.isArray(data.data)) {
      const today = new Date().toISOString().split('T')[0];
      
      // Find today's log
      const todayLog = data.data.find((log: any) => log.log_date === today);
      
      if (todayLog) {
        // Capitalize first letter to match form options
        const capitalizeFirst = (str: string) => 
          str.charAt(0).toUpperCase() + str.slice(1);
        
        setFormData({
          mood: capitalizeFirst(todayLog.mood),
          energy: capitalizeFirst(todayLog.energy_level),
          sleep: capitalizeFirst(todayLog.sleep_quality),
        });
        
        if (todayLog.tip) {
          setServerTip(todayLog.tip);
        }
        
        setIsEditing(true);
        // toast.info("Today's check-in loaded. You can update it if needed.");
      }
    }
  }, [data]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.mood || !formData.energy || !formData.sleep) {
      toast.error("Please complete all fields");
      return;
    }
    
    const generatedTip = generateTip(formData.mood, formData.energy, formData.sleep);

    try {
      const payload = {
        log_date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        mood: formData.mood.toLowerCase(),
        energy_level: formData.energy.toLowerCase(),
        sleep_quality: formData.sleep.toLowerCase(),
        tip: generatedTip, 
      };

      const response = await createMentalHealthLog(payload).unwrap();

      if (response?.success) {
        const successMessage = isEditing 
          ? "Mental health check-in updated successfully!" 
          : "Mental health check-in completed successfully!";
        
        toast.success(successMessage);
        
        // Store the tip from server response (backend response theke tip nao, na thakle generated tip use koro)
        let tipToShow = generatedTip;
        
        if (response?.data) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            tipToShow = response.data[0]?.tip || generatedTip;
          } else if (response.data?.tip) {
            tipToShow = response.data.tip;
          }
        }
        
        setServerTip(tipToShow);

        // Refetch the logs to update the list
        refetch();
        
        // Move to next step
        next();
      }
    } catch (err: any) {
      console.error("Error submitting mental health log:", err);
      
      // Handle different error scenarios
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Failed to submit mental health check-in. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      mood: "",
      energy: "",
      sleep: "",
    });
    setServerTip("");
    setIsEditing(false);
    setStep(0);
  };

  return (
    <DialogContent className="max-w-md rounded-3xl">
      <DialogHeader className="hidden">
        <DialogTitle>Mental Health Check</DialogTitle>
      </DialogHeader>

      {step === 0 && (
        <FirstStep
          Icon={Heart}
          title="Emotional Wellbeing"
          description="Mood swings are common after childbirth. Checking in with your emotions helps you care for yourself better."
          buttonText={isEditing ? "Update Today's Check-in" : "How Do You Feel Today?"}
          onNext={next}
        />
      )}

      {step === 1 && (
        <div className="space-y-6">
          <button onClick={back} className="text-sm text-gray-400">
            ← Back
          </button>
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {isEditing ? "Update Daily Check-in" : "Daily Check-in"}
            </h3>
            <p className="text-xs text-gray-400">
              Be honest with yourself. There&apos;s no wrong answer.
            </p>
          </div>

          {/* Selection Groups */}
          {[
            {
              label: "Current Mood",
              key: "mood",
              options: ["Calm", "Tired", "Sad", "Overwhelmed", "Anxious"],
            },
            {
              label: "Energy Level",
              key: "energy",
              options: ["Low", "Medium", "Good"],
            },
            {
              label: "Sleep Quality",
              key: "sleep",
              options: ["Poor", "Fair", "Good"],
            },
          ].map((section) => (
            <div key={section.label} className="space-y-2">
              <p className="text-sm font-medium">{section.label}</p>
              <div className="grid grid-cols-2 gap-2">
                {section.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 border p-2 rounded-xl text-sm cursor-pointer border-gray-100 hover:border-[#229ECF]/30 transition-colors"
                  >
                    <input
                      type="radio"
                      name={section.key}
                      checked={(formData as any)[section.key] === opt}
                      onChange={() =>
                        setFormData({ ...formData, [section.key]: opt })
                      }
                      className="accent-[#229ECF]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button 
            className="w-full bg-[#229ECF]! rounded-xl" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : isEditing ? "Update →" : "Submit →"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 text-center py-4">
          <LastModalHeader title="Check-in Complete" />
          <div className="bg-[#229ECF]/5 p-6 rounded-xl text-left border border-[#229ECF]/10">
            <p className="text-[#229ECF] text-sm font-semibold mb-1">
              Here&apos;s a thought for you:
            </p>
            <p className="text-gray-600 text-sm">
              {serverTip || "It's great that you're taking time to check in with yourself. Keep prioritizing your rest and hydration."}
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/chatBot"
              className="w-full py-3 rounded-3xl text-white bg-[#229ECF]! flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Talk to Mamabot
            </Link>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-500"
                onClick={resetForm}
              >
                Back to Recommendations
              </Button>
            </DialogClose>
          </div>
        </div>
      )}
    </DialogContent>
  );
}