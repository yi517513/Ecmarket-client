import { useState, useMemo } from "react";
import { useCursor } from "./useCursor";
import { useOffset } from "./useOffset";

export const usePagination = () => {
  const [mode, setMode] = useState("offset");
  const [limit, setLimit] = useState(20);

  const cursor = useCursor(limit);
  const offset = useOffset(limit);

  const updateConfig = (newConfig) => {
    const { mode, limit } = newConfig || {};

    setMode((prev) => mode ?? prev);
    setLimit((prev) => limit ?? prev);

    // 設定改變時，自動重置 pagination 資料狀態
    cursor.resetPagination();
    offset.resetPagination();
  };

  // === 提供給 UI 元件的 props ===
  const uiControlMap = {
    cursor: {
      mode,
      handleNext: cursor.handleNext,
    },
    offset: {
      mode,
      total: offset.total,
      currentPage: offset.page,
      totalPages: offset.totalPages,
      handlePrev: offset.handlePrev,
      handleNext: offset.handleNext,
      handleJump: offset.handleJump,
    },
  };

  // === 提供給 page 邏輯層的功能（ fetch 用的參數、同步、重設）===
  const paginationLogicMap = {
    cursor: {
      resetPagination: cursor.resetPagination,
      syncFetchMeta: ({ nextCursor }) => cursor.syncFetchMeta({ nextCursor }),
      paginationParams: { ...cursor.fetchParams, mode },
    },
    offset: {
      resetPagination: offset.resetPagination,
      syncFetchMeta: ({ totalItems }) => offset.syncFetchMeta({ totalItems }),
      paginationParams: { ...offset.fetchParams, mode },
    },
  };

  const uiControls = uiControlMap[mode];
  const paginationLogic = paginationLogicMap[mode];

  return {
    // 分頁 UI 控制
    uiControls,

    // 邏輯層功能
    paginationLogic,

    // 模式 UI 控制
    configControls: { mode, limit, updateConfig },

    // 給 syncStateToUrl 用
    paginationUrlDeps: { mode, limit, page: mode === "offset" && offset?.page },
  };
};
