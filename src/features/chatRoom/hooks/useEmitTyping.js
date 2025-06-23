import { useCallback } from "react";
import { useChatStore } from "@stores/useChatStore";
import debounce from "lodash.debounce";

export const useEmitTyping = (socketRef) => {
  const recipientId = useChatStore((s) => s.recipient?.userId);

  const emitTyping = useCallback(
    debounce(() => {
      if (socketRef.current && recipientId) {
        socketRef.current.emit("chatRoom:typing", { to: recipientId });
      }
    }, 500),
    [recipientId]
  );

  return { emitTyping };
};
