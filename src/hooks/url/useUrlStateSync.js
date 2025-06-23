import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlStateSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 內部用來控制要同步到 URL 的 state
  const [internalState, setInternalState] = useState({});

  // 用來同步狀態到 URL
  const syncStateToUrl = (newPartialState = {}) => {
    setInternalState((prev) => ({
      ...prev,
      ...newPartialState,
    }));
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
    setSearchParams(newParams, { replace: false });
  }, [page, mode, limit, min, max, type]);

  return { syncStateToUrl };
};
