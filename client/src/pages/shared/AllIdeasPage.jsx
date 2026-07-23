import { useEffect, useState } from "react";
import {
  getAllIdeas,
  volunteerForIdea,
} from "../../services/ideaService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function AllIdeasPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await getAllIdeas(token);

      setIdeas(response.ideas || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVolunteer = async (
    ideaId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await volunteerForIdea(
        ideaId,
        token
      );

      toast.success(
  "Successfully volunteered for the idea!"
);
    } catch (error) {
      console.error(error);

      toast.error(
  error?.response?.data?.message ||
    "Failed to volunteer"
);
    }
  };

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      idea.description
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Ideas
      </h1>

      <input
        type="text"
        placeholder="Search ideas..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-4">
        {filteredIdeas.length === 0 && (
          <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
            No ideas found.
          </div>
        )}

        {filteredIdeas.map((idea) => (
          <div
            key={idea._id}
            onClick={() =>
              navigate(
                `/ideas/${idea._id}`
              )
            }
            className="bg-white rounded-xl p-5 shadow-sm border cursor-pointer hover:border-blue-500 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">
              {idea.title}
            </h2>

            <p className="text-sm text-blue-600 mt-1 font-medium">
              👤 By{" "}
              {idea.submittedBy?.name ||
                "Unknown User"}
            </p>

            <p className="text-gray-600 mt-3">
              {idea.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
              <span>
                📌 Status:{" "}
                {idea.status}
              </span>

              <span>
                🏢 Department:{" "}
                {idea.department}
              </span>
            </div>

            {user?.role !== "Admin" && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleVolunteer(idea._id);
    }}
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Volunteer
  </button>
)}
          </div>
        ))}
      </div>
    </div>
  );
}