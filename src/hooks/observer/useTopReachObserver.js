import { useRef, useEffect, useCallback } from "react";

export const useTopReachObserver = ({
  onReach,
  options = { threshold: 1 },
  offset = 50,
  dependencies = [],
  rootRef,
}) => {
  const observer = useRef(null);

  const setEdgeSentinelRef = useCallback((el) => {
    if (el) observer.current?.observe(el);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const containerRect = root.getBoundingClientRect();

          const nodeRect = entry.boundingClientRect;
          const offsetTop = nodeRect.top - containerRect.top;

          const isReach = offsetTop <= offset; // 抵達 container 頂部
          if (isReach) onReach?.(entry.target);
        });
      },
      { root, ...options }
    );

    return () => observer.current?.disconnect();
  }, dependencies);

  return setEdgeSentinelRef;
};
