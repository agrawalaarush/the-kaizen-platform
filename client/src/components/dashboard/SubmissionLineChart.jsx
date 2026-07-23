import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function SubmissionLineChart({ data }) {
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
>          Submission Trend
        </h2>

<p
  className="text-[#6b7280] mt-1"
  style={{ fontSize: "12.5px" }}
>          Submitted vs Approved Ideas Over Time
        </p>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="date"
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          />

          <Legend
            verticalAlign="top"
            height={40}
          />

          {/* Light Blue Area */}
          <Area
            type="natural"
            dataKey="submitted"
            fill="#DBEAFE"
            stroke="none"
            fillOpacity={0.6}
            legendType="none"
          />

          {/* Submitted */}
          <Line
            type="natural"
            dataKey="submitted"
            name="Submitted"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              r: 4,
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
            }}
          />

          {/* Approved */}
          <Line
            type="natural"
            dataKey="approved"
            name="Approved"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{
              r: 4,
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
            }}
          />

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubmissionLineChart;