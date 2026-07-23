export default function StatCard({
  title,
  value,
  subtitle,
  onClick,
}) {
  const interactive = typeof onClick === "function";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-4 shadow-sm transition-all duration-200 ${
        interactive
          ? "border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 group"
          : "border-gray-200"
      }`}
    >
      <p
        className={`text-xs font-medium transition-colors ${
          interactive
            ? "text-gray-500 group-hover:text-blue-600"
            : "text-gray-500"
        }`}
      >
        {title}
      </p>

      <h2
        className={`text-3xl font-semibold leading-none mt-2 transition-colors ${
          interactive
            ? "text-gray-900 group-hover:text-blue-600"
            : "text-gray-900"
        }`}
      >
        {value}
      </h2>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}