import StatusBadge from "./StatusBadge";

function IdeaCard({
  title,
  department,
  status,
  likes,
  comments,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div>
        <h3 className="font-medium text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {department}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          ❤️ {likes}
        </span>

        <span className="text-sm text-gray-500">
          💬 {comments}
        </span>

        <StatusBadge status={status} />
      </div>
    </div>
  );
}

export default IdeaCard;