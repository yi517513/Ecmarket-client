import { useEffect } from "react";
import { useChatStore } from "@stores/useChatStore";

export const useIncomingMessages = (socketRef, currentChatUserId) => {
  const appendMessage = useChatStore((s) => s.appendMessage);

  useEffect(() => {
    if (!socketRef.current) return;

    const handleAppendMessage = (newMessage) => {
      const senderId = newMessage?.from;
      const recipientId = newMessage?.to;
      if (senderId === currentChatUserId || recipientId === currentChatUserId) {
        appendMessage(newMessage);
      }
    };

    socketRef.current.on("server:chatRoom:sendMessage", handleAppendMessage);

    return () => {
      socketRef.current?.off(
        "server:chatRoom:sendMessage",
        handleAppendMessage
      );
    };
  }, [currentChatUserId]);
};
