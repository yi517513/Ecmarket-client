import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// 轉跳使用，基於 offset 決定 fetch 範圍

export const useOffset = (limit) => {
  const [searchParams] = useSearchParams();

  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  // 當前 fetch 的 skip 範圍
  const skip = (page - 1) * limit;

  const totalPages = total ? Math.ceil(total / limit) : 1;

  // 透過 offset 使後端有 skip 基準
  const handleJump = (newPage) => {
    const validPage = Math.max(1, Math.min(Number(newPage) || 1, totalPages));

    setPage(validPage);
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  // 儲存最新 fetch 結果的內容
  const syncFetchMeta = ({ totalItems }) => {
    if (typeof totalItems === "number") {
      setTotal(totalItems);
    }
  };

  // 外部 filter 變更時重置分頁狀態以獲取最新資料
  const resetPagination = () => {
    setPage(1);
    setTotal(null);
  };

  useEffect(() => {
    if (page < 1) {
      handleJump(1);
    }

    if (totalPages > 1 && page > totalPages) {
      handleJump(totalPages);
    }
  }, [page, totalPages]);

  return {
    page,
    total,
    totalPages,
    skip,
    handleJump,
    handleNext,
    handlePrev,
    syncFetchMeta,
    resetPagination,
    fetchParams: { skip, limit },
  };
};
