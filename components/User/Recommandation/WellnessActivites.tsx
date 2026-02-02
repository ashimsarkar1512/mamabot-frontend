"use client";

import Image from "next/image";
import { Play } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Prenatal Yoga",
    description: "Improves flexibility & reduces stress",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    duration: "8 mins",
  },
  {
    id: 2,
    title: "Breathing Exercise",
    description: "Guided relaxation session",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    duration: "5 mins",
  },
  {
    id: 3,
    title: "Walking Routine",
    description: "Recommended based on your trimester",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    duration: "9 mins",
  },
];

export default function WellnessActivities() {
  return (
    <section className="w-full py-12  ">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-primary mb-2">
            Wellness & Self-Care
          </h2>
          <p className="text-gray-600 text-sm">
            Recommended activities for your trimester
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-white"
            >
             
              {/* Image Container */}
              <div className="relative w-full aspect-4/3 bg-gray-200 overflow-hidden group">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Container */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activity.title}
                  </h3>
                  <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded whitespace-nowrap">
                    {activity.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {activity.description}
                </p>

                {/* Start Button */}
                <button className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                  <Play size={16} />
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
