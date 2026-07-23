import api from "../api/axios";

export const getDashboardStats = async (token) => {
  const response = await api.get("/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEmployeeDashboard = async (token) => {
  const response = await api.get("/dashboard/employee", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getReviewerDashboard = async (token) => {
  const response = await api.get("/dashboard/reviewer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};