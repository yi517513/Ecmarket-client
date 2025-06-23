import axios from "axios";
import { notifyUtils as notify } from "@utils/notify";
import { useAuthStore } from "@stores/useAuthStore";

// const baseURL = import.meta.env.VITE_LOCAL; // 本地
const baseURL = import.meta.env.VITE_ZEABUR; // 雲端

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    const { message, data } = response?.data || {};
    if (message) {
      notify.success(message);
    }

    return data;
  },
  (error) => {
    const config = error.config || {};
    const { status, data } = error.response || {};
    const { message, code } = data || {};

    if (!error.response) {
      notify.error("伺服器尚未開啟，請稍後嘗試");
      return Promise.reject(error);
    }

    if (status === 401) {
      const store = useAuthStore.getState();
      store.openAuthModal();
    } else if (!config.silent) {
      notify.error(message || "發生錯誤");
    }

    if (code === "CONFLICT_UPDATED") {
      notify.error("商品資訊已更新，正在重新整理…");

      // 刷新
      setTimeout(() => window.location.reload(), 2000);
    }

    return Promise.reject(error);
  }
);
