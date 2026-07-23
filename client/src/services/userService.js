import api from "../api/axios";

export const getAllUsers = async (token) => {
  const response = await api.get(
    "/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateUserRole = async (
  userId,
  role,
  token
) => {
  const response = await api.patch(
    `/users/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateUserDepartment = async (
  userId,
  department,
  token
) => {
  const response = await api.patch(
    `/users/${userId}/department`,
    { department },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateUserStatus = async (
  userId,
  isActive,
  token
) => {
  const response = await api.patch(
    `/users/${userId}/status`,
    { isActive },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};