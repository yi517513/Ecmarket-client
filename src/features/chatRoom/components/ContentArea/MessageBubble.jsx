import { clsx } from "clsx";
import React from "react";

export const MessageBubble = React.memo(({ content, isRead, isFromMe }) => {
  return (
    <p
      className={clsx(
        "relative text-gray-800 text-sm max-w-60 rounded-xl p-2 my-1",
        isFromMe ? "self-end bg-green-200" : "self-start bg-gray-200"
      )}
    >
      {content}
      {isFromMe && (
        <span
          className={clsx(
            "absolute bottom-0 -left-8 text-xs",
            isRead ? "text-gray-600" : "text-red-600"
          )}
        >
          {isRead ? "已讀" : "未讀"}
        </span>
      )}
    </p>
  );
});
