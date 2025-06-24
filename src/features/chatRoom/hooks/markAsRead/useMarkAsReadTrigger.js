import { useVisibilityObserver } from "@hooks/observer/useVisibilityObserver";
import debounce from "lodash.debounce";
import { useEffect, useRef } from "react";
import { useChatStore } from "@app/stores/useChatStore";

export const useMarkAsReadTrigger = ({ deps, rootRef }) => {
  const pendingIds = useRef(new Set());
  const alreadySentIds = useRef(new Set());
  const updateMessagesAsRead = useChatStore((s) => s.updateMessagesAsRead);
  const enqueueMarkAsRead = useChatStore((s) => s.enqueueMarkAsRead);

  // === 防抖動，外部呼叫再多次都以固定頻率執行內部流程 ===
  const debouncedMarkAsRead = useRef(
    debounce(() => {
      const toSend = [...pendingIds.current].filter(
        (id) => !alreadySentIds.current.has(id)
      );
      if (toSend.length <= 0) return;

      updateMessagesAsRead(toSend); // 樂觀更新
      enqueueMarkAsRead(toSend); // 加入更新佇列

      // 標記為已送出
      toSend.forEach((id) => {
        alreadySentIds.current.add(id);
        pendingIds.current.delete(id);
      });
    }, 300)
  ).current;

  // === 蒐集出現在 viewport 的 observe 對象並執行 debouncedMarkAsRead ===
  const setMarkAsReadSentinelRef = useVisibilityObserver({
    onVisible: ({ id: messageId }) => {
      if (!messageId || alreadySentIds.current.has(messageId)) return;
      pendingIds.current.add(messageId);

      debouncedMarkAsRead();
    },
    rootRef,
    options: { threshold: 0 },
  });

  // 卸載時立即執行，避免還有未送出的已讀
  useEffect(() => {
    return () => {
      debouncedMarkAsRead.flush(); // lodash 的 flush 可立即觸發執行
      pendingIds.current.clear();
      alreadySentIds.current.clear();
    };
  }, deps);

  return { setMarkAsReadSentinelRef };
};
