import api from "../services/api";

export const getMyProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

export const createOrUpdateProfile = async (profileData) => {
  const config =
    profileData instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined;

  const res = await api.put("/profile/me", profileData, config);
  return res.data;
};

export const getProfileByUserId = async (userId) => {
  const res = await api.get(`/profile/${userId}`);
  return res.data;
};
