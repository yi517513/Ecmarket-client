import React from "react";
import { useChatStore } from "@app/stores/useChatStore";
import { useChatSummaryLoader } from "../hooks/loader/useChatSummaryLoader";
import { useChatSummarySync } from "../hooks/useChatSummarySync";
import { User as UserIcon } from "lucide-react";
import clsx from "clsx";

export const ChatSummary = ({ socketRef }) => {
  const setRecipient = useChatStore((s) => s.setRecipient);
  const chatSummary = useChatStore((s) => s.chatSummary);

  useChatSummaryLoader();
  useChatSummarySync(socketRef);

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-gray-300 custom-scrollbar">
      {chatSummary?.map?.((summary, index) => {
        const { chatId, userId, uid, username, lastMessage, unreadCount } =
          summary || {};
        return (
          <div
            key={chatId || index}
            onClick={() => setRecipient({ userId, uid, username })}
            className={clsx(
              "flex gap-2 h-16 items-center cursor-pointer hover:bg-blue-100 transition-colors duration-150"
            )}
          >
            <div className="relative">
              <UserIcon className="w-6 h-6 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1 leading-none font-semibold">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {username}
              </span>
              <span className="text-xs text-gray-500 truncate ">
                {lastMessage}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
