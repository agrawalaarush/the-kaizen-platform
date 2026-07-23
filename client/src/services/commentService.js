import api from "../api/axios";

export const getCommentsByIdea = async (
  ideaId,
  token
) => {
  const response = await api.get(
    `/ideas/${ideaId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addComment = async (
  ideaId,
  text,
  token
) => {
  const response = await api.post(
    `/ideas/${ideaId}/comments`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
