import {
  Clock,
  ArrowRight,
  User,
  Building2,
  Tag,
} from "lucide-react";

export default function PendingReviewCard({
  idea,
  onReview,
}) {
  const submittedDate = new Date(
    idea.createdAt
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleClick = () => {
    onReview(idea);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="p-5">

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {idea.title}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">

          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">
            <Tag size={13} />
            {idea.category}
          </span>

          <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
            <Building2 size={13} />
            {idea.department}
          </span>

        </div>

        {/* Details */}
        <div className="mt-5 space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <User
              size={15}
              className="text-blue-600"
            />

            <span>
              <span className="font-medium text-gray-700">
                Submitted By:
              </span>{" "}
              {idea.submittedBy?.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock
              size={15}
              className="text-blue-600"
            />

            <span>
              <span className="font-medium text-gray-700">
                Submitted:
              </span>{" "}
              {submittedDate}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Review
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

        </div>

      </div>

    </div>
  );
}