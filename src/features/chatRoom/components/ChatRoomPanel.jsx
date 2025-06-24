import React from "react";
import { Bot as BotIcon } from "lucide-react";
import { ContentArea } from "./ContentArea";
import { ChatSummary } from "./ChatSummary";
import { ChatInput } from "./ChatInput";
import { RecipientSearch } from "./RecipientSearch";
import { SelfInfo } from "./SelfInfo";
import { RecipientInfo } from "./RecipientInfo";

import { useChatStore } from "@app/stores/useChatStore";

export const ChatRoomPanel = ({ socketRef }) => {
  const recipientId = useChatStore((s) => s.recipient?.userId);

  return (
    <div className="flex h-full">
      <div className="flex flex-col divide-y divide-gray-300 h-full max-w-36 border-r border-gray-300">
        <SelfInfo />
        <RecipientSearch />
        <ChatSummary socketRef={socketRef} />
      </div>
      <div className="flex flex-col h-full basis-[75%]">
        <RecipientInfo />
        <div className="flex flex-col h-[90%] relative">
          <ContentArea socketRef={socketRef} />
          {recipientId ? (
            <ChatInput socketRef={socketRef} />
          ) : (
            <BotIcon className="text-gray-300 w-80 h-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
    </div>
  );
};
