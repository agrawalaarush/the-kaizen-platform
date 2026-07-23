import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReviewedIdeas } from "../../services/ideaService";
import ReviewedIdeaCard from "../../components/reviewer/ReviewedIdeaCard";

export default function MyReviewedIdeasPage() {
  const [ideas, setIdeas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await getReviewedIdeas(token);

      setIdeas(response.ideas || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenIdea = (idea) => {
    navigate(`/ideas/${idea._id}`);
  };

  return (
    <div className="p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          My Reviewed Ideas
        </h1>

        <p className="text-gray-500 mt-2">
          Ideas you have reviewed and their outcomes.
        </p>

      </div>

      {ideas.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

          <h2 className="text-lg font-semibold text-gray-800">
            No Reviewed Ideas
          </h2>

          <p className="text-gray-500 mt-2">
            Your reviewed ideas will appear here.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {ideas.map((idea) => (

            <ReviewedIdeaCard
              key={idea._id}
              idea={idea}
              onOpen={handleOpenIdea}
            />

          ))}

        </div>

      )}

    </div>
  );
}