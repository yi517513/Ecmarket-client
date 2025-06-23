import { useEffect, useRef } from "react";
import { useChatStore } from "@stores/useChatStore";

export const useTypingListener = (socketRef, currentChatUserId) => {
  const timeoutRef = useRef(null);
  const setTypingFromRecipient = useChatStore((s) => s.setTypingFromRecipient);

  useEffect(() => {
    if (!socketRef.current) return;

    const handleTyping = ({ from }) => {
      if (from === currentChatUserId) setTypingFromRecipient(true);

      // 清掉對方 typing 狀態（3 秒內沒再打字就關掉）
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTypingFromRecipient(false);
      }, 3000);
    };

    socketRef.current.on("server:chatRoom:typing", handleTyping);

    return () => {
      socketRef.current?.off("server:chatRoom:typing", handleTyping);
      clearTimeout(timeoutRef.current);
    };
  }, []);
};
