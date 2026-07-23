export default function ReviewerActivityChart({
  data,
  onNavigate,
}) {
  const approved = data.reduce(
    (sum, item) => sum + item.approved,
    0
  );

  const rejected = data.reduce(
    (sum, item) => sum + item.rejected,
    0
  );

  const total = approved + rejected;

  const approvalRate =
    total === 0
      ? 0
      : Math.round((approved / total) * 100);

  const SummaryItem = ({
    label,
    value,
    status,
    large = false,
    clickable = true,
  }) => (
    <button
      disabled={!clickable}
      onClick={() => onNavigate?.(status)}
      className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all ${
        clickable
          ? "hover:bg-gray-50 cursor-pointer"
          : "cursor-default"
      }`}
    >
      <span className="text-sm text-gray-600">
        {label}
      </span>

      <span
        className={`font-semibold text-gray-900 ${
          large ? "text-xl" : "text-base"
        }`}
      >
        {value}
      </span>

    </button>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

      <div className="p-5">

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-900">
            Review Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your review performance overview
          </p>

        </div>

        <div className="space-y-1">

          <SummaryItem
            label="Approved"
            value={approved}
            status="Approved"
            large
          />

          <SummaryItem
            label="Rejected"
            value={rejected}
            status="Rejected"
            large
          />

          <div className="border-t my-2"></div>

          <SummaryItem
            label="Total Reviews"
            value={total}
            status="All"
          />

          <SummaryItem
            label="Approval Rate"
            value={`${approvalRate}%`}
            clickable={false}
          />

        </div>

        {total === 0 && (

          <div className="border-t mt-4 pt-4">

            <p className="text-sm text-center text-gray-500">
              No reviews completed yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}