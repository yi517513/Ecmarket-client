import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@app/stores/useAuthStore";

export const useProtectedQuery = (options) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  useEffect(() => {
    if (!isAuthenticated) {
      // 開啟 登入/註冊 彈窗
      openAuthModal();
    }
  }, [isAuthenticated]);

  return useQuery({
    ...options,
    // options.enabled 預設為 true（依 isAuthenticated 判斷是否啟用）
    // 若 options.enabled 有設值，則可延後或條件觸發，設為 false 則完全禁用
    enabled: isAuthenticated && (options.enabled ?? true),
  });
};
