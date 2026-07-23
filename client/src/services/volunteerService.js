import api from "../api/axios";

export const getMyVolunteering = async (
  token
) => {
  const response = await api.get(
    "/volunteers/my-volunteering",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};