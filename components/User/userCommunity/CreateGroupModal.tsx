"use client";

import { useCreateCommunityGroupMutation } from "@/redux/features/api/user/groups/communityGroup";
import { X, Users, Type, AlignLeft, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("pregnancy");
  const [createCommunityGroup, { isLoading }] = useCreateCommunityGroupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createCommunityGroup({ name, description, stage }).unwrap();
      toast.success("Community group created successfully!");
      setName("");
      setDescription("");
      setStage("pregnancy");
      onClose();
    } catch (err: any) {
      console.error("Create group error:", err);
      const errorMessage = err?.data?.message || "";
      if (errorMessage.includes("Duplicate entry") || errorMessage.includes("unique")) {
        toast.error("A group with this name already exists. Please try a unique name.");
      } else {
        toast.error(errorMessage || "Failed to create group");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
        {/* Header Decor */}
        <div className="h-2 bg-gradient-to-r from-sky-400 via-pink-400 to-sky-400" />
        
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Title Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center">
              <Users className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create Group</h2>
              <p className="text-sm text-gray-500">Build your own community space</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g. First Time Moms - NYC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50 outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Stage Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
             Pregnancy Stage
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["pregnancy", "postpartum"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStage(s)}
                    className={`px-4 py-3 rounded-xl border font-medium capitalize transition-all ${
                      stage === s
                        ? "bg-sky-50 border-sky-400 text-sky-600 ring-2 ring-sky-100"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                 Description
              </label>
              <textarea
                placeholder="What is this group about?"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50 outline-none transition-all placeholder:text-gray-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-semibold shadow-lg shadow-sky-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isLoading ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
