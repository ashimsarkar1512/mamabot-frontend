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
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PostCard = ({ post }: { post: any }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: any) => (isLiked ? prev - 1 : prev + 1));
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  return (
    <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-gray-200">
      {/* Group Header Line */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
        <h3 className="font-medium text-gray-700 text-lg">{post.groupName}</h3>
        <button className="flex items-center text-sky-500 text-sm font-medium hover:text-sky-600 transition-colors">
          <Plus className="w-4 h-4 mr-1" /> Join Group
        </button>
      </div>

      {/* User Info Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={post.user.avatar}
              alt={post.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900">{post.user.name}</span>
              <span className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full font-medium border border-pink-100">
                {post.user.week}
              </span>
              <button className="text-pink-500 text-xs font-medium flex items-center gap-1 hover:text-pink-600">
                <Users className="w-3 h-3" />
                {post.user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
            <span className="text-xs text-gray-400">{post.timeAgo}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          {post.content}
          <span className="text-pink-500 font-medium cursor-pointer ml-1 hover:underline">
            Read More
          </span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag: any, idx: any) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      {post.images.length > 0 && (
        <div
          className={`grid gap-2 mb-4 rounded-xl overflow-hidden ${post.images.length > 1 ? "grid-cols-2 h-64" : "grid-cols-1 h-72"}`}
        >
          {post.images.map((img: any, idx: any) => (
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
      )}

      {/* Stats Line */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-pink-500">
            <Heart className="w-3.5 h-3.5 fill-current" />{" "}
            {formatNumber(likeCount)}
          </span>
          <span className="flex items-center gap-1 text-sky-500">
            <MessageSquare className="w-3.5 h-3.5" /> {post.stats.comments}
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5" /> {post.stats.shares}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-b border-gray-200 py-2 mb-4">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-1 transition-colors ${
            isLiked ? "text-pink-500" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} /> Like
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
        <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-3 py-2 gap-2 border border-transparent focus-within:border-sky-300 focus-within:bg-white transition-all">
          <input
            type="text"
            placeholder="Comment your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
          <button className="text-gray-400 hover:text-sky-500">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-sky-500">
            <Smile className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-sky-500">
            <Paperclip className="w-4 h-4" />
          </button>
          {comment && (
            <button className="text-sky-500 hover:text-sky-600">
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
