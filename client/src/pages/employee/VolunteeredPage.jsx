import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { getMyVolunteering } from "../../services/ideaService";
import IdeaCard from "../../components/IdeaCard";

function VolunteeredPage() {
  const [volunteeredIdeas, setVolunteeredIdeas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteeredIdeas = async () => {
      try {
        const token = localStorage.getItem("token");

        const response =
          await getMyVolunteering(token);

        console.log(
          "VOLUNTEERING RESPONSE:",
          response
        );

        setVolunteeredIdeas(
          response.volunteering || []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchVolunteeredIdeas();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Volunteered Ideas
      </h1>

      {volunteeredIdeas.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">

            <Search
              size={34}
              className="text-blue-600"
            />

          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            You haven't volunteered for any ideas yet
          </h2>

          <p className="text-gray-500 mt-3 max-w-md">
            Explore approved ideas across the organisation and
            contribute your skills by volunteering for projects
            that interest you.
          </p>

          <button
            onClick={() => navigate("/all-ideas")}
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Search size={18} />
            Explore Ideas
          </button>

        </div>

      ) : (

        <div className="bg-white border border-gray-200 rounded-xl p-6">

          {volunteeredIdeas.map((idea) => (
            <IdeaCard
              key={idea._id}
              title={idea.idea?.title}
              department={idea.idea?.department}
              status={idea.status}
              comments={0}
              onClick={() =>
                idea.idea?._id &&
                navigate(`/ideas/${idea.idea._id}`)
              }
            />
          ))}

        </div>

      )}
    </div>
  );
}

export default VolunteeredPage;