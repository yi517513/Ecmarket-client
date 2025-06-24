import { useCallback, useEffect, useRef, useState } from "react";

export const useUserInputDetection = ({ deps = [] } = {}) => {
  const containerRef = useRef(null);

  const [hasInput, setHasInput] = useState(false);

  const [hasBind, setHasBind] = useState(false);

  const setInputContainer = useCallback((el) => {
    containerRef.current = el;
    setHasBind(!!el);
  }, []);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root || !hasBind) return;

    const handleKeydown = () => {
      setHasInput(true);
    };

    const handleInput = () => {
      setHasInput(true);
    };

    const handleInputEnd = () => {
      setHasInput(false);
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

  return { setInputContainer, hasInput };
};
