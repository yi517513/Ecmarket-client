import { getUserInfoByUid, getUserInfoById } from "../api/userApi";
import { useMutation } from "@tanstack/react-query";

export const useFetchUserInfoByUid = () => {
  return useMutation({
    mutationFn: getUserInfoByUid,
  });
};

export const useFetchUserInfoById = () => {
  return useMutation({
    mutationFn: getUserInfoById,
  });
};
