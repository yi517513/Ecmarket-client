import {
  sendMessageApi,
  getUserInfo,
  markMessagesAsRead,
} from "../api/chatRoomApi";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessageApi,
  });
};

export const useMarkMessagesAsRead = () => {
  return useMutation({
    mutationFn: markMessagesAsRead,
  });
};
