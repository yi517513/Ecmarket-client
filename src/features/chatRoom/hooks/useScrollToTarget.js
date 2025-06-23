import { useCallback, useMemo } from "react";

export const useScrollToTarget = ({ messages, currentUserId }) => {
  const firstUnreadId = useMemo(() => {
    return messages.find((m) => m?.from !== currentUserId && !m?.isRead)?._id;
  }, [messages, currentUserId]);

  const lastMessageId = useMemo(() => {
    return messages[messages.length - 1]?._id;
  }, [messages]);

  const unreadCount = useMemo(() => {
    return messages.filter((msg) => !msg.isRead).length;
  }, [messages]);

  const scrollTargetId = unreadCount > 6 ? firstUnreadId : lastMessageId;

  const scrollRefCallback = useCallback((el) => {
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { firstUnreadId, scrollTargetId, scrollRefCallback };
};
