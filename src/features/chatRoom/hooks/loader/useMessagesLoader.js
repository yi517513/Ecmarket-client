import { useEffect } from "react";
import { useChatStore } from "@stores/useChatStore";
import { useInfiniteMessages } from "../useChatRoomQuery";

export const useMessagesLoader = () => {
  const recipientId = useChatStore((s) => s.recipient?.userId);
  const setMessages = useChatStore((s) => s.setMessages);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMessages({ recipientId });

  useEffect(() => {
    if (!data) return;
    const flatMessages = [...data.pages]
      .reverse()
      .flatMap((page) => page.messages);
    setMessages(flatMessages, recipientId);
  }, [data]);

  return { fetchNextPage, hasNextPage, isFetchingNextPage };
};
