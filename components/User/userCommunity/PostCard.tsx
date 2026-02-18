/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heart,
  MessageSquare,
  Share2,
  Send,
  MoreVertical,
  Image as ImageIcon,
  Smile,
  Paperclip,
  Users,
  Plus,
  UserPlus,
  BookmarkIcon,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  useCommentCommunityGroupPostMutation,
  useJoinCommunityGroupMutation,
  useLikeCommunityGroupPostMutation,
} from "@/redux/features/api/user/community";
import { useSaveItemMutation } from "@/redux/features/api/user/recommandetion/savedItemsPost";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useShareCommunityPostMutation } from "@/redux/features/api/user/community";
import PostMenu from "./PostMenu";

import { useGetMyProfileQuery } from "@/redux/features/api/user/profile";
import { comfortaa } from "@/app/fonts";

const PostCard = ({ post, isMyPost }: { post: any; isMyPost?: boolean }) => {
  const { data: profile } = useGetMyProfileQuery(undefined);
  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [savePost] = useSaveItemMutation();
  // const handleSavePost = async () => {
  //   try {
  //     await savePost({
  //       item_type: "post",
  //       item_id: post.id,
  //     }).unwrap();

  //     setIsSaved(true);
  //     toast.success("Post saved successfully!");
  //   } catch (error) {
  //     console.error("Failed to save post", error);
  //     toast.error("Failed to save post");
  //   }
  // };

  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  const menuRef = useRef<HTMLDivElement>(null);

  const [likeCommunityGroupPost, { isLoading: isLiking }] =
    useLikeCommunityGroupPostMutation();
  const [joinCommunityGroup, { isLoading: isJoining }] =
    useJoinCommunityGroupMutation();
  const [commentCommunityGroupPost, { isLoading: isCommenting }] =
    useCommentCommunityGroupPostMutation();
  const [shareCommunityPost, { isLoading: isSharing }] =
    useShareCommunityPostMutation();

  const handleLike = async () => {
    try {
      await likeCommunityGroupPost(post.id).unwrap();
      toast.success(post.is_liked ? "Post unliked" : "Post liked!");
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleJoinGroup = async () => {
    try {
      await joinCommunityGroup(post.group_id).unwrap();
      toast.success("Joined group successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join group");
    }
  };

  const handleShare = async () => {
    try {
      // API call to record the share
      await shareCommunityPost({
        post_id: post.id,
        platform: "mamabot_group",
        group_id: post.group_id || 0, // Fallback if group_id is missing
      }).unwrap();

      // Handle clipboard separately so it doesn't break the whole function
      try {
        const url = `${window.location.origin}/user-dashboard/community?post=${post.id}`;
        await navigator.clipboard.writeText(url);
        toast.success("Post shared and link copied!");
      } catch (clipboardError) {
        console.error("Clipboard copy failed", clipboardError);
        toast.success("Post shared successfully!"); // Still success even if only clipboard failed
      }
    } catch (error) {
      console.error("Failed to share post", error);
      toast.error("Failed to share post. Please try again.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await commentCommunityGroupPost({
        post_id: post.id,
        content: comment,
      }).unwrap();
      setComment("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200 ${comfortaa.className}`}>
      {/* Group Header Line */}
      <div className="flex justify-between items-center pb-3">
        {/* <h3 className="font-medium text-gray-700 text-lg">
          {post.groupName ? post.groupName : "Group name"}
        </h3> */}

        {/* <button
          onClick={handleJoinGroup}
          disabled={isJoining}
          className="flex items-center text-sky-500 text-sm font-medium hover:text-sky-600 transition-colors disabled:opacity-50"
        >
          {isJoining ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-1" />
          )}
          Join Group
        </button> */}
      </div>

      {/* User Info Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={
                post.user?.profile?.image ||
                post.user?.image ||
                "https://i.pravatar.cc/150?u=" + (post.user?.id || post.user_id)
              }
              alt={post.user?.first_name ?? "User"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sky-500">
                {post.user?.first_name ?? "User"} {post.user?.last_name ?? ""}
              </span>
              <span className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full font-medium border border-pink-100">
              {post.role_label}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {post.updated_at && !isNaN(new Date(post.updated_at).getTime())
                ? formatDistanceToNow(new Date(post.updated_at), {
                    addSuffix: true,
                  })
                : "Recently"}
            </span>
          </div>
        </div>

        <div className="relative">
          <PostMenu post={post} isMyPost={isMyPost} />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          {showFullContent
            ? post.content
            : `${post.content.substring(0, 200)}${post.content.length > 200 ? "..." : ""}`}
          {post.content.length > 200 && (
            <span
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-pink-500 font-medium cursor-pointer ml-1 hover:underline"
            >
              {showFullContent ? "Read Less" : "Read More"}
            </span>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags
            ? post.tags.map((tag: any, idx: any) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))
            : null}
        </div>
      </div>

      {/* Images Grid */}
      {post.image_urls && post.image_urls.length > 0 ? (
        <div
          className={`grid gap-2 md:gap-3 mb-4 ${
            post.image_urls.length === 1
              ? "grid-cols-1 h-[350px] md:h-[500px]"
              : post.image_urls.length === 2
                ? "grid-cols-2 h-[250px] md:h-[400px]"
                : "grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {post.image_urls.map((img: any, idx: any) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden group/image border border-gray-100 shadow-sm ${
                post.image_urls.length > 2
                  ? "h-48 md:h-64 lg:h-80 w-full"
                  : "h-full w-full bg-gray-100/80"
              }`}
            >
              <Image
                src={img}
                alt="Post content"
                fill
                className="object-cover transition-transform duration-500 group-hover/image:scale-110"
              />
              {/* Optional: Add a subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors duration-300" />
            </div>
          ))}
        </div>
      ) : null}

      {/* Stats Line */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-pink-500">
            <Heart className="w-3.5 h-3.5 fill-current" />{" "}
            {formatNumber(post.likes_count)}
          </span>
          <span className="flex items-center gap-1 text-sky-500">
            <MessageSquare className="w-3.5 h-3.5" /> {post.comments_count}
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5" /> {post.shares_count}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-b !border-gray-200 py-2 mb-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-1 transition-colors ${
            post.is_liked
              ? "text-[#D82479]"
              : "text-gray-500 hover:text-gray-700"
          } disabled:opacity-50`}
        >
          <Heart className={`w-4 h-4 ${post.is_liked ? "fill-current" : ""}`} />
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-1 transition-colors ${showComments ? "text-sky-500" : "text-gray-500 hover:text-gray-700"}`}
        >
          <MessageSquare
            className={`w-4 h-4 ${showComments ? "fill-current" : ""}`}
          />{" "}
          Comment
        </button>
        <button
          onClick={handleShare}
          disabled={isSharing}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-1 transition-colors text-gray-500 hover:text-gray-700 disabled:opacity-50`}
        >
          {isSharing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          Share
        </button>
      </div>

      {/* Comments List */}
      {showComments && (
        <div className="space-y-4 mb-4 mt-2">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((cmt: any) => (
              <div
                key={cmt.id}
                className="flex gap-3 items-start p-3 bg-gray-50/80 rounded-xl border border-gray-100"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <Image
                    src={
                      cmt.user?.profile?.image ||
                      cmt.user?.image ||
                      "https://i.pravatar.cc/150?u=" + cmt.user?.id
                    }
                    alt={cmt.user?.first_name || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {cmt.user?.first_name} {cmt.user?.last_name || ""}
                      </span>
                      {(cmt.role_label || cmt.user?.role_label) && (
                        <span className="bg-pink-50 text-pink-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium border border-pink-100">
                          {cmt.role_label || cmt.user?.role_label}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {cmt.created_at &&
                      !isNaN(new Date(cmt.created_at).getTime())
                        ? formatDistanceToNow(new Date(cmt.created_at), {
                            addSuffix: true,
                          })
                        : "recently"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    {cmt.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-xs py-2 italic">
              No comments yet. Be the first to start the conversation!
            </p>
          )}
        </div>
      )}

      {/* Comment Input */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 relative">
          <Image
            src={profile?.data?.image || "/images/avatar.png"}
            alt="Me"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col bg-[#229ECF]/5 rounded-xl px-3 py-2 gap-2 border !border-[#229ECF]/30 duration-300 focus-within:!border-[#229ECF]/50 focus-within:bg-white transition-all shadow-sm">
          <textarea
            rows={3}
            placeholder="Comment your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              {/* <button className="text-gray-400 hover:text-sky-500">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-sky-500">
                <Smile className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-sky-500">
                <Paperclip className="w-4 h-4" />
              </button> */}
            </div>
            {comment && (
              <button
                onClick={handleCommentSubmit}
                disabled={isCommenting}
                className="text-sky-500 hover:text-sky-600 disabled:opacity-50"
              >
                {isCommenting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
