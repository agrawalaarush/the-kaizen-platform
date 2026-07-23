import api from "../api/axios";

export const getAllDepartments = async (
  token
) => {
  const response = await api.get(
    "/departments",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createDepartment = async (
  departmentData,
  token
) => {
  const response = await api.post(
    "/departments",
    departmentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};