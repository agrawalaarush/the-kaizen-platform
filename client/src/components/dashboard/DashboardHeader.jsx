export default function DashboardHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-2 text-gray-600 text-lg">
        {subtitle}
      </p>
    </div>
  );
}