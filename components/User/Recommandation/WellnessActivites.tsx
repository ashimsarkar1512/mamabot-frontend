"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  videoId: string; // YouTube video ID
  duration: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Prenatal Yoga",
    description: "Gentle yoga to relax and stretch your body",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    videoId: "v7AYKMP6rOE", // ~5 min prenatal yoga
    duration: "23 mins",
  },
  {
    id: 2,
    title: "Breathing Exercise",
    description: "Calming breathing to reduce stress",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800",
    videoId: "inpok4MKVLM", // ~5 min breathing exercise
    duration: "5 mins",
  },
  {
    id: 3,
    title: "Walking Routine",
    description: "Light walking routine for daily movement",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    videoId: "8CE4ijWlQ18", // ~5 min walking routine
    duration: "5 mins",
  },
];

export default function WellnessActivities() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const toggleVideo = (id: number) => {
    setActiveVideoId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Wellness & Self-Care
          </h2>
          <p className="text-gray-600 text-sm">
            Recommended 5-minute activities for your trimester
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const isPlaying = activeVideoId === activity.id;

            return (
              <div
                key={activity.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Image / YouTube Video */}
                <div className="relative aspect-video w-full bg-black">
                  {isPlaying ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${activity.videoId}?autoplay=1&mute=1`}
                      title={activity.title}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activity.title}
                    </h3>
                    <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {activity.duration}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {activity.description}
                  </p>

                  {/* Button (same design) */}
                  <button
                    onClick={() => toggleVideo(activity.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? "Stop" : "Start"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
