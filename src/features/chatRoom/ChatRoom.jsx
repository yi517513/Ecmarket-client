import React from "react";
import { useChatStore } from "@app/stores/useChatStore";
import clsx from "clsx";

import { ChatRoomPanel } from "./components/ChatRoomPanel";
import { ChatRoomToggleButton } from "./components/ChatRoomToggleButton";
import { useSocketConnect } from "./hooks/useSocketConnect";
import { useSendMarkAsReadEffect } from "./hooks/markAsRead/useSendMarkAsReadEffect";

export const ChatRoom = () => {
  const isChatRoomOpen = useChatStore((s) => s.isChatRoomOpen);
  const { socketRef, isSocketReady } = useSocketConnect();

  useSendMarkAsReadEffect();

  return (
    <div
      className={clsx(
        "fixed bottom-12 right-10",
        isChatRoomOpen && "h-[492px] w-[564px] bg-white border border-gray-300"
      )}
    >
      {isChatRoomOpen ? (
        <ChatRoomPanel socketRef={socketRef} />
      ) : (
        <ChatRoomToggleButton
          socketRef={socketRef}
          isSocketReady={isSocketReady}
        />
      )}
    </div>
  );
};
