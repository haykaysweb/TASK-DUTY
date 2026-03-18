import axiosClient from "../utils/axiosClient";

export const createTask = async (formData, accessToken) => {
  return await axiosClient.post("/task/create", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTasks = async (accessToken, searchTerm = "") => {
  return await axiosClient.get(`/task/get?search=${searchTerm}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTask = async (id, formData, accessToken) => {
  return await axiosClient.patch(`/task/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTask = async (id, accessToken) => {
  return await axiosClient.delete(`/task/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
