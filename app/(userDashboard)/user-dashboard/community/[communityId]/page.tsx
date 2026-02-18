"use client";

import React, { useRef, useState } from "react";
import {
  Users,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Lock,
  Eye,
  LocationEdit,
} from "lucide-react";
import Image from "next/image";
import { 
  useGetCommunityPostsQuery,
  useGetCommunityGroupsQuery 
} from "@/redux/features/api/user/community";
import PostCard from "@/components/User/userCommunity/PostCard";
import { comfortaa } from "@/app/fonts";
import { useCreateCommunityPostMutation } from "@/redux/features/api/user/Community/CommunityPost";
import { toast, Toaster } from "sonner";
import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";

const GroupLandingPage = ({
  params,
}: {
  params: Promise<{ communityId: string }>;
}) => {
  const { communityId } = React.use(params);
  // user data
  const { data: profileRes } = useGetMyProfileQuery();
  const user = profileRes?.data?.user;
  const firstName = user?.first_name;
  const lastName = user?.last_name;
  const profileImage = user?.profile?.image;
  const { data: groupsRes, isLoading: isGroupsLoading, error: groupsError } = useGetCommunityGroupsQuery({});
  const groups = groupsRes?.data || [];
  const group = groups.find((g: any) => g.id.toString() === communityId.toString());

  const { data: postsRes, isLoading: isPostsLoading } = useGetCommunityPostsQuery({});
  const posts = postsRes?.data || [];

  // Filter posts for this group
  const groupPosts = posts.filter(
    (post: any) => post.group_id.toString() === communityId.toString(),
  );

  const [postTitle, setPostTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [postText, setPostText] = useState("");
  const [createCommunityPost, { isLoading: isPosting }] =
    useCreateCommunityPostMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleCreatePost = async () => {
    if (!postTitle || !postText) return;

    try {
      const formData = new FormData();
      formData.append("group_id", communityId.toString());
      formData.append("title", postTitle);
      formData.append("content", postText);
      formData.append("week", "0");

      // Append all selected images
      selectedImages.forEach((image) => {
        formData.append("images[]", image);
      });

      await createCommunityPost(formData).unwrap();

      toast.success("Post created successfully");

      // CLEAR ALL FIELDS
      setPostTitle("");
      setPostText("");
      setHashtags("");
      setSelectedImages([]);
      setImagePreviews([]);

      // Clear file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create post. Please try again.",
      );
    }
  };


  if (isGroupsLoading || isPostsLoading) {
    return <p className="text-center py-20">Loading group details...</p>;
  }

  if (!group || groupsError) {
    return (
      <p className="text-center py-20 font-bold text-red-500">
        {groupsError ? "Error loading groups. Please try again later." : "Group not found or you don't have access."}
      </p>
    );
  }

  return (
    <div className={`w-full mx-auto py-11 font-sans ${comfortaa.className}`}>
      <Toaster richColors position="top-right" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-[#E9F5FB] rounded-t-2xl p-6 mb-4 border-b-2 border-white!">
            <h1 className="text-xl md:text-[40px] font-bold text-[#229ECF] mb-2">
              {group.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>Private group • {group.member_count} members</span>
            </div>
          </div>

          <div className="bg-gray-50/50 border-2 border-white! rounded-[24px] p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              {/* user info */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src={profileImage || "https://i.pravatar.cc/150?u=default"}
                    alt={`${firstName} ${lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    {firstName} {lastName}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCreatePost}
                disabled={!postText || !postTitle}
                className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                  postText
                    ? "bg-[#D82479] hover:bg-[#ad2c5f] shadow-md"
                    : "bg-[#f499cd] cursor-not-allowed"
                }`}
              >
                {isPosting ? "Posting..." : "Post Now"}
              </button>
            </div>

            {/* Input Area */}
            <div className="relative bg-white border border-sky-200 rounded-2xl p-4 transition-all focus-within:ring-2 focus-within:ring-sky-100 space-y-3">
              {/* TITLE / HEADING */}
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Post title "
                className="w-full text-lg font-semibold outline-none border-b border-gray-300! pb-2 placeholder-gray-300"
              />

              {/* MAIN CONTENT */}
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Create a post..."
                className="w-full h-24 resize-none outline-none text-gray-700 placeholder-gray-300"
              />

              {/* HASHTAGS */}
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#pregnancy #firstTrimester #mentalHealth"
                className="w-full text-sm outline-none border border-gray-200 rounded-lg px-3 py-2 placeholder-gray-300"
              />
              {imagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative max-w-64 h-80 rounded-xl overflow-hidden border"
                    >
                      <Image
                        src={preview}
                        alt={`preview-${index}`}
                        fill
                        className="w-full h-full object-cover"
                      />

                      {/* remove single image */}
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreviews((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                          setSelectedImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                        className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ACTION ICONS */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sky-400 hover:text-sky-600 transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setSelectedImages((prev) => [...prev, file]);
                    setImagePreviews((prev) => [...prev, URL.createObjectURL(file)]);
                  }}
                />

                {/* <button className="text-sky-400 hover:text-sky-600 transition-colors">
                  <Smile className="w-5 h-5" />
                </button> */}
                {/* <button className="text-sky-400 hover:text-sky-600 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            {groupPosts?.length === 0 ? (
              <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200">
                <p className="text-gray-500 text-sm">
                  No community posts found
                </p>
              </div>
            ) : (
              groupPosts.map((post: any) => (
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
                {group.description}
              </p>
            </div>
          </div>

          {/* Privacy Box */}
          <div className="mx-3 border border-pink-200! rounded-2xl p-4 flex gap-3">
            <Lock className="w-5 h-5 text-gray-600 shrink-0 mt-1" />
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
