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
  console.log(communityPosts, "comunnity");

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
