import { useRef, useState } from "react";

// 上下頁按鈕使用，基於 timestamp 決定 fetch 範圍

export const useCursor = (limit) => {
  const nextCursorRef = useRef(null);
  const [cursorHistory, setCursorHistory] = useState([]);

  const lastCursor = cursorHistory[cursorHistory.length - 1];
  // 將 timestamp 加入 state 使後端可以採取 $lt 的方式搜尋資料

  const handleNext = () => {
    const latestCursor = nextCursorRef.current;

    setCursorHistory((prev) => {
      const lastCursor = prev[prev.length - 1];

      if (latestCursor && latestCursor !== lastCursor) {
        return [...prev, latestCursor];
      }
      return prev;
    });
  };

  // 儲存最新 fetch 結果的 nextCursor - *page 層使用
  const syncFetchMeta = ({ nextCursor }) => {
    if (typeof nextCursor === "string" && nextCursor.length > 0) {
      nextCursorRef.current = nextCursor;
    } else {
      nextCursorRef.current = null;
    }
  };

  // 外部 filter 變更時重置分頁狀態以獲取最新資料
  const resetPagination = () => {
    setCursorHistory([]);
    nextCursorRef.current = null;
  };

  return {
    handleNext,
    syncFetchMeta,
    resetPagination,
    fetchParams: { cursor: lastCursor, limit },
  };
};
