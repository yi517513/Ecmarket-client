import { useChatStore } from "@app/stores/useChatStore";
import { useCallback, useEffect } from "react";

// 更新發送者的已讀狀態
export const useMarkAsReadListener = (socketRef) => {
  const currentRecipientId = useChatStore((s) => s.recipient?.userId);
  const updateMessagesAsRead = useChatStore((s) => s.updateMessagesAsRead);

  const handleMessageRead = useCallback(
    ({ recipientId, messageIds }) => {
      if (!messageIds || !recipientId) return;
      if (currentRecipientId === recipientId) {
        updateMessagesAsRead(messageIds);
      }
    },
    [currentRecipientId]
  );

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("server:chatRoom:onMessageRead", handleMessageRead);
    return () => {
      socketRef.current?.off(
        "server:chatRoom:onMessageRead",
        handleMessageRead
      );
    };
  }, [currentRecipientId]);
};
