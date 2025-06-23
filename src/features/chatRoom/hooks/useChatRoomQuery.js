import { getChatSummaryApi, getMessagesApi } from "../api/chatRoomApi";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const useFetchChatSummary = ({ enabled = false }) => {
  return useQuery({
    queryKey: ["private", "chatSummary"],
    queryFn: getChatSummaryApi,
    enabled, // lazy trigger only
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 分鐘內不重抓
  });
};

export const useInfiniteMessages = ({ recipientId, limit = 20 }) => {
  return useInfiniteQuery({
    queryKey: ["private", "messages", recipientId],
    queryFn: ({ pageParam }) =>
      getMessagesApi({ recipientId, cursor: pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    enabled: !!recipientId,
    retry: false,
  });
};
