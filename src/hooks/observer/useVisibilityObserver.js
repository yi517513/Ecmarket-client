import { useCallback, useEffect, useRef } from "react";

export const useVisibilityObserver = ({
  onVisible,
  options = { threshold: 1.0 },
  deps = [],
  rootRef,
}) => {
  const idToElement = useRef(new Map());
  const elementToId = useRef(new WeakMap());
  const observer = useRef(null);

  const observeNodeAndCache = (el, id) => {
    // null 階段，不會知道是哪一個元素被 unmounted，所以必須透過 id 追蹤
    observer.current?.observe(el);
    idToElement.current.set(id, el);
    elementToId.current.set(el, id);
  };

  const unobserveElementAndClear = (id) => {
    const node = idToElement.current.get(id);
    if (node) {
      observer.current?.unobserve(node);
      idToElement.current.delete(id);
      // 不需要 delete WeakMap，讓它自動 GC
    }
  };

  const setSentinelRef = useCallback((el, id) => {
    el ? observeNodeAndCache(el, id) : unobserveElementAndClear(id);
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = elementToId.current.get(entry.target);
            onVisible?.({ el: entry.target, id });
          }
        });
      },
      { root: rootRef?.current ?? null, ...options }
    );

    return () => {
      observer.current?.disconnect();
      idToElement.current.clear();
      elementToId.current = new WeakMap(); // 想要清除一個 WeakMap，只能重建它
    };
  }, deps);

  return setSentinelRef;
};
