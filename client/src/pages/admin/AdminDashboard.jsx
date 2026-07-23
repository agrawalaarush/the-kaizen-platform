import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalytics } from "../../services/adminService";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalIdeas: 0,
    approvedIdeas: 0,
    rejectedIdeas: 0,
    pendingIdeas: 0,
    approvalRate: 0,
    ideasByDepartment: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAnalytics(token);
        setStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, []);

  const departmentData = [
    ...(stats.ideasByDepartment || []),
  ].sort((a, b) => b.count - a.count);

  const statusData = [
    {
      name: "Approved",
      value: stats.approvedIdeas,
      color: "#22C55E",
    },
    {
      name: "Pending",
      value: stats.pendingIdeas,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value: stats.rejectedIdeas,
      color: "#EF4444",
    },
  ];

  const BAR_COLORS = [
    "#2563EB",
    "#7C3AED",
    "#F59E0B",
    "#16A34A",
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Platform analytics and idea insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <div
          onClick={() => navigate("/all-ideas")}
          className="bg-white rounded-2xl border border-[#e7eaef] p-5 cursor-pointer hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">
            Total Ideas
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.totalIdeas}
          </h2>
        </div>

        <div
          onClick={() => navigate("/all-ideas")}
          className="bg-white rounded-2xl border border-[#e7eaef] p-5 cursor-pointer hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">
            Approved
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats.approvedIdeas}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            ▲ {stats.approvalRate}% approval rate
          </p>
        </div>

        <div
          onClick={() => navigate("/all-ideas")}
          className="bg-white rounded-2xl border border-[#e7eaef] p-5 cursor-pointer hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">
            Rejected
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {stats.rejectedIdeas}
          </h2>
        </div>

        <div
          onClick={() => navigate("/pending-ideas")}
          className="bg-white rounded-2xl border border-[#e7eaef] p-5 cursor-pointer hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-amber-500 mt-2">
            {stats.pendingIdeas}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Awaiting review
          </p>
        </div>

      </div>

      {/* Analytics Row */}
      <div
        className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5"
      >

        {/* Department Card */}
        <div
          className="bg-white border border-[#e7eaef] rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 2px rgba(16,24,40,.03)",
          }}
        >
          <h2
            className="font-bold text-[#111827]"
            style={{ fontSize: "15px" }}
          >
            Ideas by Department
          </h2>

          <p
            className="text-[#6b7280] mt-1"
            style={{ fontSize: "12.5px" }}
          >
            Where submissions are coming from
          </p>

          <div className="mt-6 space-y-[14px]">

            {departmentData.map((item, index) => {

              const max =
                departmentData[0]?.count || 1;

              const width =
                (item.count / max) * 100;

              return (
                <div key={item._id}>

                  <div className="flex justify-between mb-2">

                    <span
                      className="font-semibold text-gray-700"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item._id}
                    </span>

                    <span
                      className="font-semibold text-gray-700"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.count}
                    </span>

                  </div>

                  <div
                    className="w-full rounded-full"
                    style={{
                      height: "8px",
                      background: "#f0f1f5",
                    }}
                  >

                    <div
                      className="rounded-full"
                      style={{
                        width: `${width}%`,
                        height: "8px",
                        background:
                          BAR_COLORS[
                            index %
                              BAR_COLORS.length
                          ],
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Status Card */}
        <div
          className="bg-white border border-[#e7eaef] rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 2px rgba(16,24,40,.03)",
          }}
        >
          <h2
            className="font-bold text-[#111827]"
            style={{ fontSize: "15px" }}
          >
            Status Breakdown
          </h2>

          <p
            className="text-[#6b7280] mt-1"
            style={{ fontSize: "12.5px" }}
          >
            Current idea status
          </p>

          <div className="flex items-center justify-between mt-6">

            {/* Donut */}
            <div className="relative w-[130px] h-[130px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={statusData.filter(
                      (item) => item.value > 0
                    )}
                    dataKey="value"
                    innerRadius={42}
                    outerRadius={58}
                    paddingAngle={5}
                    cornerRadius={12}
                    stroke="none"
                    label={false}
                  >
                    {statusData
                      .filter(
                        (item) =>
                          item.value > 0
                      )
                      .map((item) => (
                        <Cell
                          key={item.name}
                          fill={item.color}
                        />
                      ))}
                  </Pie>

                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalIdeas}
                </span>

                <span
                  className="text-gray-500"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  total
                </span>

              </div>

            </div>

            {/* Legend */}
            <div className="flex-1 ml-6 space-y-4">

              {statusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="rounded-full"
                      style={{
                        width: "9px",
                        height: "9px",
                        background:
                          item.color,
                      }}
                    />

                    <span
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.name}
                    </span>

                  </div>

                  <span
                    className="font-medium"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {item.value}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;