"use client";

import {
  useGetQASessionsQuery,
  useRegisterQASessionMutation,
} from "@/redux/features/api/user/DoctorQA/qa-seassions";
import { Users, Stethoscope, ChevronRight, Crown } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  useGetGroupQuery,
  useJoinGroupMutation,
} from "@/redux/features/api/user/groups/communityGroup";
import { IProfileResponse } from "@/types/user/profile";
interface CommunityRecommendationsProps {
  profile?: IProfileResponse;
}

export default function CommunityRecommendations({
  profile,
}: CommunityRecommendationsProps) {
  const { data } = useGetQASessionsQuery(undefined );
  const [registerSession, { isLoading }] = useRegisterQASessionMutation();

  const [registeredIds, setRegisteredIds] = useState<number[]>([]); // Track registered sessions

  const { data: groups } = useGetGroupQuery(undefined,{
  pollingInterval: 5000, // every 5 seconds
});

console.log(groups,"groups")
  const [joinGroup, { isLoading: isJoiningGroup }] = useJoinGroupMutation();

  const week = profile?.data?.current_week;


// Get the first group the user has not joined
const nextAvailableGroup = groups?.data?.find(
  (group: any) => group.is_member === false
);


  const session = data?.data?.[0]; // first session

  // const now = new Date();

  // const startTime = session ? new Date(session.start_time) : null;
  // const endTime = session ? new Date(session.end_time) : null;

  // // Button ENABLE only if current time is within session time
  // const isButtonEnabled =
  //   session && startTime && endTime
  //     ? now.getTime() >= startTime.getTime() &&
  //       now.getTime() <= endTime.getTime()
  //     : false;

  const handleRegister = async (qaSessionId: number) => {
    try {
      const res = await registerSession({
        qa_session_id: qaSessionId,
      }).unwrap();
      toast.success(res.message || "Successfully registered!"); // Show backend message
      setRegisteredIds((prev) => [...prev, qaSessionId]); // Disable button after registering
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(
        err?.data?.message || "Failed to register. Please try again.",
      );
    }
  };

  const handleJoinGroup = async (groupId: number) => {
    try {
      const res = await joinGroup({
        group_id: groupId,
      }).unwrap();
      toast.success(res.message || "Successfully joined the group!");
    } catch (err: any) {
      console.error("Join group failed:", err);
      toast.error(
        err?.data?.message || "Failed to join group. Please try again.",
      );
    }
  };

  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-3">
            <span className="text-[#e91e63]">Community </span>
            <span className="text-[#00acc1]">Recommendations</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Connect with other moms currently in Week {week} and join helpful
            events designed just for you
          </p>
          <div className="w-full h-px bg-[#229ECF] mt-6"></div>
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Support Circle Card - Dynamic from API */}
        {/* Support Circle Card - Dynamic from API */}
{nextAvailableGroup ? (
  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
    <div className="flex flex-col items-start gap-3">
      <div className="bg-[#fce4ec] rounded-xl p-3">
        <Users size={24} className="text-[#e91e63]" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 my-4">
        {nextAvailableGroup.name}
      </h3>
    </div>

    <div className="bg-[#fdf0f5] rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Users size={16} className="text-[#e91e63]" />
        <span className="text-sm font-medium text-gray-700">
          {nextAvailableGroup.member_count} members
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg">🔥</span>
        <span className="text-sm font-medium text-gray-700">
          {nextAvailableGroup.is_active ? "Active today" : "Inactive"}
        </span>
      </div>
    </div>

    <p className="text-gray-500 text-[15px] mb-8">
      {nextAvailableGroup.description}
    </p>

    <button
      onClick={() => handleJoinGroup(nextAvailableGroup.id)}
      disabled={nextAvailableGroup.is_static || isJoiningGroup}
      className={`mt-auto w-full border py-3 rounded-xl font-medium ${
        nextAvailableGroup.is_static
          ? "border-gray-300 text-gray-400 cursor-not-allowed"
          : "border-[#e91e63] text-[#e91e63] hover:bg-[#fce4ec]"
      }`}
    >
      {nextAvailableGroup.is_static ? "Coming Soon" : "Join Group"}
    </button>
  </div>
) : (
  // Static card if all groups joined
  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
    <div className="flex flex-col items-start gap-3 mb-6">
      <div className="bg-gray-100 rounded-xl p-3">
        <Users size={24} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 my-4">
        More Groups Coming Soon
      </h3>
    </div>
    <p className="text-gray-500 text-[15px] mb-8">
      All available groups have been joined. Stay tuned for upcoming communities!
    </p>
    <button
      disabled
      className="mt-auto w-full border font-medium py-3 rounded-xl 
        border-gray-300 text-gray-400 cursor-not-allowed"
    >
      Coming Soon
    </button>
  </div>
)}


          {/* Live Q&A Card - Dynamic */}
          {session ? (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex flex-col items-start gap-3 mb-6">
                <div className="bg-[#e0f7fa] rounded-xl p-3">
                  <Stethoscope size={24} className="text-[#00acc1]" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
                  Live Q&A with {session.doctor.name}
                </h3>
              </div>

              <div className="bg-[#f0f9fb] rounded-xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-2 text-gray-700">
                  <span className="text-lg">📅</span>
                  <span className="text-sm font-medium">
                    {new Date(session.start_time).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">🕒</span>
                  <span className="text-sm font-medium">
                    {new Date(session.start_time).toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}{" "}
                    EST
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-[15px] mb-8">{session.topic}</p>

              <button
                onClick={() => handleRegister(session.id)}
                className="mt-auto w-full border font-medium py-3 rounded-xl transition-all flex items-center justify-center 
        border-[#00acc1] text-[#00acc1] hover:bg-[#e0f7fa]"
              >
                Register for Live Q&A
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex flex-col items-start gap-3 mb-6">
                <div className="bg-gray-100 rounded-xl p-3">
                  <Stethoscope size={24} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
                  Live Q&A Coming Soon
                </h3>
              </div>

              <p className="text-gray-500 text-[15px] mb-8">
                Our doctors will be available soon for live Q&A sessions. Stay
                tuned!
              </p>

              <button
                disabled
                className="mt-auto w-full border font-medium py-3 rounded-xl 
        border-gray-300 text-gray-400 cursor-not-allowed"
              >
                Session Not Available
              </button>
            </div>
          )}
        </div>

        {/* Premium CTA Button */}
        <div className="flex justify-center">
          <button className="bg-[#d81b60] hover:bg-[#c2185b] text-white font-medium py-3 px-8 rounded-full flex items-center gap-2 shadow-md transition-all group cursor-pointer">
            <Crown size={18} />
            <span>Unlock premium to Explore more communities</span>
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
