import { useCallback, useEffect, useRef, useState } from "react";

export const useUserScrollDetection = ({ deps = [] } = {}) => {
  const containerRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false); // 用戶是否 scroll
  const [hasBind, setHasBind] = useState(false);

  const setScrollContainer = useCallback((el) => {
    containerRef.current = el;
    setHasBind(!!el);
  }, []);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root || !hasBind) return;

    let isUserTrigger = false;

    const handlePointerDown = () => {
      isUserTrigger = true;
      setHasScroll(true);
    };

    const handleWheel = () => {
      isUserTrigger = true;
    };

    const handleScroll = () => {
      if (isUserTrigger) {
        setHasScroll(true);
      }
    };

    const clear = () => {
      isUserTrigger = false;
      setHasScroll(false);
    };

    // === 使用者主動互動事件 ===
    root.addEventListener("pointerdown", handlePointerDown);
    root.addEventListener("wheel", handleWheel, { passive: true });
    root.addEventListener("scroll", handleScroll, { passive: true });
    root.addEventListener("mouseleave", clear);

    return () => {
      root.removeEventListener("pointerdown", handlePointerDown);
      root.removeEventListener("wheel", handleWheel);
      root.removeEventListener("scroll", handleScroll);
      root.removeEventListener("mouseleave", clear);
    };
  }, [hasBind, ...deps]);

  return { setScrollContainer, hasScroll };
};
