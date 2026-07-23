import api from "../api/axios";

export const createIdea = async (ideaData, token) => {
  const response = await api.post(
    "/ideas",
    ideaData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyIdeas = async (token) => {
  const response = await api.get(
    "/ideas/my-ideas",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyVolunteering = async (token) => {
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

export const getPendingIdeas = async (token) => {
  const response = await api.get(
    "/ideas/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteIdea = async (
  ideaId,
  token
) => {
  const response = await api.delete(
    `/ideas/${ideaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const approveIdea = async (
  ideaId,
  reviewComment,
  token
) => {
  const response = await api.patch(
    `/ideas/${ideaId}/approve`,
    {
      reviewComment,
    },
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
  reviewComment,
  token
) => {
  const response = await api.patch(
    `/ideas/${ideaId}/reject`,
    {
      reviewComment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
  

export const getAllIdeas = async (token) => {
  const response = await api.get(
    "/ideas",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getIdeaById = async (
  ideaId,
  token
) => {
  const response = await api.get(
    `/ideas/${ideaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const volunteerForIdea = async (
  ideaId,
  token
) => {
  const response = await api.post(
    `/ideas/${ideaId}/volunteer`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getReviewedIdeas = async (
  token
) => {
  const response = await api.get(
    "/ideas/reviewed",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};