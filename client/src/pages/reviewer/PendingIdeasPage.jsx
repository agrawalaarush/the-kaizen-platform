import { useEffect, useState } from "react";
import {
  getPendingIdeas,
  approveIdea,
  rejectIdea,
} from "../../services/ideaService";
import ReviewModal from "../../components/ReviewModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PendingIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  const [selectedIdeaId, setSelectedIdeaId] =
    useState(null);

  const [modalAction, setModalAction] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchPendingIdeas = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response =
          await getPendingIdeas(token);

        setIdeas(response.ideas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPendingIdeas();
  }, []);

  const openApproveModal = (id) => {
    setSelectedIdeaId(id);
    setModalAction("approve");
    setIsModalOpen(true);
  };

  const openRejectModal = (id) => {
    setSelectedIdeaId(id);
    setModalAction("reject");
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async (
    reviewComment
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      if (modalAction === "approve") {
        await approveIdea(
          selectedIdeaId,
          reviewComment,
          token
        );
      } else {
        await rejectIdea(
          selectedIdeaId,
          reviewComment,
          token
        );
      }

      setIdeas((prev) =>
        prev.filter(
          (idea) =>
            idea._id !== selectedIdeaId
        )
      );

      setIsModalOpen(false);
      setSelectedIdeaId(null);
      toast.success(
  modalAction === "approve"
    ? "Idea approved successfully"
    : "Idea rejected successfully"
);

    } catch (error) {
      console.error(error);

      toast.error(
  error?.response?.data?.message ||
    "Review failed"
);
    }
  };

  return (
<div>
      <h1 className="text-2xl font-semibold mb-6">
        Pending Ideas
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6">

        {ideas.length === 0 ? (
          <p className="text-gray-500">
            No pending ideas.
          </p>
        ) : (
          ideas.map((idea) => (
            <div
  key={idea._id}
  onClick={() =>
    navigate(`/ideas/${idea._id}`)
  }
  className="border-b border-gray-100 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
>
              <div>

                <h3 className="font-medium">
                  {idea.title}
                </h3>

                <p className="text-sm text-blue-600 mt-1">
                  👤 By{" "}
                  {
                    idea.submittedBy
                      ?.name
                  }
                </p>

                <p className="text-sm text-gray-500">
                  {idea.department}
                </p>

              </div>

              <div className="flex gap-2">

                <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/ideas/${idea._id}`);
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  View Idea
</button>

              </div>
            </div>
          ))
        )}

      </div>

      <ReviewModal
        isOpen={isModalOpen}
        action={modalAction}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={
          handleReviewSubmit
        }
      />

    </div>
  );
}

export default PendingIdeasPage;