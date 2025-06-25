import React from "react";
import { useChatStore } from "@app/stores/useChatStore";
import { LoadingSpan } from "@features/chatRoom/components/LoadingSpan";
import { useNotifyListener } from "../hooks/useNotifyListener";
import { notifyUtils as notify } from "@utils/notify";
import clsx from "clsx";

export const ChatRoomToggleButton = ({ socketRef, isSocketReady }) => {
  const openChatRoom = useChatStore((s) => s.openChatRoom);

  const { notifyIndicator, clearNotify } = useNotifyListener(
    socketRef,
    isSocketReady
  );

  const handleOpen = () => {
    if (isSocketReady) {
      clearNotify();
      openChatRoom();
    } else {
      notify.error("聊天室尚未連線");
    }
  };

  return (
    <div
      onClick={handleOpen}
      className={clsx(
        "h-10 w-64 flex flex-row items-center rounded-xl border-2 shadow-lg cursor-pointer",
        "bg-gray-500 hover:bg-gray-600 border-gray-600",
        notifyIndicator && "animate-blink font-extrabold"
      )}
    >
      <div className="p-4">
        <LoadingSpan ready={isSocketReady} />
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 text-white font-bold text-xl">
        即時通訊
      </span>
    </div>
  );
};
