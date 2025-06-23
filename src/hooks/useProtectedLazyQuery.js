import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@app/stores/useAuthStore";
import { notifyUtils as notify } from "@utils/notify";

export const useProtectedLazyQuery = (options) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  return useQuery({
    ...options,
    enabled: options.enabled ?? false, // lazy trigger only
    queryFn: async (...args) => {
      if (!isAuthenticated) {
        await openAuthModal();
        notify.error("尚未登入");
        throw new Error("Unauthorized");
      }

      return options.queryFn(...args);
    },
  });
};
