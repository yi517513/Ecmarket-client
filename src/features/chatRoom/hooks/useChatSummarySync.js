import { useEffect } from "react";
import { useChatStore } from "@stores/useChatStore";

export const useChatSummarySync = (socketRef) => {
  const updateChatSummary = useChatStore((s) => s.updateChatSummary);

  useEffect(() => {
    if (!socketRef.current) return;

    const updateSummary = (newSummary) => {
      updateChatSummary(newSummary);
    };

    socketRef.current.on("server:chatRoom:updateSummary", updateSummary);

    return () => {
      socketRef.current?.off("server:chatRoom:updateSummary", updateSummary);
    };
  }, []);
};
