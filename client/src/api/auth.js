import axiosClient from "../utils/axiosClient";

export const registerUser = async (FormData) => {
  return await axiosClient.post("/user/create", FormData);
};

export const loginUser = async (FormData) => {
  return await axiosClient.post("/user/login", FormData);
};

export const logoutUser = async (accessToken) => {
  return await axiosClient.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    {
      withCredentials: true,
    }
  );
};

export const getAuthUser = async (accessToken) => {
  return await axiosClient.get("/user/get", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};