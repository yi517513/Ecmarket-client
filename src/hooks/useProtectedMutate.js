import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@app/stores/useAuthStore";
import { notifyUtils as notify } from "@utils/notify";

export const useProtectedMutate = (options) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  return useMutation({
    ...options,
    mutationFn: async (...args) => {
      if (!isAuthenticated) {
        await openAuthModal();
        notify.error("尚未登入");
        throw new Error("Unauthorized"); // 阻擋請求
      }

      return options.mutationFn(...args);
    },
  });
};
