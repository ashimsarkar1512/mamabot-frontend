"use client";

import { useGetLandingPagePostsQuery } from "@/redux/features/api/user/YoureNotAlone";
import { MessageCircle, ThumbsUp } from "lucide-react";

// helper function to calculate "time ago"
function timeAgo(dateString: string) {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

const RecentDiscussion = () => {
  const { data, isLoading, isError } = useGetLandingPagePostsQuery();

  if (isLoading) {
    return <p className="text-center py-10">Loading discussions...</p>;
  }

  if (isError || !data?.success) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load discussions
      </p>
    );
  }

  return (
    <div className="mb-12 md:mb-16">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-left">
        Recent Discussions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.data.map((post) => (
          <div
            key={post.id}
            className="flex flex-col justify-between bg-white rounded-lg p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left"
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-sky-100 text-sky-700">
                {post.role_label}
              </span>
              <span className="text-xs text-gray-500">
                {timeAgo(post.posted_at)}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-extrabold text-base md:text-lg mb-2 text-gray-900">
              {post.title}
            </h4>

            {/* Content */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {post.content}
            </p>

            {/* Bottom section  */}
            <div className="flex items-center justify-between pt-3 border-t mt-auto border-gray-200!">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments_count}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.likes_count}</span>
                </div>
              </div>

              <span className="text-sm text-gray-700 font-medium">
                {post.user.first_name} {post.user.last_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussion;
