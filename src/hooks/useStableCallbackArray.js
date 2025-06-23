import { useMemo } from "react";

// 接收一組 callback 函式，回傳一組具穩定引用的函式陣列
export const useStableCallbackArray = ({ callbacks = [], deps = [] }) => {
  return useMemo(() => {
    return callbacks.map((callback) => {
      if (typeof callback !== "function") return null;
      return (...args) => callback(...args); // 轉發函式，保留參數
    });
  }, deps);
};
