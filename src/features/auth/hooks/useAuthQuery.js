import { checkMeApi, getSessionsApi } from "../api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useProtectedQuery } from "@hooks/useProtectedQuery";

export const useCheckMe = () => {
  return useQuery({
    queryKey: ["private", "appInit"],
    queryFn: checkMeApi,
  });
};

export const useSession = () => {
  return useProtectedQuery({
    queryKey: ["private", "sessions"],
    queryFn: getSessionsApi,
    retry: false,
  });
};
