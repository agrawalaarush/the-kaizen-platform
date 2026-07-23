import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export default function ReviewerCategoryChart({
  data,
  onCategoryClick,
}) {
  const totalIdeas = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

      <div className="p-5">

        <div className="flex items-start justify-between mb-4">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Ideas by Category
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Distribution of ideas awaiting review
            </p>
          </div>

          <button
            onClick={() => onCategoryClick?.("All")}
            className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition"
          >
            {totalIdeas} Pending
          </button>

        </div>

        {data.length === 0 ? (

          <div className="h-[220px] flex flex-col justify-center items-center text-center">

            <h3 className="text-base font-semibold text-gray-800">
              No Pending Ideas
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              New submissions awaiting review will appear here.
            </p>

          </div>

        ) : (

          <div className="h-[220px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  strokeWidth={2}
                  labelLine={false}
                  onClick={(entry) =>
                    onCategoryClick?.(entry.name)
                  }
                  label={({ cx, cy }) => (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        dy="-0.25em"
                        fontSize="22"
                        fontWeight="600"
                        fill="#111827"
                      >
                        {totalIdeas}
                      </tspan>

                      <tspan
                        x={cx}
                        dy="1.5em"
                        fontSize="11"
                        fill="#6B7280"
                      >
                        Pending
                      </tspan>

                    </text>
                  )}
                >

                  {data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        cursor: "pointer",
                      }}
                    />

                  ))}

                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value} Ideas`,
                    "Count",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  height={20}
                  wrapperStyle={{
                    fontSize: "12px",
                  }}
                  formatter={(value) => (
                    <span
                      onClick={() =>
                        onCategoryClick?.(value)
                      }
                      className="cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {value}
                    </span>
                  )}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>
  );
}