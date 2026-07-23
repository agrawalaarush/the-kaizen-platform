import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import { getMyIdeas } from "../../services/ideaService";
import IdeaCard from "../../components/IdeaCard";

function MyIdeasPage() {
  const [ideas, setIdeas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response =
          await getMyIdeas(token);

        console.log(
          "MY IDEAS RESPONSE:",
          response
        );

        setIdeas(response.ideas || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        My Ideas
      </h1>

      {ideas.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">

            <PlusCircle
              size={34}
              className="text-blue-600"
            />

          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            You haven't submitted any ideas yet
          </h2>

          <p className="text-gray-500 mt-3 max-w-md">
            Share your first idea to help improve
            processes, products or services across
            the organisation.
          </p>

          <button
            onClick={() =>
              navigate("/submit-idea")
            }
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <PlusCircle size={18} />

            Submit Your First Idea

          </button>

        </div>

      ) : (

        <div className="bg-white border border-gray-200 rounded-xl p-6">

          {ideas.map((idea) => (

            <IdeaCard
              key={idea._id}
              title={idea.title}
              department={idea.department}
              status={idea.status}
              likes={0}
              comments={0}
              onClick={() =>
                navigate(`/ideas/${idea._id}`)
              }
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default MyIdeasPage;