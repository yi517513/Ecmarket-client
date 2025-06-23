import { api } from "@utils/apiClient";

// 搜訊用戶
export const getUserInfoByUid = async (uid) => {
  return await api.get("/api/users", { params: { uid }, silent: true });
};

export const getUserInfoById = async (id) => {
  return await api.get("/api/users", { params: { id }, silent: true });
};
