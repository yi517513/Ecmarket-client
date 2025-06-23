import { useCallback, useEffect, useRef, useState } from "react";

export const useUserInputDetection = ({ deps = [] } = {}) => {
  const containerRef = useRef(null);

  const keydownCallbackRef = useRef(null);
  const hasInputRef = useRef(false);

  const [keydownState, setKeydownState] = useState(false);
  const [inputState, setInputState] = useState(false);

  const [hasBind, setHasBind] = useState(false);

  const setInputContainer = useCallback((el) => {
    containerRef.current = el;
    setHasBind(!!el);
  }, []);

  const setKeydownCallback = useCallback((callback) => {
    keydownCallbackRef.current = callback;
  }, []);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root || !hasBind) return;

    const handleKeydown = () => {
      if (keydownCallbackRef.current) {
        keydownCallbackRef?.current?.();
        setKeydownState(true);
      }
    };

    const handleInput = () => {
      if (!hasInputRef.current) {
        hasInputRef.current = true;
        setInputState(true);
      }
    };

    const handleInputEnd = () => {
      keydownCallbackRef.current = null;
      hasInputRef.current = false;
      setKeydownState(false);
      setInputState(false);
    };

    root.addEventListener("keydown", handleKeydown);
    root.addEventListener("input", handleInput);
    root.addEventListener("focusout", handleInputEnd);

    return () => {
      root.removeEventListener("keydown", handleKeydown);
      root.removeEventListener("input", handleInput);
      root.removeEventListener("focusout", handleInputEnd);
    };
  }, [hasBind, ...deps]);

  useEffect(() => {
    console.log("Keydown:", keydownState, "Input:", inputState);
  }, [keydownState, inputState]);

  return { setInputContainer, setKeydownCallback, hasInputRef };
};
