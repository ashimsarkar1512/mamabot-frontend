"use client";

import PostCard from "@/components/User/userCommunity/PostCard";
import { useGetMyPostsQuery } from "@/redux/features/api/user/myPost";
import { Loader2 } from "lucide-react";

export default function MyPost() {
  const { data: myPosts, isLoading } = useGetMyPostsQuery(undefined);
  console.log(myPosts, "my posts");

  return (
    <div className="py-8 px-4 md:px-0 ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Posts</h1>
        <p className="text-gray-500">Manage and view all your community contributions</p>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-2xl border border-gray-200">
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading your posts...</p>
          </div>
        ) : myPosts?.data?.length === 0 ? (
          <div className="bg-gray-50/50 rounded-2xl p-10 text-center border border-gray-200">
            <p className="text-gray-500 text-lg mb-2">You haven&apos;t posted anything yet</p>
            <p className="text-gray-400 text-sm italic">Share your thoughts with the community to see them here!</p>
          </div>
        ) : (
          myPosts?.data?.map((post: any) => (
            <PostCard key={post.id} post={post} isMyPost={true} />
          ))
        )}
      </div>
    </div>
  );
}
