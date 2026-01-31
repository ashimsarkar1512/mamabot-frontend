"use client";

import { ClipboardList } from "lucide-react";
import DailyTaskCard from "./DailyTaskCard";

import {
  RecoveryCheckModal,
  PelvicFloorExerciseModal,
  PainMovementModal,
  BabyFeedingModal,
  DiaperLogModal,
  BabySleepModal,
  IncisionHealingModal,
  MovementRestrictionsModal,
} from "@/components/User/postpartumPhase/daily-task-modals";

export default function DailyTaskGrid({
  deliveryType,
}: {
  deliveryType: "Vaginal Delivery" | "Cesarean Delivery";
}) {
  return (
    <>
      {deliveryType === "Vaginal Delivery" ? (
        <div className="">
          <div className="py-4 border-b-2 border-[#229ECF]/40! mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-[#229ECF]" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#229ECF]">
                Daily Tasks & Health Tips For Mom!
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DailyTaskCard
              title="Recovery Check"
              description="Log today's pain, bleeding level, and energy."
              icon="🩹"
              actionLabel="Check"
              status="info"
              modal={<RecoveryCheckModal />}
            />

            <DailyTaskCard
              title="Pelvic Floor Exercise"
              description="Try 3—5 minutes of Kegel exercises today."
              icon="🚫"
              actionLabel="Start"
              status="info"
              modal={<PelvicFloorExerciseModal />}
            />

            <DailyTaskCard
              title="Pain & Movement Log"
              description="Log pain level and mobility comfort today."
              icon="🤕"
              actionLabel="View Log"
              status="done"
              modal={<PainMovementModal />}
            />

            <DailyTaskCard
              title="Baby Feeding Log"
              description="Record breastfeeding or bottle sessions."
              icon="🍼"
              actionLabel="View Log"
              status="done"
              modal={<BabyFeedingModal />}
            />

            <DailyTaskCard
              title="Diaper Log"
              description="Monitor wet and dirty diapers."
              icon="👶"
              actionLabel="Add Reminder"
              status="done"
              modal={<DiaperLogModal />}
            />

            <DailyTaskCard
              title="Baby Sleep Tracking"
              description="Track today's sleep cycles."
              icon="😴"
              actionLabel="Track"
              status="info"
              modal={<BabySleepModal />}
            />
          </div>
        </div>
      ) : (
        <div className="">
          <div className="py-4 border-b-2 border-[#229ECF]/40!">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-[#229ECF]" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-[#229ECF]">
                Daily Tasks & Health Tips For Mom!
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <DailyTaskCard
              title="Incision Healing Check"
              description="Check redness, swelling, pain, and dryness."
              icon="🩹"
              actionLabel="Check"
              status="info"
              modal={<IncisionHealingModal />}
            />

            <DailyTaskCard
              title="Movement Restrictions"
              description="Avoid bending, twisting, or lifting above 5 kg."
              icon="🚫"
              actionLabel="Start"
              status="info"
              modal={<MovementRestrictionsModal />}
            />

            <DailyTaskCard
              title="Pain & Movement Log"
              description="Log pain level and mobility comfort today."
              icon="🤕"
              actionLabel="View Log"
              status="done"
              modal={<PainMovementModal />}
            />

            <DailyTaskCard
              title="Baby Feeding Log"
              description="Track breastfeeding or bottle-feeding sessions."
              icon="🍼"
              actionLabel="View Log"
              status="done"
              modal={<BabyFeedingModal />}
            />

            <DailyTaskCard
              title="Diaper Log"
              description="Monitor wet and dirty diapers."
              icon="👶"
              actionLabel="Add Reminder"
              status="done"
              modal={<DiaperLogModal />}
            />

            <DailyTaskCard
              title="Baby Sleep Tracking"
              description="Track today's sleep cycles."
              icon="😴"
              actionLabel="Track"
              status="info"
              modal={<BabySleepModal />}
            />
          </div>
        </div>
      )}
    </>
  );
}
