import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  getIdeaById,
  approveIdea,
  rejectIdea,
  deleteIdea,
} from "../../services/ideaService";

import {
  getCommentsByIdea,
  addComment,
} from "../../services/commentService";

import ReviewModal from "../../components/ReviewModal";

function IdeaDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [isReviewModalOpen, setIsReviewModalOpen] =
    useState(false);

  const [reviewAction, setReviewAction] =
    useState("");

  const token =
    localStorage.getItem("token");

  const fetchIdea = async () => {
    try {
      const data =
        await getIdeaById(
          id,
          token
        );

      setIdea(data.idea);
    } catch (error) {
      console.error(error);
    }
  };

  const loadComments = async () => {
    try {
      const data =
        await getCommentsByIdea(
          id,
          token
        );

      setComments(
        data.comments || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      return;
    }

    try {
      await addComment(
        id,
        commentText,
        token
      );

      setCommentText("");

await loadComments();

toast.success("Comment added successfully");

    } catch (error) {
      console.error(error);

     toast.error(
  error?.response?.data?.message ||
    "Failed to add comment"
);
    }
  };

  const openApproveModal = () => {
    setReviewAction("approve");
    setIsReviewModalOpen(true);
  };

  const openRejectModal = () => {
    setReviewAction("reject");
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit =
    async (reviewComment) => {
      try {
        if (
          reviewAction === "approve"
        ) {
          await approveIdea(
            id,
            reviewComment,
            token
          );
        } else {
          await rejectIdea(
            id,
            reviewComment,
            token
          );
        }

        setIsReviewModalOpen(false);

await Promise.all([
  fetchIdea(),
  loadComments(),
]);

toast.success(
  reviewAction === "approve"
    ? "Idea approved successfully"
    : "Idea rejected successfully"
);

      } catch (error) {
        console.error(error);

        toast.error(
  error?.response?.data?.message ||
    "Something went wrong"
);
      }
    };

    const handleDeleteIdea = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this idea?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteIdea(id, token);

    toast.success(
      "Idea deleted successfully"
    );

    navigate(-1);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to delete idea"
    );
  }
};

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchIdea();
        await loadComments();
       
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="p-6">
        Idea not found
      </div>
    );
  }

  const canDelete =
  user &&
  (
    user.role === "Admin" ||
    user.role === "Reviewer" ||
    idea.submittedBy?._id === user._id
  );

  
  console.log("USER:", user);
console.log("SUBMITTED BY:", idea.submittedBy);
console.log("Logged in user:", user);
console.log("Idea submitted by:", idea.submittedBy);
console.log(
  "Comparison:",
  idea.submittedBy?._id,
  user?._id
);
console.log("Can Delete:", canDelete);
  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl p-6">

      

        <div className="flex items-start justify-between">
  <h1 className="text-3xl font-bold">
    {idea.title}
  </h1>

  {canDelete && (
    <button
      onClick={handleDeleteIdea}
      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
      title="Delete Idea"
    >
      <Trash2 size={22} />
    </button>
  )}
</div>

        <p className="mt-4 text-gray-700">
          {idea.description}
        </p>

        <div className="mt-6 space-y-2 text-sm text-gray-600">

          <p>
            <strong>Category:</strong>{" "}
            {idea.category}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {idea.department}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {idea.status}
          </p>

          <p>
            <strong>Submitted By:</strong>{" "}
            {idea.submittedBy?.name}
          </p>

          {idea.reviewedBy && (
            <p>
              <strong>Reviewed By:</strong>{" "}
              {idea.reviewedBy?.name}
            </p>
          )}

          {idea.reviewedAt && (
            <p>
              <strong>Reviewed At:</strong>{" "}
              {new Date(
                idea.reviewedAt
              ).toLocaleString()}
            </p>
          )}

          {idea.reviewComment && (
            <p>
              <strong>
                Review Comment:
              </strong>{" "}
              {idea.reviewComment}
            </p>
          )}

        </div>

        <hr className="my-8" />
                {(user?.role === "Reviewer" ||
          user?.role === "Admin") &&
          idea.status ===
            "Pending Review" && (

          <>
            <h2 className="text-xl font-semibold mb-4">
              Review Decision
            </h2>

            <div className="flex gap-4 mb-8">

              <button
                onClick={openApproveModal}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={openRejectModal}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>

            </div>

            <hr className="my-8" />
          </>
        )}

        <h2 className="text-xl font-semibold mb-4">
          Comments
        </h2>

        <div className="space-y-4">

          {comments.length === 0 ? (

            <p className="text-gray-500">
              No comments yet.
            </p>

          ) : (

            comments.map((comment) => (

              <div
                key={comment._id}
                className="border rounded-lg p-3"
              >

                <p className="font-medium">
                  {comment.user?.name}
                </p>

                <p className="text-gray-700 mt-1">
                  {comment.text}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(
                    comment.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            ))

          )}

        </div>

        <div className="mt-6">

          <textarea
            value={commentText}
            onChange={(e) =>
              setCommentText(
                e.target.value
              )
            }
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-3 min-h-[100px]"
          />

          <button
            onClick={handleAddComment}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Comment
          </button>

        </div>
                <ReviewModal
          isOpen={isReviewModalOpen}
          action={reviewAction}
          onClose={() =>
            setIsReviewModalOpen(false)
          }
          onSubmit={handleReviewSubmit}
        />

      </div>
    </div>
  );
}

export default IdeaDetailsPage;