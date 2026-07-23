import api from "../api/axios";

export const approveIdea = async (
  ideaId,
  token
) => {
  const response = await api.patch(
    `/ideas/${ideaId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const rejectIdea = async (
  ideaId,
  token
) => {
  const response = await api.patch(
    `/ideas/${ideaId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};