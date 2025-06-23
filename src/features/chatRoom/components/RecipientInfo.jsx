import { useChatStore } from "@app/stores/useChatStore";
import React from "react";
import { X } from "lucide-react";

export const RecipientInfo = () => {
  const closeChatRoom = useChatStore((s) => s.closeChatRoom);
  const { uid, username } = useChatStore((s) => s.recipient) || {};
  const typingFromRecipient = useChatStore((s) => s.typingFromRecipient);

  return (
    <div className="h-[10%] flex items-center justify-between border-b border-gray-300">
      <div className="ml-4 flex flex flex-row items-center gap-4">
        <span className="text-sm font-semibold text-gray-900 truncate w-30">
          {username}
        </span>
        <span className="text-xs font-semibold text-gray-500 truncate">
          {uid ? `No.${uid}` : "即時通訊"}
        </span>
        {typingFromRecipient && (
          <span className="text-sm italic text-gray-500 animate-pulse">
            正在輸入中...
          </span>
        )}
      </div>
      <div className="mr-4">
        <X
          className="w-5 h-5 stroke-[2.5] text-gray-600 cursor-pointer"
          onClick={closeChatRoom}
        />
      </div>
    </div>
  );
};
