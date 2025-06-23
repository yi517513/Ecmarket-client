import { useCallback, useEffect, useRef, useState } from "react";

export const useUserScrollDetection = ({ deps = [] } = {}) => {
  const containerRef = useRef(null);
  const hasScrollRef = useRef(false); // 用戶是否 scroll
  const [state, setState] = useState(false);
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
      if (!hasScrollRef.current) {
        hasScrollRef.current = true;
        setState(true);
      }
    };

    const handleWheel = () => {
      isUserTrigger = true;
    };

    const handleScroll = () => {
      if (isUserTrigger) {
        if (!hasScrollRef.current) {
          hasScrollRef.current = true;
          setState(true);
        }
      }
    };

    const clear = () => {
      isUserTrigger = false;
      hasScrollRef.current = false;
      setState(false);
    };

    // === 使用者主動互動事件 ===
    root.addEventListener("pointerdown", handlePointerDown);
    root.addEventListener("wheel", handleWheel, { passive: true });
    root.addEventListener("scroll", handleScroll, { passive: true });
    root.addEventListener("mouseleave", clear);

    return () => {
      console.log("卸載 useUserScrollDetection");
      root.removeEventListener("pointerdown", handlePointerDown);
      root.removeEventListener("wheel", handleWheel);
      root.removeEventListener("scroll", handleScroll);
      root.removeEventListener("mouseleave", clear);
    };
  }, [hasBind, ...deps]);

  useEffect(() => {
    console.log("hasScrollRef:", state);
  }, [state]);

  return { setScrollContainer, hasScrollRef };
};
