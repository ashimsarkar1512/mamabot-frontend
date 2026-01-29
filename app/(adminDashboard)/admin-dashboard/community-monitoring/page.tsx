"use client";

import DashboardCard from "@/components/adminDashboard/manageUser/DashboardCard";
import CommonPagination from "@/components/common/CommonPagination";
import { DashboardCardProps } from "@/types/admin/admin";
import {
  Heart,
  MessageCircle,
  Trash2,
  Filter,
  Settings2,
  Clock,
  MessageSquareText,
} from "lucide-react";
import { useMemo, useState } from "react";

const communityMonitoringData: DashboardCardProps[] = [
  { title: "Total Posts", value: 176, isShowPercentage: false },
  { title: "Total Likes", value: 645, isShowPercentage: false },
  { title: "Total Comments", value: 53, isShowPercentage: false },
  { title: "Reported Posts", value: 2, isShowPercentage: false },
];

type Post = {
  id: number;
  author: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  reported?: boolean;
};

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    // date and time according to mysql format
    date: "2026-01-14 10:30:00",
    content:
      "Just hit week 20! Feeling the baby move more and more each day. It's such an amazing feeling! Any tips for dealing with back pain?",
    likes: 24,
    comments: 12,
  },
  {
    id: 2,
    author: "Maria Garcia",
    date: "2026-01-14 09:15:00",
    content:
      "Recovery after cesarean is no joke! Taking it slow and following all doctor's orders. Thank you to this community for all the support.",
    likes: 31,
    comments: 8,
  },
  {
    id: 3,
    author: "Emily Chen",
    date: "2026-01-13 08:45:00",
    content:
      "Has anyone else experienced severe morning sickness in the second trimester? I thought it was supposed to get better...",
    likes: 18,
    comments: 15,
  },
  {
    id: 4,
    author: "Jessica Williams",
    date: "2026-01-14 02:20:00",
    content:
      "Breastfeeding journey has been challenging but so rewarding. Don't give up, mamas! It does get easier.",
    likes: 45,
    comments: 22,
  },
  {
    id: 5,
    author: "Amanda Brown",
    date: "2026-01-12 11:00:00",
    content:
      "Does anyone have recommendations for prenatal yoga? Looking for something gentle for third trimester.",
    likes: 14,
    comments: 9,
  },
  {
    id: 6,
    author: "Spam Account",
    date: "2026-01-11 03:30:00",
    content: "This product changed my life! Buy now at [suspicious link]",
    likes: 1,
    comments: 2,
    reported: true,
  },
];

type TabType = "all" | "latest" | "active" | "reported";

export default function CommunityMonitoring() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (activeTab === "reported") {
      list = list.filter((p) => p.reported);
    }

    if (activeTab === "latest") {
      list = list.reverse();
    }

    if (activeTab === "active") {
      list = list.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    }

    return list;
  }, [posts, activeTab]);

  const handleDelete = (id: number) => {
    // later replace with RTK mutation
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communityMonitoringData.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-3">
        <div className="">
          <Settings2 size={24} className=" text-pink-500" />
        </div>

        {[
          { key: "all", label: "All Posts" },
          { key: "latest", label: "Latest Posts" },
          { key: "active", label: "Most Active" },
          { key: "reported", label: "Reported" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            className={`px-6     py-3 rounded-xl border text-md font-medium transition ${
              activeTab === tab.key
                ? "bg-pink-100 text-[#D82479] border-[#D82479]/20!"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={`rounded-xl p-6 bg-white hover:shadow-sm transition duration-500 ${
              post.reported ? "border border-orange-300!" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg xl:text-xl">
                  {post.author}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className=" text-gray-500">
                    {post.date && !isNaN(new Date(post.date).getTime())
                      ? new Date(post.date).toLocaleString()
                      : "Unknown date"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {post.reported && (
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                    Reported
                  </span>
                )}

                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{post.content}</p>

            <div className="mt-5 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 text-[#B0C9D1]">
                <MessageSquareText className="w-5 h-5 text-gray-500" />
                {post.comments} Comments
              </div>
              <div className="flex items-center gap-2 text-[#B0C9D1]">
                <Heart className="w-5 h-5 text-gray-500" />
                {post.likes} Likes
              </div>
            </div>
          </div>
        ))}
      </div>
      <CommonPagination
        page={page}
        totalPages={10}
        limit={limit}
        setLimit={setLimit}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
