"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Apple, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";
import TipsCard from "../../../postpartumPhase/daily-task-modals/reusable/TipsCard";
import FirstStep from "../../../postpartumPhase/daily-task-modals/reusable/FirstStep";
import Step from "./reusable2/Step";
import TextShowInList from "./reusable2/TextShowInList";
import StepControllButtons from "@/components/User/postpartumPhase/daily-task-modals/reusable/StepControllButtons";
import {
  BabyFeedingModal,
  BabySleepModal,
  DiaperLogModal,
} from "@/components/User/postpartumPhase/daily-task-modals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { resetBabyCareStep } from "@/redux/features/slice/babyCareModalSlice";
import { 
  useCreateBabyCueLogMutation, 
  useGetBabyCueLogsQuery 
} from "@/redux/features/api/user/postpurtum/babyCare";
import { toast } from "sonner";

type FormData = {
  streak: number;
  time: number;
  tip: string;
};

const STEPS = [
  {
    title: "Feeding Basics",
    description: "How often and how much your baby should feed.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 2,
  },
  {
    title: "Sleep Patterns",
    description: "Understand new born sleep cycles and frequent waking",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 4,
  },
  {
    title: "Diaper Expectations",
    description: "What's normal for wet and dirty diapers.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 6,
  },
  {
    title: "Crying & Baby Cues",
    description: "Learn why babies cry and how to respond.",
    icon: <Apple className="text-blue-300" />,
    buttonText: "View",
    stepNumber: 8,
  },
];

const cuesSTEPS = [
  {
    title: "Hold baby close",
    icon: <Apple className="text-blue-300" />,
  },
  {
    title: "Gentle rocking",
    icon: <Apple className="text-blue-300" />,
  },
  {
    title: "Soft talking or humming",
    icon: <Apple className="text-blue-300" />,
  },
  {
    title: "Check diaper and feeding needs",
    icon: <Apple className="text-blue-300" />,
  },
];

const babyFeedingBasicsData: {
  icon: React.ReactNode;
  title: string;
  description: string[];
}[] = [
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "What's Normal",
    description: [
      "Newborns feed every 2—3 hours",
      "Cluster feeding is common",
      "Feeding patterns vary day to day",
    ],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Signs Baby Is Feeding Well",
    description: [
      "Regular wet diapers",
      "Calm after feeding",
      "Steady weight gain",
    ],
  },
];

const babySleepPatternsData: {
  icon: React.ReactNode;
  title: string;
  description: string[];
}[] = [
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "What to Expect",
    description: [
      "Babies sleep 14—17 hours per day",
      "Sleep happens in short stretches",
      "Night waking is normal",
    ],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Safe Sleep Reminder",
    description: [
      "Always place baby on their back",
      "Use a firm mattress",
      "Avoid loose bedding",
    ],
  },
];

const babyDiaperExpectationsData: {
  icon: React.ReactNode;
  title: string;
  description: string[];
}[] = [
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Wet Diapers",
    description: ["6—8 wet diapers per day is normal"],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Dirty Diapers",
    description: [
      "Color and consistency may change",
      "Frequency varies between babies",
    ],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "When to Call Doctor",
    description: [
      "Very few wet diapers",
      "Hard stools or blood",
      "Severe rash",
    ],
  },
];

const babyCuesData: {
  icon: React.ReactNode;
  title: string;
  description: string[];
}[] = [
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Common Reasons Babies Cry",
    description: ["Hunger", "Sleepiness", "Discomfort", "Need to closeness"],
  },
  {
    icon: <Apple size={15} className="text-blue-300" />,
    title: "Common Baby Cues",
    description: [
      "Rooting -> Hungry",
      "Rubbing eyes -> Tired",
      "Clenching fists -> Need closeness",
      "Fussing -> Need comfort",
      "Arching back -> Discomfort",
    ],
  },
];

export default function BabyCareModal() {
  const { data, isLoading, error } = useGetBabyCueLogsQuery(undefined);
  const [createBabyCueLog, { isLoading: isSubmitting }] = useCreateBabyCueLogMutation();

  const babyCareStep = useSelector(
    (state: RootState) => state.babyCareModal.step,
  );
  const dispatch = useDispatch();
  const [step, setStep] = useState(babyCareStep);
  const [shouldClose, setShouldClose] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    streak: 0,
    time: 0,
    tip: "Consistency strengthens your core and speeds recovery.",
  });

  // Check if today's log exists
  const todayLog = data?.data?.[0];
  const todayDate = new Date().toISOString().split("T")[0];
  const hasLoggedToday = todayLog?.log_date === todayDate;

  // Show error toast if GET request fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load baby care logs");
    }
  }, [error]);

  // Show info toast if already logged today
  // useEffect(() => {
  //   if (hasLoggedToday && !isLoading) {
  //     toast.info("You've already logged baby care today!");
  //   }
  // }, [hasLoggedToday, isLoading]);

  const next = () => setStep((s) => s + 1);
  const customNext = (num: number) => setStep(num);
  const back = () => setStep((s) => s - 1);

  const handleFinish = async () => {
    // Don't create log if already logged today
    if (hasLoggedToday) {
      toast.info("Already completed for today");
      setTimeout(() => {
        setShouldClose(true);
        dispatch(resetBabyCareStep());
        setFormData({
          streak: 0,
          time: 0,
          tip: "Consistency strengthens your core and speeds recovery.",
        });
      }, 1000);
      return;
    }

    try {
      await createBabyCueLog({
        log_date: todayDate,
        notes: "Completed baby care basics guide",
        tip: "Try gentle rocking and soothing techniques",
      }).unwrap();

      // Success toast
      toast.success("Baby care guide completed successfully!");

      // Wait for 1.5 seconds before closing modal
      setTimeout(() => {
        setShouldClose(true);
        dispatch(resetBabyCareStep());
        setFormData({
          streak: 0,
          time: 0,
          tip: "Consistency strengthens your core and speeds recovery.",
        });
      }, 1500);
    } catch (error: any) {
      // Error toast
      const errorMessage = error?.data?.message || error?.message || "Failed to save baby care log";
      toast.error(errorMessage);
      console.error("Baby care log error:", error);
    }
  };

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <FirstStep
            Icon={RotateCw}
            title="Baby Care Basics"
            description="The first few weeks with your baby can feel overwhelming. Understanding what's normal helps you feel more confident and calm."
            buttonText={hasLoggedToday ? "Review Baby Care" : "Choose a Topic"}
            onNext={next}
          />
        );

      case 1:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-lg font-semibold t">
              What Would You Like To Learn About?
            </h1>
            <Step steps={STEPS} onNext={customNext} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-2 min-h-[550px] flex flex-col justify-between">
            <TextShowInList
              list={babyFeedingBasicsData}
              title="Baby Feeding Basics"
            />
            <TipsCard
              title=""
              tips="It's normal if your baby wants to feed often, This helps growth and bonding."
            />
            <StepControllButtons
              next={next}
              back={back}
              backBtnName="Back to Baby Care"
              forwardBtnName="Log Baby Feeding"
            />
          </div>
        );

      case 3:
        return (
          <>
            <BabyFeedingModal />
            <DialogClose />
          </>
        );

      case 4:
        return (
          <div className="space-y-2 min-h-[550px] flex flex-col justify-between">
            <TextShowInList
              list={babySleepPatternsData}
              title="New Born Sleep Patterns"
            />
            <TipsCard
              title=""
              tips="Frequent waking does not mean something is wrong."
            />
            <StepControllButtons
              next={next}
              back={back}
              backBtnName="Back to Baby Care"
              forwardBtnName="Track Baby Sleep"
            />
          </div>
        );

      case 5:
        return (
          <>
            <BabySleepModal />
            <DialogClose />
          </>
        );

      case 6:
        return (
          <div className="space-y-2 min-h-[550px] flex flex-col justify-between">
            <TextShowInList
              list={babyDiaperExpectationsData}
              title="Diaper Patterns & What's Normal"
            />
            <StepControllButtons
              next={next}
              back={back}
              backBtnName="Back to Baby Care"
              forwardBtnName="Log Diaper Change"
            />
          </div>
        );

      case 7:
        return (
          <>
            <DiaperLogModal />
            <DialogClose />
          </>
        );

      case 8:
        return (
          <div className="space-y-2 min-h-[550px] flex flex-col justify-between">
            <TextShowInList
              list={babyCuesData}
              title="Understanding Baby Cues"
            />
            <StepControllButtons
              next={next}
              back={back}
              backBtnName="Back to Baby Care"
              forwardBtnName="Try Comfort Tips"
            />
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 min-h-[550px] flex flex-col justify-center">
            <h1 className="text-lg font-semibold t">Soothing Your Baby</h1>
            <Step steps={cuesSTEPS} />
            
            {shouldClose ? (
              <DialogClose asChild>
                <Button
                  variant="primary"
                  className="w-full text-md bg-[#229ECF]! mx-auto text-white py-2 rounded-lg hover:bg-[#1b8ab6]"
                >
                  Done
                </Button>
              </DialogClose>
            ) : (
              <Button
                variant="primary"
                className="w-full text-md bg-[#229ECF]! mx-auto text-white py-2 rounded-lg hover:bg-[#1b8ab6]"
                onClick={handleFinish}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </span>
                ) : (
                  "Done"
                )}
              </Button>
            )}
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