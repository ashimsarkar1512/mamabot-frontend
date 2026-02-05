"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import CommunityLanding from "@/components/User/userCommunity/CommunityLanding";
import PostCard from "@/components/User/userCommunity/PostCard";
import ResourcesTips from "@/components/User/userCommunity/ResourcesTips";
import SuggestedGroups from "@/components/User/userCommunity/SuggestedGroups";
import Community from "@/public/images/user/community.png";
import { useGetCommunityPostsQuery } from "@/redux/features/api/user/community";
import Image from "next/image";
import { useState } from "react";

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

const buttons: ButtonTypes[] = [
  { name: "Trending", label: "tranding", iconUrl: Community },
  { name: "Pregnancy Groups", label: "pregnancyGroups", iconUrl: Community },
  {
    name: "Postpartum Groups",
    label: "postpartumGroups",
    iconUrl: Community,
  },
  { name: "Wellness & Mind", label: "wellness&Mind", iconUrl: Community },
  { name: "Expert Q&A", label: "expertQ&A", iconUrl: Community },
];

const CommunityPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<string>("");

  const { data: communityPosts } = useGetCommunityPostsQuery({});

  return (
    <div className="flex flex-col justify-between gap-5 py-8">
      <CommunityLanding />
      <div className="p-2 md:p-3 border-3 border-white! rounded-3xl bg-[#FBE9F2] grid grid-cols-1 md:grid-cols-5 gap-1 lg:gap-3">
        {buttons.map((item) => (
          <div
            className={`flex md:flex-col lg:flex-row md:items-center md:justify-center gap-3 border border-white! rounded-xl  hover:bg-[#fbb9da] transition-all duration-500 cursor-pointer py-2 md:py-4 text-md md:text-sm xl:text-md ${item.label === selectedBtn ? "bg-[#fbb9da]" : "bg-[#fdf2f7]"}`}
            key={item.name}
            onClick={() => setSelectedBtn(item.label)}
          >
            <Image src={item.iconUrl} alt="" height={20} width={20} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse xl:flex-row justify-between gap-4">
        <div className="grow">
          <div className="w-full mx-auto">
            {/* Top Widget */}
            <SuggestedGroups />

            {/* Feed Area */}
            <div className="flex flex-col">
              {communityPosts?.data.length === 0 ? (
                <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200">
                  <p className="text-gray-500 text-sm">
                    No community posts found
                  </p>
                </div>
              ) : (
                communityPosts?.data.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="">
          <ResourcesTips />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
