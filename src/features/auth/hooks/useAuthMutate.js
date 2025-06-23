import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginApi,
  logoutApi,
  registerApi,
  requestOtpApi,
} from "../api/authApi";
import { useAuthStore } from "@stores/useAuthStore";
import { useUserStore } from "@stores/useUserStore";
import { useChatStore } from "@app/stores/useChatStore";
import { useCountdownContext } from "@app/provider/CountdownProvider";
import { notifyUtils as notify } from "@utils/notify";

export const useLogin = () => {
  const { setAdmin, setAuth, closeAuthModal } = useAuthStore((state) => state);
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  return useMutation({
    mutationFn: loginApi,
    onMutate: () => {
      notify.loading("正在登入中");
    },
    onSuccess: (response) => {
      const { isAdmin, isAuth, user } = response || {};

      setAdmin(isAdmin);
      setAuth(isAuth);
      setUserInfo(user);
      closeAuthModal();
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const clearChat = useChatStore((s) => s.clearChat);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // 清除 zustand 狀態
      clearAuth();
      clearChat();

      // 清除 query 資料
      queryClient.removeQueries({
        predicate: (query) => query?.queryKey?.includes?.("private"),
      });
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    onMutate: () => {
      notify.loading("正在註冊中");
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error("Register failed", error);
    },
  });
};

export const useRequestOtp = () => {
  // 倒數功能
  const { startCountdown } = useCountdownContext();

  return useMutation({
    mutationFn: requestOtpApi,
    onMutate: () => {
      notify.loading("正在發送信箱");
    },
    onSuccess: () => {
      startCountdown({ count: 60 });
    },
    onError: (error) => {
      console.error("requestOtp failed", error);
    },
  });
};
