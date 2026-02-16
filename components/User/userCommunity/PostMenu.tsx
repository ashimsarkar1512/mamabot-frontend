import { useState, useRef, useEffect } from "react";
import { MoreVertical, Bookmark, BookmarkIcon, Loader2 } from "lucide-react";
import { useSaveItemMutation } from "@/redux/features/api/user/recommandetion/savedItemsPost";

import { toast } from "sonner";
import { useReportPostMutation } from "@/redux/features/api/user/Community/ReportPost";

const PostMenu = ({ post }: { post: any }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<"spam"|"sexual_content"|"harassment"|"other">("spam");
  const [reportComment, setReportComment] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const [savePost] = useSaveItemMutation();
  const [reportPost, { isLoading: isReporting }] = useReportPostMutation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSave = async () => {
    try {
      await savePost({ item_type: "post", item_id: post.id }).unwrap();
      setIsSaved(!isSaved);
      toast.success(isSaved ? "Post unsaved!" : "Post saved!");
      setMenuOpen(false);
    } catch (err) {
      toast.error("Failed to save post");
    }
  };

  const handleReportSubmit = async () => {
    try {
      await reportPost({ post_id: post.id, report_cause: reportReason, comment: reportComment }).unwrap();
      setIsReported(true);
      toast.success("Post reported! Waiting for admin approval");
      setReportModalOpen(false);
      setMenuOpen(false);
      setReportReason("spam");
      setReportComment("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to report post");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-400 hover:text-gray-600"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
          <button
            onClick={handleSave}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            {isSaved ? "Unsave Post" : "Save Post"}
          </button>
          <button
            onClick={() => setReportModalOpen(true)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${isReported ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={isReported}
          >
            {isReported ? "Reported" : "Report Post"}
          </button>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <label className="block mb-2 text-sm font-medium">Why are you reporting this?</label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="spam">Spam</option>
              <option value="sexual_content">Sexual Content</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
            <label className="block mb-2 text-sm font-medium">Comment (optional)</label>
            <textarea
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={isReporting}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition disabled:opacity-50"
              >
                {isReporting ? "Reporting..." : "Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
