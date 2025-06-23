import { api } from "@utils/apiClient";
import { getDeviceLabel } from "@utils/getDeviceLabel";

// 登入
export const loginApi = async (values) => {
  const device = getDeviceLabel();

  return await api.post("/api/auth/login", { ...values, device });
};

// 登出
export const logoutApi = async () => {
  return await api.post("/api/auth/logout");
};

// 註冊
export const registerApi = async (values) => {
  return await api.post("/api/auth/register", values);
};

// 發送驗證碼
export const requestOtpApi = async (email) => {
  return await api.post("/api/auth/send-code", email);
};

export const checkMeApi = async () => {
  return await api.get("/api/auth/me", { meta: { skipNotify: true } });
};

export const getSessionsApi = async () => {
  return await api.get("/api/session");
};
