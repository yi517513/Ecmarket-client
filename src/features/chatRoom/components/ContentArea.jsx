import React, { useRef } from "react";
import { useChatStore } from "@stores/useChatStore";
import { useUserStore } from "@app/stores/useUserStore";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { ChatMessage } from "./ContentArea/ChatMessage";
import { MessageBubble } from "./ContentArea/MessageBubble";
import { ScrollAnchor } from "./ContentArea/ScrollAnchor";
import { MarkAsReadAnchor } from "./ContentArea/MarkAsReadAnchor";
import { useMessagesLoader } from "../hooks/loader/useMessagesLoader";
import { useIncomingMessages } from "../hooks/useIncomingMessages";
import { useScrollToTarget } from "../hooks/useScrollToTarget";
import { useTypingListener } from "../hooks/useTypingListener";

export const ContentArea = ({ socketRef }) => {
  const containerRef = useRef(null);
  const currentUserId = useUserStore((s) => s.userId);
  const messages = useChatStore((s) => s.messages);
  const currentChatUserId = useChatStore((s) => s.currentChatUserId);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessagesLoader(); // 載入訊息

  useIncomingMessages(socketRef, currentChatUserId); // 處理進來的訊息

  useTypingListener(socketRef, currentChatUserId); // 目前聊天對象，監聽並設定輸入狀態

  // scrollIntoView 到指定位置 lastMsg or unreadMsg
  const { firstUnreadId, scrollTargetId, scrollRefCallback } =
    useScrollToTarget({ messages, currentUserId });

  // === onVisible 時 加入更新佇列、樂觀更新 ===
  const { setMarkAsReadSentinelRef } = useMarkAsRead({
    deps: [currentChatUserId],
    rootRef: containerRef,
  });

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
      }}
      className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      <div className="flex flex-col p-2 h-full">
        {hasNextPage && (
          <button
            onClick={fetchNextPage}
            className="px-4 py-2 text-sm text-gray-700 transition hover:scale-105"
          >
            點擊載入更多
          </button>
        )}
        {isFetchingNextPage && (
          <div className="text-sm text-center py-2 text-gray-500">
            載入中...
          </div>
        )}

        {/* 訊息列表 */}
        {messages?.map?.((message, idx) => {
          const { _id, from, content, isRead } = message || {};
          const isFromMe = currentUserId === from;
          const isUnread = !isFromMe && !isRead;
          const isScrollTarget = scrollTargetId === _id;
          // const isFirstUnread = firstUnreadId === _id;

          return (
            <ChatMessage key={_id || idx}>
              {isScrollTarget && <ScrollAnchor ref={scrollRefCallback} />}

              {isUnread && (
                <MarkAsReadAnchor msgId={_id} ref={setMarkAsReadSentinelRef} />
              )}

              {/* {isFirstUnread && (
                <UnreadHint hasInput={hasInputRef} hasScroll={hasScrollRef} />
              )} */}

              <MessageBubble
                content={content}
                isRead={isRead}
                isFromMe={isFromMe}
              />
            </ChatMessage>
          );
        })}
      </div>
    </div>
  );
};
