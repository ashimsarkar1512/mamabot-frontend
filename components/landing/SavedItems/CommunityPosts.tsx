"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { items, tabs } from "@/lib/data/savedData";
import PostCard from "@/components/User/userCommunity/PostCard";

type Props = {
  activeTab: string;
};

interface ButtonTypes {
  name: string;
  label: string;
  iconUrl: any;
}

export const MOCK_POSTS = [
  {
    id: 101,
    groupName: "First Trimester (0-12 Weeks)",
    user: {
      name: "Sarah Porter",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      week: "Week 22",
      isFollowing: false,
    },
    timeAgo: "2 hr ago",
    title: "Anyone else experiencing back pain in Week 22?",
    content:
      "I'm currently in my second trimester, and for the past few days, I've been dealing with some pretty uncomfortable lower back pain. My doctor reassured me that it's a normal part of pregnancy, but I can't help but wonder if there's anything I can do to ease...",
    tags: ["SecondTrimester", "BackPain", "Wellness"],
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800", // Back pain / massage image
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800", // Spine/Anatomy image
    ],
    stats: {
      likes: 1100, // 1.1k
      comments: 356,
      shares: 19,
    },
  },
  {
    id: 102,
    groupName: "2nd Trimester (13-27 Weeks)",
    user: {
      name: "Lucy Anderson",
      avatar: "https://i.pravatar.cc/150?u=lucy",
      week: "Week 28",
      isFollowing: false,
    },
    timeAgo: "2 hr ago",
    title: "Best prenatal vitamins you've tried?",
    content:
      "I'm currently 28 weeks pregnant and looking for some good recommendations on prenatal vitamins. I've been taking one for a while now, but recently it's been making me feel quite nauseous, and I'm not sure if it's the vitamin itself or just part of pregnancy. I know how important it is to keep up with nutrients like folate, iron, and DHA...",
    tags: ["Nutrition", "Vitamins", "ThirdTrimester"],
    images: [], // Text only post
    stats: {
      likes: 560,
      comments: 264,
      shares: 9,
    },
  },
  {
    id: 103,
    groupName: "3rd Trimester (28-40 Weeks)",
    user: {
      name: "Ellie Parker",
      avatar: "https://i.pravatar.cc/150?u=ellie",
      week: "Week 24",
      isFollowing: true,
    },
    timeAgo: "2 hr ago",
    title: "Feeling baby kicks regularly now! 💕",
    content:
      "Week 24 and I can finally feel consistent kicks! It's the most amazing feeling. For those waiting, it will happen... ",
    tags: ["BabyMovement", "SecondTrimester", "Milestone"],
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e90e6e8e1?auto=format&fit=crop&q=80&w=1200", // Pregnant belly w/ shoes
    ],
    stats: {
      likes: 1100,
      comments: 356,
      shares: 19,
    },
  },
];

export default function CommunityPosts({ activeTab }: Props) {
  const filteredItems =
    activeTab === "All(24)"
      ? items
      : items.filter((item) => item.type === activeTab);

  return (
    <section className="w-full rounded-3xl  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-[32px] font-semibold text-[#229ECF]">
          Saved Community Posts
        </h2>
        <button className="text-sm cursor-pointer  text-[#229ECF] hover:underline">
          See More
        </button>
      </div>
      <div className="mb-5 md:mb-10 h-[2px] w-full mx-auto bg-[#BAE1F0] " />

      {/* Cards */}
      <div className="">
        {/* Feed Area */}
        <div className="flex flex-col">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
