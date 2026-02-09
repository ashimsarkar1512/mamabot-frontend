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

const PostCard = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savePost] = useSaveItemMutation();
  const handleSavePost = async () => {
    try {
      await savePost({
        item_type: "post",
        item_id: post.id,
      }).unwrap();

      setIsSaved(true);
      alert("Post saved");
    } catch (error) {
      console.error("Failed to save post", error);
      alert("Failed to save post");
    }
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  const menuRef = useRef<HTMLDivElement>(null);

  const [likeCommunityGroupPost] = useLikeCommunityGroupPostMutation();
  const [joinCommunityGroup] = useJoinCommunityGroupMutation();
  const [commentCommunityGroupPost] = useCommentCommunityGroupPostMutation();

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
    <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200">
      {/* Group Header Line */}
      <div className="flex justify-between items-center pb-3">
        <h3 className="font-medium text-gray-700 text-lg">
          {post.groupName ? post.groupName : "Group name"}
        </h3>
        {/* api not integrated here ------------------------ */}
        {/* {isSaved ? (
          <BookmarkIcon className="w-5 h-5 text-[#229ECF] fill-[#229ECF]" />
        ) : (
          <button className="flex items-center text-sky-500 text-sm font-medium hover:text-sky-600 transition-colors">
            <Plus className="w-4 h-4 mr-1" /> Join Group
          </button>
        )} */}
        <button
          onClick={() => joinCommunityGroup(post.group_id)}
          className="flex items-center text-sky-500 text-sm font-medium hover:text-sky-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" /> Join Group
        </button>
      </div>

      {/* User Info Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={
                post.user.image
                  ? post.user.image
                  : "https://i.pravatar.cc/150?u=sarah"
              }
              alt={post.user.first_name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sky-500">
                {post.user.first_name} {post.user.last_name}
              </span>
              <span className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full font-medium border border-pink-100">
                Week {post.week}
              </span>
              {/* <button className="text-pink-500 text-xs font-medium flex items-center gap-1 hover:text-pink-600">
                <UserPlus className="w-3 h-3" />
                {post.user.isFollowing ? "Following" : "Follow"}
              </button> */}
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
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
              <button
                onClick={() => {
                  if (!isSaved) {
                    handleSavePost();
                  }
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                {isSaved ? "Saved" : "Save Post"}
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Hide Post
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          {post.content}
          {post.content.length > 100 && (
            <span className="text-pink-500 font-medium cursor-pointer ml-1 hover:underline">
              Read More
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
          className={`grid gap-2 mb-4 rounded-xl overflow-hidden ${post.image_urls.length > 1 ? "grid-cols-2 h-64" : "grid-cols-1 h-72"}`}
        >
          {post.image_urls.map((img: any, idx: any) => (
            <div key={idx} className="relative h-full w-full">
              <Image
                src={img}
                alt="Post content"
                fill
                className="object-cover"
              />
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
      <div className="flex items-center justify-between border-t border-b border-gray-200! py-2 mb-4">
        <button
          onClick={() => likeCommunityGroupPost(post.id)}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-1 transition-colors text-gray-500 hover:text-gray-700`}
        >
          <Heart className={`w-4 h-4`} /> Like
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 py-1 transition-colors">
          <MessageSquare className="w-4 h-4" /> Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 py-1 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 relative">
          {/* Current User Avatar Placeholder */}
          <Image
            src="https://i.pravatar.cc/150?u=me"
            alt="Me"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col bg-[#229ECF]/2 rounded-xl  px-3 py-2 gap-2 border border-[#229ECF]/30! duration-300 focus-within:border-[#229ECF]/50! focus-within:bg-white transition-all">
          <textarea
            rows={3}
            placeholder="Comment your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-sky-500">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-sky-500">
                <Smile className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-sky-500">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            {comment && (
              <button
                onClick={() =>
                  commentCommunityGroupPost({ post_id: post.id, comment })
                }
                className="text-sky-500 hover:text-sky-600"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
