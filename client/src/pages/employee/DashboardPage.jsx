import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getEmployeeDashboard,
} from "../../services/dashboardService";

import StatCard from "../../components/StatCard";
import IdeaCard from "../../components/IdeaCard";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatusPieChart from "../../components/dashboard/StatusPieChart";
import SubmissionLineChart from "../../components/dashboard/SubmissionLineChart";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response =
          await getEmployeeDashboard(token);

        setDashboard(response.dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6">

      <DashboardHeader
        title="Employee Dashboard"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div
          onClick={() => navigate("/my-ideas")}
          className="cursor-pointer"
        >
          <StatCard
            title="My Ideas"
            value={dashboard?.stats?.myIdeas || 0}
            subtitle="Ideas Submitted"
          />
        </div>

        <div
          onClick={() =>
            navigate("/my-ideas?status=Approved")
          }
          className="cursor-pointer"
        >
          <StatCard
            title="Approved Ideas"
            value={dashboard?.stats?.approvedIdeas || 0}
            subtitle="Successfully Approved"
          />
        </div>

        <div
          onClick={() =>
            navigate("/my-ideas?status=Implemented")
          }
          className="cursor-pointer"
        >
          <StatCard
            title="Implemented Ideas"
            value={dashboard?.stats?.implementedIdeas || 0}
            subtitle="Implemented Successfully"
          />
        </div>

        <div
          onClick={() => navigate("/volunteered")}
          className="cursor-pointer"
        >
          <StatCard
            title="Volunteered Ideas"
            value={dashboard?.stats?.volunteeredIdeas || 0}
            subtitle="Ideas Joined"
          />
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        <StatusPieChart
          data={dashboard?.statusDistribution || []}
          onOpenAll={() => navigate("/my-ideas")}
          onFilter={(status) =>
            navigate(`/my-ideas?status=${encodeURIComponent(status)}`)
          }
        />

        <SubmissionLineChart
          data={dashboard?.submissionTrend || []}
          onOpen={() => navigate("/my-ideas")}
        />

      </div>

      {/* Recent Ideas */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-semibold">
            Recent Ideas
          </h2>

        </div>

        {dashboard?.recentIdeas?.length > 0 ? (

          dashboard.recentIdeas.map((idea) => (
            <IdeaCard
              key={idea._id}
              title={idea.title}
              department={idea.department}
              status={idea.status}
              comments={0}
              onClick={() =>
                navigate(`/ideas/${idea._id}`)
              }
            />
          ))

        ) : (

          <p className="text-gray-500">
            You haven't submitted any ideas yet.
          </p>

        )}

      </div>

      {/* Recent Volunteering */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-semibold">
            Recent Volunteering
          </h2>

        </div>

        {dashboard?.recentVolunteering?.length > 0 ? (

          <div className="space-y-4">

            {dashboard.recentVolunteering.map((item) => (

              <div
                key={item._id}
                onClick={() =>
                  item.idea?._id &&
                  navigate(`/ideas/${item.idea._id}`)
                }
                className={`border rounded-lg p-4 transition-all ${
                  item.idea
                    ? "cursor-pointer hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5"
                    : ""
                }`}
              >

                <h3 className="font-semibold text-gray-900">
                  {item.idea?.title || "Idea Removed"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Status: {item.status}
                </p>

                <p className="text-sm text-gray-500">
                  Progress: {item.progress}%
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            You haven't volunteered for any ideas yet.
          </p>

        )}

      </div>

    </div>
  );
}

export default DashboardPage;