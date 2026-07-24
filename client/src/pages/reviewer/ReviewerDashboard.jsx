import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getReviewerDashboard } from "../../services/dashboardService";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/StatCard";

import ReviewerCategoryChart from "../../components/reviewer/ReviewerCategoryChart";
import ReviewerActivityChart from "../../components/reviewer/ReviewerActivityChart";
import PendingReviewCard from "../../components/reviewer/PendingReviewCard";
import ReviewedIdeaCard from "../../components/reviewer/ReviewedIdeaCard";

export default function ReviewerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewFilter, setReviewFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response =
        await getReviewerDashboard(token);

      setDashboard(response.dashboard);
    } catch (error) {
      console.error(
        "Failed to load reviewer dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (idea) => {
    navigate(`/ideas/${idea._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-lg font-medium text-gray-500">
          Loading reviewer dashboard...
        </div>
      </div>
    );
  }

  const filteredReviews =
    reviewFilter === "All"
      ? dashboard.recentReviews
      : dashboard.recentReviews.filter(
          (idea) =>
            idea.status === reviewFilter
        );

  /*
    Sort pending ideas newest first and only
    display the two most recent on dashboard.
  */
  const recentPendingIdeas = [
    ...dashboard.pendingIdeas,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 2);

  const pendingCount =
    dashboard.pendingIdeas.length;

  return (
    <div className="p-6">

      <DashboardHeader
        title="Reviewer Dashboard"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <StatCard
          title="Pending Reviews"
          value={
            dashboard.stats.pendingReviews
          }
          subtitle="Ideas Awaiting Review"
          onClick={() =>
            navigate("/pending-ideas")
          }
        />

        <StatCard
          title="Approved"
          value={dashboard.stats.approved}
          subtitle="Approved By You"
          onClick={() =>
            navigate(
              "/my-reviewed-ideas?status=Approved"
            )
          }
        />

        <StatCard
          title="Rejected"
          value={dashboard.stats.rejected}
          subtitle="Rejected By You"
          onClick={() =>
            navigate(
              "/my-reviewed-ideas?status=Rejected"
            )
          }
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        <ReviewerCategoryChart
          data={
            dashboard.categoryDistribution
          }
          onCategoryClick={(category) => {
            if (category === "All") {
              navigate("/pending-ideas");
            } else {
              navigate(
                `/pending-ideas?category=${encodeURIComponent(
                  category
                )}`
              );
            }
          }}
        />

        <ReviewerActivityChart
          data={dashboard.reviewActivity}
          onNavigate={(status) => {
            if (status === "All") {
              navigate(
                "/my-reviewed-ideas"
              );
            } else {
              navigate(
                `/my-reviewed-ideas?status=${status}`
              );
            }
          }}
        />

      </div>

      {/* Queue Summary */}
      <div
        onClick={() =>
          navigate("/pending-ideas")
        }
        className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
      >

        <h2 className="text-xl font-semibold text-blue-900">

          {pendingCount > 0
            ? `${pendingCount} Ideas Awaiting Your Review`
            : "You're All Caught Up!"}

        </h2>

        <p className="mt-2 text-blue-700">

          {pendingCount > 0
            ? "Review pending ideas to keep innovation moving efficiently across the organisation."
            : "There are currently no pending ideas awaiting your review."}

        </p>

      </div>

      {/* Pending Review Ideas */}
      <section className="mb-12">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold text-gray-900">
            Pending Review Ideas
          </h2>

          {pendingCount > 0 && (
            <button
              onClick={() =>
                navigate("/pending-ideas")
              }
              className="group flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all {pendingCount} pending

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          )}

        </div>

        {pendingCount === 0 ? (

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">

            <h3 className="text-lg font-semibold text-gray-800">
              No Pending Reviews
            </h3>

            <p className="text-gray-500 mt-2">
              All submitted ideas have been reviewed.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {recentPendingIdeas.map(
              (idea) => (

                <PendingReviewCard
                  key={idea._id}
                  idea={idea}
                  onReview={
                    handleReview
                  }
                />

              )
            )}

          </div>

        )}

      </section>

      {/* Recently Reviewed */}
      <section id="recently-reviewed">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold text-gray-900">

            {reviewFilter === "All"
              ? "Recently Reviewed"
              : `${reviewFilter} Reviews`}

          </h2>

          <span className="text-sm text-gray-500">
            {filteredReviews.length} Reviews
          </span>

        </div>

        {filteredReviews.length === 0 ? (

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">

            <h3 className="text-lg font-semibold text-gray-800">
              No Reviews Found
            </h3>

            <p className="text-gray-500 mt-2">
              No reviews match the selected
              filter.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredReviews.map(
              (idea) => (

                <ReviewedIdeaCard
                  key={idea._id}
                  idea={idea}
                  onOpen={
                    handleReview
                  }
                />

              )
            )}

          </div>

        )}

      </section>

    </div>
  );
}