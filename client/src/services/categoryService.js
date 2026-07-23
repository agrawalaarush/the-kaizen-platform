import api from "../api/axios";

export const getAllCategories = async (
  token
) => {
  const response = await api.get(
    "/categories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createCategory = async (
  categoryData,
  token
) => {
  const response = await api.post(
    "/categories",
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};