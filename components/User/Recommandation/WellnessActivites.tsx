"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause, CloudCog } from "lucide-react";
import { useGetWellnessActivitiesQuery } from "@/redux/features/api/user/recommandetion/wellnessAndSelfcare";

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  videoId: string; // YouTube video ID
  duration: string;
}

const dummyActivities = [
  {
    id: 101,
    title: "Prenatal Yoga Flow",
    description: "Gentle yoga poses tailored for pregnancy to improve flexibility and reduce stress.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    video_url: "https://www.youtube.com/watch?v=B4kNiCwtl7M",
    duration: "15"
  },
{
  id: 102,
  title: "Guided Meditation for Sleep",
  description: "Relax your mind and body for a restful night's sleep with this guided session.",
  image: "https://images.unsplash.com/photo-1544367563-1219114dbbb4?auto=format&fit=crop&w=1200&q=80",
  video_url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
  duration: "10"
},
  {
    id: 103,
    title: "Healthy Pregnancy Nutrition",
    description: "Expert tips on maintaining a balanced diet for you and your baby's health.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    video_url: "https://www.youtube.com/watch?v=7y9D6r6z7X8",
    duration: "12"
  }
];

export default function WellnessActivities() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const { data: wellness } = useGetWellnessActivitiesQuery(undefined);
  console.log(wellness,"wellness")
  

  const toggleVideo = (id: number) => {
    setActiveVideoId((prev) => (prev === id ? null : id));
  };

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const realActivities = wellness?.data || [];
  const activities = realActivities.length > 0 ? realActivities : dummyActivities;

  return (
    <section className="w-full py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Wellness & Self-Care
          </h2>
          <p className="text-gray-600 text-sm">
            Recommended activities for your wellbeing
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity: any) => {
            const isPlaying = activeVideoId === activity.id;
            const videoId = getYouTubeId(activity.video_url);

            return (
              <div
                key={activity.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Image / YouTube Video */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  {isPlaying && videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                      title={activity.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
               
                  ) : (
                    <>
                      {/* Blurred Background Layer */}
                      <Image
                        src={activity.image || "/placeholder-wellness.jpg"}
                        alt={activity.title}
                        fill
                        className="object-cover blur-md opacity-60 scale-110"
                      />
                      {/* Main Image Layer */}
                      <Image
                        src={activity.image || "/placeholder-wellness.jpg"}
                        alt={activity.title}
                        fill
                        className="object-cover  object-top z-10"
                      />
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activity.title}
                    </h3>
                    <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {activity.duration ? `${activity.duration} mins` : "5 mins"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {activity.short_description || activity.description}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => toggleVideo(activity.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? "Pause Video" : "Start Now"}
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