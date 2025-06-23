import React, { useState } from "react";
import { useEmitTyping } from "../hooks/useEmitTyping";
import { useSendMessage } from "../hooks/useChatRoomMutate";
import { useChatStore } from "@app/stores/useChatStore";

export const ChatInput = ({ socketRef, setInputContainer }) => {
  const recipientId = useChatStore((s) => s.recipient?.userId);
  const [input, setInput] = useState("");

  const { emitTyping } = useEmitTyping(socketRef);

  const { mutate: sendMessage } = useSendMessage();

  const handleInput = (e) => {
    setInput(e.target.value);
    emitTyping(); // 事件驅動 emit
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!input) return;

      sendMessage({ content: input, recipientId }); // HTTP 請求儲存到 DB
      setInput("");
    }
  };

  return (
    <textarea
      ref={setInputContainer}
      placeholder="按 Enter 發送訊息，按 Shift+Enter 換行"
      value={input}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      className="text-sm w-full h-20 resize-none p-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
    />
  );
};
