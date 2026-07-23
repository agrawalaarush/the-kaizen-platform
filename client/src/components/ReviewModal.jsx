import { useState } from "react";
import toast from "react-hot-toast";

function ReviewModal({
  isOpen,
  action,
  onClose,
  onSubmit,
}) {
  const [comment, setComment] =
    useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error(
        `${
          action === "approve"
            ? "Approval comment"
            : "Rejection reason"
        } is required`
      );
      return;
    }

    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[500px] p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">
          {action === "approve"
            ? "Approve Idea"
            : "Reject Idea"}
        </h2>

        <label className="block text-sm font-medium mb-2">
          {action === "approve"
            ? "Review Comment"
            : "Rejection Reason"}
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={
            action === "approve"
              ? "Explain why this idea is being approved..."
              : "Explain why this idea is being rejected..."
          }
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={() => {
              setComment("");
              onClose();
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded-lg ${
              action === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {action === "approve"
              ? "Approve"
              : "Reject"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReviewModal;