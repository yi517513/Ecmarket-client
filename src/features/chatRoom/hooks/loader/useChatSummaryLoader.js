import { useChatStore } from "@app/stores/useChatStore";
import { useFetchChatSummary } from "../useChatRoomQuery";
import { useEffect } from "react";

export const useChatSummaryLoader = () => {
  const isChatRoomOpen = useChatStore((s) => s.isChatRoomOpen);
  const setChatSummary = useChatStore((s) => s.setChatSummary);
  const { data: summaries, isLoading } = useFetchChatSummary({
    enabled: isChatRoomOpen,
  });

  useEffect(() => {
    if (!summaries || isLoading) return;

    setChatSummary(summaries);
  }, [summaries, isLoading]);
};
