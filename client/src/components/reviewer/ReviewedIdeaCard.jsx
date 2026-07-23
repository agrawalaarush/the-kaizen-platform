import {
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

export default function ReviewedIdeaCard({
  idea,
  onOpen,
}) {
  const reviewedDate = new Date(
    idea.reviewedAt
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const approved =
    idea.status === "Approved";

  const handleClick = () => {
    if (onOpen) {
      onOpen(idea);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group bg-white border rounded-xl p-5 shadow-sm transition-all duration-200 ${
        onOpen
          ? "cursor-pointer hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">

        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {idea.title}
        </h3>

        <span
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            approved
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {approved ? (
            <CheckCircle size={13} />
          ) : (
            <XCircle size={13} />
          )}

          {idea.status}
        </span>

      </div>

      <div className="mt-4 space-y-2">

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">
            Submitted by:
          </span>{" "}
          {idea.submittedBy?.name}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">
            Reviewed:
          </span>{" "}
          {reviewedDate}
        </p>

      </div>

      <div className="mt-4 bg-gray-50 rounded-lg p-3">

        <p className="text-sm text-gray-600 italic line-clamp-2">
          {idea.reviewComment ||
            "No review comment provided."}
        </p>

      </div>

      {onOpen && (
        <div className="mt-5 flex justify-end">

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Idea

            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />

          </button>

        </div>
      )}

    </div>
  );
}