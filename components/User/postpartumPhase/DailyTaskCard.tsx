"use client";

import { Info, CheckCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface RecoveryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  status?: "done" | "info";
  modal: React.ReactNode;
}

export default function DailyTaskCard({
  title,
  description,
  icon,
  actionLabel,
  status,
  modal,
}: RecoveryCardProps) {
  return (
    <div className="relative bg-transparent rounded-2xl border-2 border-white! p-6 shadow-sm">
      {/* Status Icon */}
      <div className="absolute top-4 right-4">
        {status === "done" && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
        {status === "info" && <Info className="w-5 h-5 text-gray-500" />}
      </div>

      <div className="flex md:items-center gap-2 md:gap-4">
        <div className="text-xl md:text-3xl">{icon}</div>

        <div>
          <h3 className="text-base md:text-lg font-semibold">{title}</h3>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-3 md:mt-6 text-sm md:text-base w-full border border-[#229ECF]! text-[#229ECF]! py-2 rounded-lg hover:bg-[#229ECF]/10 transition cursor-pointer">
            {actionLabel}
          </button>
        </DialogTrigger>

        {modal}
      </Dialog>
    </div>
  );
}
