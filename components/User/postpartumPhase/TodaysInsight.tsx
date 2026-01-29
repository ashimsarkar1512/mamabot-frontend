/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Baby,
  Clock,
  Moon,
  Droplet,
  Baby as BabyIcon,
  ClipboardList,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetFeedingLogsQuery } from "@/redux/features/api/user/postpurtum/babyfeeding";
import { useGetDiaperLogsQuery } from "@/redux/features/api/user/postpurtum/diaperLog";
import { useGetSleepTrackingsQuery } from "@/redux/features/api/user/postpurtum/sleepTrackerLog";

const TodaysInsight = ({ mockData }: { mockData: any }) => {

  const{data}=useGetFeedingLogsQuery(undefined)
  const {data:diaper}=useGetDiaperLogsQuery(undefined)
  const {data:sleep}=useGetSleepTrackingsQuery(undefined)
const totalSleepTime = sleep?.data?.total_sleep_today ?? "0 hours";
 const dirtyCount = diaper?.data?.dirty_count ?? 0;
const wetCount = diaper?.data?.wet_count ?? 0;

  const lastFeedingHoursAgo = data?.data?.last_feeding_hours_ago ?? 0;

  return (
    <Card className="overflow-hidden shadow-sm border-2 border-white! bg-sky-50/50 rounded-xl">
      {/* Header */}
      <div className=" px-6 py-4 border-b border-white!">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-cyan-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-cyan-800">
            Today&apos;s Insight
          </h2>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px ">
        {/* Feeding Time */}
        <div className=" p-5 flex">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Droplet className="h-5 w-5 text-pink-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-800">Feeding Time</h3>
              <p className="text-sm text-gray-600">
                Last feeding{" "}
                <span className="font-medium text-pink-600">
                  {lastFeedingHoursAgo} hrs
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sleep Time */}
        <div className=" p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Moon className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-800">Sleep Time</h3>
              <p className="text-sm text-gray-600">
                Total sleep today:{" "}
                <span className="font-medium text-indigo-600">
                  {totalSleepTime}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Diapers Used */}
        <div className=" p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🍼</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-800">Diapers Used</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{wetCount}</span> wet
                • <span className="font-medium">{dirtyCount}</span>{" "}
                dirty
              </p>
            </div>
          </div>
        </div>

        {/* Baby Growth Rate */}
        <div className=" p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <BabyIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-800">Baby Growth Rate</h3>
              <p className="text-sm text-green-700 font-medium">
                {mockData.growthStatus}{" "}
                <span className="font-medium text-gray-600">
                  (based on age)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TodaysInsight;
