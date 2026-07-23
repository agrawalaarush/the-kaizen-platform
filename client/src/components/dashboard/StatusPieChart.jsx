import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = {
  "Pending Review": "#3B82F6",
  Approved: "#22C55E",
  Rejected: "#EF4444",
  "In Progress": "#F59E0B",
  Implemented: "#8B5CF6",
};

function StatusPieChart({ data }) {
  const totalIdeas = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const chartData =
    totalIdeas === 0
      ? [
          {
            name: "No Ideas",
            value: 1,
          },
        ]
      : data;

  return (
    <div
      className="bg-white rounded-2xl border border-[#e7eaef] p-6 h-[340px]"
      style={{
        boxShadow: "0 1px 2px rgba(16,24,40,.03)",
      }}
    >
      <div className="mb-5">
        <h2
          className="font-bold text-[#111827]"
          style={{ fontSize: "15px" }}
        >
          Ideas by Status
        </h2>

        <p
          className="text-[#6b7280] mt-1"
          style={{ fontSize: "12.5px" }}
        >
          Distribution of your submitted ideas
        </p>
      </div>

      <div className="flex items-center justify-between h-[240px]">
        {/* Donut Chart */}
        <div className="relative w-[60%] h-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                stroke="white"
                strokeWidth={3}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      totalIdeas === 0
                        ? "#E5E7EB"
                        : COLORS[entry.name]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-bold text-gray-900">
              {totalIdeas}
            </h2>

            <p
              className="text-gray-500"
              style={{
                fontSize: "12px",
              }}
            >
              Total Ideas
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="w-[40%] space-y-4">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      totalIdeas === 0
                        ? "#E5E7EB"
                        : COLORS[item.name],
                  }}
                />

                <span className="text-sm text-gray-700">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-gray-900">
                {totalIdeas === 0
                  ? 0
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatusPieChart;