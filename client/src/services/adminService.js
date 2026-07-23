import api from "../api/axios";

export const getAnalytics = async (
  token
) => {
  const response = await api.get(
    "/admin/analytics",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};