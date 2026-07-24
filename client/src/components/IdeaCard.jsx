import StatusBadge from "./StatusBadge";

function IdeaCard({
  title,
  department,
  status,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-4 px-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div>
        <h3 className="font-medium text-gray-900">
          {title}
        </h3>

        {department && (
          <p className="text-sm text-gray-500 mt-1">
            {department}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

export default IdeaCard;