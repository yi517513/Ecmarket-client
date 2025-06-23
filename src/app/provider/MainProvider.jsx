import React, { useEffect } from "react";
import { useCheckMe } from "@features/auth/hooks/useAuthQuery";
import { FullPageLoading } from "@components/ui/FullPageLoading";
import { useAppStore } from "@app/stores/useAppStore";
import { useAuthStore } from "@stores/useAuthStore";
import { useUserStore } from "@stores/useUserStore";

export const MainProvider = ({ children }) => {
  const isAppReady = useAppStore((s) => s.isAppReady);
  const setAuth = useAuthStore((s) => s.setAuth);
  const setAdmin = useAuthStore((s) => s.setAdmin);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const setAppReady = useAppStore((s) => s.setAppReady);

  const { data: response, isLoading } = useCheckMe();
  const { isAdmin, isAuth, user } = response || {};

  useEffect(() => {
    if (!isLoading) {
      if (response) {
        setAdmin(isAdmin);
        setAuth(isAuth);
        setUserInfo(user);
      }
      setAppReady(true);
    }
  }, [isLoading]);

  if (!isAppReady) return <FullPageLoading />;

  return <>{children}</>;
};
