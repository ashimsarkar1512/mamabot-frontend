"use client";
import { MessageCircle, ThumbsUp } from "lucide-react";

interface Discussion {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  comments: number;
  likes: number;
  author: string;
  timeAgo: string;
}

const discussions: Discussion[] = [
  {
    id: 1,
    category: "New Mom",
    categoryColor: "bg-green-100 text-green-700",
    title: "How do you deal with morning sickness?",
    description:
      "I'm in week 8 and struggling with nausea all day. What helped you the most?",
    comments: 24,
    likes: 45,
    author: "Sarah M.",
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    category: "Expert",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "My baby's sleep pattern changed at 3 months",
    description:
      "Suddenly waking up every 2 hours. Is this the sleep regression everyone talks about?",
    comments: 18,
    likes: 32,
    author: "Lisa K.",
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    category: "Mentor",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Best prenatal vitamins in Germany?",
    description:
      "Looking for recommendations with good folate content. What are you taking?",
    comments: 41,
    likes: 87,
    author: "Anna W.",
    timeAgo: "1 day ago",
  },
];

const RecentDiscussion = () => {
  return (
    <div className="mb-12 md:mb-16">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-left">
        Recent Discussions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-white rounded-lg p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${discussion.categoryColor}`}
              >
                {discussion.category}
              </span>
              <span className="text-xs text-gray-500">
                {discussion.timeAgo}
              </span>
            </div>

            <h4 className="font-semibold text-base md:text-lg mb-2 text-gray-900">
              {discussion.title}
            </h4>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {discussion.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{discussion.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{discussion.likes}</span>
                </div>
              </div>
              <span className="text-sm text-gray-700 font-medium">
                {discussion.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussion;
