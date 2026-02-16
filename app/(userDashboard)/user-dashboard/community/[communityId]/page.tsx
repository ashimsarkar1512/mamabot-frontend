"use client";
// this is community details dynamic page, here a id will be passed and based on that id data will be fetched

import React, { useState } from "react";
import {
  Users,
  ChevronDown,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Lock,
  Eye,
  Plus,
  LocationEdit,
} from "lucide-react";
import Image from "next/image";
import { useGetCommunityPostsQuery } from "@/redux/features/api/user/community";
import PostCard from "@/components/User/userCommunity/PostCard";

const GroupLandingPage = ({
  params,
}: {
  params: Promise<{ communityId: string }>;
}) => {
  const { communityId } = React.use(params);
  console.log(communityId);

  const [postText, setPostText] = useState("");
  const [pregnancyWeek, setPregnancyWeek] = useState("Add pregnancy week");
  const [role, setRole] = useState("Add role");

  const { data: communityPosts } = useGetCommunityPostsQuery({});

  return (
    <div className="w-full mx-auto p-4 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-[#E9F5FB] rounded-t-2xl p-6 mb-4 border-b-2 border-white!">
            <h1 className="text-xl md:text-[40px] font-bold text-[#229ECF] mb-2">
              First Trimester (0—12 Weeks)
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>Private group • 1.2k members</span>
            </div>
          </div>

          <div className="bg-gray-50/50 border-2 border-white! rounded-[24px] p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src="https://i.pravatar.cc/150?u=sarahcollins"
                    alt="Sarah Collins"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Sarah Collins</h3>
                  <div className="flex gap-2 mt-1">
                    {/* Fake Dropdown 1 */}
                    <button className="flex items-center gap-1 bg-[#DDF1FB] text-[#2D88C8] text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-sky-200 transition-colors">
                      <Plus className="w-3 h-3" /> {pregnancyWeek}{" "}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {/* Fake Dropdown 2 */}
                    <button className="flex items-center gap-1 bg-[#DDF1FB] text-[#2D88C8] text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-sky-200 transition-colors">
                      <Plus className="w-3 h-3" /> {role}{" "}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                disabled={!postText}
                className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                  postText
                    ? "bg-[#D82479] hover:bg-[#ad2c5f] shadow-md"
                    : "bg-[#f499cd] cursor-not-allowed"
                }`}
              >
                Post Now
              </button>
            </div>

            {/* Input Area */}
            <div className="relative bg-white border border-sky-200 rounded-2xl p-4 transition-all focus-within:ring-2 focus-within:ring-sky-100">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Create a post...."
                className="w-full h-24 resize-none outline-none text-gray-700 placeholder-gray-300"
              />
              <div className="flex items-center gap-4 mt-2">
                <button className="text-sky-400 hover:text-sky-600 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="text-sky-400 hover:text-sky-600 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="text-sky-400 hover:text-sky-600 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            {communityPosts?.data?.length === 0 ? (
              <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200">
                <p className="text-gray-500 text-sm">No community posts found</p>
              </div>
            ) : (
              communityPosts?.data?.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Sidebar Info --- */}
        <div className="w-full lg:w-80 h-fit flex flex-col gap-4 border-2 border-white! rounded-3xl overflow-hidden">
          {/* About Box */}
          <div className="bg-[#FBE9F2] overflow-hidden">
            <div className="bg-[#FFEAF5] p-5">
              <h2 className="text-2xl font-bold text-[#E73F80]">About</h2>
            </div>
            <div className="px-5 pb-3">
              <p className="text-[#E73F80] text-sm leading-relaxed">
                Join discussions, share your journey, and get expert-backed
                advice.
              </p>
            </div>
          </div>

          {/* Privacy Box */}
          <div className="mx-3 border border-pink-200! rounded-2xl p-4 flex gap-3">
            <Lock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Private</h4>
              <p className="text-gray-500 text-xs mt-1 leading-snug">
                People who&apos;s in the group and what they post.
              </p>
            </div>
          </div>

          {/* Visibility Box */}
          <div className="mx-3 border border-pink-200! rounded-2xl p-4 flex gap-3">
            <Eye className="w-5 h-5 text-gray-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Visible</h4>
              <p className="text-gray-500 text-xs mt-1 leading-snug">
                Anyone can find this group.
              </p>
            </div>
          </div>
          {/* location  */}
          <div className="mx-3 border border-pink-200! rounded-2xl p-4 flex gap-3">
            <LocationEdit className="w-5 h-5 text-gray-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Bangladesh</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupLandingPage;
