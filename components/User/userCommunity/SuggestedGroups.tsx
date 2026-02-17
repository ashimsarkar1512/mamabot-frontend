/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetCommunityGroupsQuery,
  useJoinCommunityGroupMutation,
} from "@/redux/features/api/user/community";
import { useState } from "react";
import { Users, Baby, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CreateGroupModal from "./CreateGroupModal";

const SuggestedGroups = () => {
  const { data: communityGroups } = useGetCommunityGroupsQuery({});
  const [joinCommunityGroup] = useJoinCommunityGroupMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleCardClick = (group: any) => {
    if (group.is_member) {
      router.push(`/user-dashboard/community/${group.id}`);
    } else {
      toast.warning(
        "This is a private group. Please join the group to see what's new there!",
      );
    }
  };

  const handleJoinLeave = async (e: React.MouseEvent, group: any) => {
    e.stopPropagation();

    try {
      await joinCommunityGroup(group.id).unwrap();

      if (group.is_member) {
        toast.info(`You left ${group.name} group`);
      } else {
        toast.success(`You joined ${group.name} group`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="mb-6 bg-sky-50/50 rounded-2xl  border-3 border-white! overflow-hidden">
      <div className="px-6 pt-6 pb-2 bg-[#E9F5FA] border-b border-white!">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Suggested Community Groups
            </h3>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#229ECF] text-white text-sm font-semibold shadow-md shadow-sky-100 hover:shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Create Group
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Join groups based on your pregnancy stage
        </p>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 md:p-6 overflow-x-auto">
        {communityGroups?.data?.map((group: any) => (
          <div
            key={group.id}
            onClick={() => handleCardClick(group)}
            className={`bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer ${
              !group.is_member ? "opacity-90" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0`}
              >
                <Baby className={`w-6 h-6 text-blue-600`} />
              </div>
              <div>
                <h4 className="font-bold text-[#229ECF] text-sm leading-tight mb-1">
                  {group.name}
                </h4>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {group.member_count} members
                  </span>
                  <span className="w-1 h-1 rounded-full bg-green-500"></span>
                  <span className="text-green-600">
                    {group.users_count} active now
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => handleJoinLeave(e, group)}
              className="w-full py-1.5 rounded-lg border border-sky-200 text-sky-500 text-sm font-medium hover:bg-sky-50 transition-colors"
            >
              {group.is_member ? "Leave Group" : "Join Group"}
            </button>
          </div>
        ))}
      </div>
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SuggestedGroups;
