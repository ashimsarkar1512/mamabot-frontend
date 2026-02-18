"use client";

import React, { useRef, useState, useEffect } from "react";
import { Image as ImageIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useUpdateCommunityPostMutation } from "@/redux/features/api/user/Community/CommunityPost";
import { toast } from "sonner";
import { comfortaa } from "@/app/fonts";

interface EditPostModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
}

const EditPostModal = ({ post, isOpen, onClose }: EditPostModalProps) => {
  const [postTitle, setPostTitle] = useState(post.title || "");
  const [postText, setPostText] = useState(post.content || "");
  const [hashtags, setHashtags] = useState(post.tags?.map((t: string) => `#${t}`).join(" ") || "");
  const [updateCommunityPost, { isLoading: isUpdating }] = useUpdateCommunityPostMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(post.image_urls || []);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPostTitle(post.title || "");
      setPostText(post.content || "");
      setHashtags(post.tags?.map((t: string) => `#${t}`).join(" ") || "");
      setImagePreviews(post.image_urls || []);
      setSelectedImages([]);
      setRemovedImages([]);
    }
  }, [isOpen, post]);

  const handleUpdate = async () => {
  if (!postTitle || !postText) return;

  const formData = new FormData();

  formData.append("id", post.id.toString());
  formData.append("group_id", post.group_id.toString());
  formData.append("title", postTitle);
  formData.append("content", postText);
  formData.append("week", post.week?.toString() || "0");

  removedImages.forEach((img) => {
    formData.append("removed_images[]", img);
  });

  selectedImages.forEach((image) => {
    formData.append("images[]", image);
  });

  // ───────────── Debug ─────────────
  console.log("Sending FormData with:");
  console.log("Fields:", [...formData.entries()].filter(([k]) => !k.startsWith("image")));
  console.log("New images count:", selectedImages.length);
  console.log("Removed images:", removedImages);
  // You can also do: for (let [k, v] of formData.entries()) console.log(k, v);
  // ─────────────────────────────────

  try {
    const result = await updateCommunityPost(formData).unwrap();
    console.log("Update success:", result);
    toast.success("Post updated successfully");
    onClose();
  } catch (error: any) {
    console.error("Update failed:", error);
    toast.error(error?.data?.message || "Failed to update post");
  }
};

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 ${comfortaa.className}`}>
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-[#229ECF]">Edit Post</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Area (Matches GroupLandingPage) */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-[24px] p-6">
            <div className="relative bg-white border border-sky-200 rounded-2xl p-4 transition-all focus-within:ring-2 focus-within:ring-sky-100 space-y-3 shadow-sm">
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Post title"
                className="w-full text-lg font-semibold outline-none border-b border-gray-100 pb-2 placeholder-gray-300 focus:border-sky-300 transition-colors"
              />

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 resize-none outline-none text-gray-700 placeholder-gray-300 leading-relaxed"
              />

              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#pregnancy #mentalHealth"
                className="w-full text-sm outline-none border border-gray-100 rounded-lg px-3 py-2 placeholder-gray-300 focus:border-sky-300 transition-colors"
              />

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                      <Image src={preview} alt={`preview-${index}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const existingCount = imagePreviews.length - selectedImages.length;
                          if (index < existingCount) {
                            setRemovedImages((prev) => [...prev, imagePreviews[index]]);
                          } else {
                            const fileIndex = index - existingCount;
                            setSelectedImages((prev) => prev.filter((_, i) => i !== fileIndex));
                          }
                          setImagePreviews((prev) => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Icons */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;

                    setSelectedImages((prev) => [...prev, ...files]);
                    const newPreviews = files.map(file => URL.createObjectURL(file));
                    setImagePreviews((prev) => [...prev, ...newPreviews]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-4 sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isUpdating || !postText || !postTitle}
            className={`px-8 py-2.5 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
              postText && postTitle
                ? "bg-[#D82479] hover:bg-[#ad2c5f] shadow-lg shadow-pink-100"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
