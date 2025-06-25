import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [internalState, setInternalState] = useState({}); // 內部用來控制要同步到 URL 的 state
  const lastSyncedRef = useRef({}); // ⬅ 上一次實際同步到 URL 的狀態

  // 用來同步狀態到 URL
  const syncStateToUrl = (newPartialState = {}) => {
    // 比較 newPartialState 與上次成功同步的值
    const hasChanged = Object.entries(newPartialState).some(
      ([key, value]) => lastSyncedRef.current[key] !== value
    );

    if (!hasChanged) return;
    const nextState = { ...internalState, ...newPartialState };
    setInternalState(nextState);
    lastSyncedRef.current = { ...lastSyncedRef.current, ...newPartialState };
  };

  const defaultValues = {
    mode: "offset",
    limit: 20,
    type: "all",
    min: "all",
    max: "all",
  };

  // === internalState 改變時 → 更新 URL（排除 default 值）===
  const { page, mode, limit, min, max, type } = internalState || {};

  useEffect(() => {
    const filtered = Object.fromEntries(
      Object.entries(internalState).filter(
        ([key, value]) =>
          value != null &&
          value !== false &&
          value !== "" &&
          value !== "all" &&
          value !== defaultValues[key]
      )
    );

    const newParams = new URLSearchParams(filtered);
    setSearchParams(newParams, { replace: true });
  }, [page, mode, limit, min, max, type]);

  return { syncStateToUrl };
};
