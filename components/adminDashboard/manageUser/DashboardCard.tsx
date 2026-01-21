"use client";

import { comfortaa } from "@/app/fonts";
import { DashboardCardProps } from "@/types/admin/admin";

export default function DashboardCard({ title, value, percentage = 0, isShowPercentage = true }: DashboardCardProps) {
    return (
        <div className="flex flex-col justify-between bg-white border border-[#D82479]/10! rounded-4xl p-6 hover:p-5 transition-all duration-200 ease-in-out">
            <h3 className={`${comfortaa.className} text-lg font-semibold mb-2`}>
                {title}
            </h3>
            <div className="flex justify-between items-center mt-8">
                <p className={`${comfortaa.className} text-[#D82479] text-5xl font-bold mb-2`}>
                    {value > 1000000 ? "1000000+" : value}
                </p>
                {isShowPercentage && (
                    <p className={`${comfortaa.className} text-sm text-white bg-[#4CAF50] px-3 py-2 rounded-xl  ${title === "Postpartum Segment" && "bg-amber-500"} `}>
                        {percentage > 0 ? "+" : ""}
                        {percentage}%
                    </p>
                )}
            </div>
        </div>
    );
}