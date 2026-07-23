import api from "../api/axios";

export const loginUser = async (
  email,
  password
) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const registerUser = async (
  email,
  password
) => {
  const response = await api.post(
    "/auth/register",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const getCurrentUser = async (
  token
) => {
  const response = await api.get(
    "/auth/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};