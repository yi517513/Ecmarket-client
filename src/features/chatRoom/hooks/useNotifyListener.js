import { useCallback, useEffect, useState } from "react";

export const useNotifyListener = (socketRef, isSocketReady) => {
  const [notifyIndicator, setNotifyIndicator] = useState(false);

  const handleNotify = useCallback(() => {
    setNotifyIndicator(true);
  }, []);

  const clearNotify = useCallback(() => {
    setNotifyIndicator(false);
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("server:chatRoom:notify", handleNotify);

    return () => {
      socketRef.current?.off("server:chatRoom:typing", handleNotify);
    };
  }, [isSocketReady]);

  return { notifyIndicator, clearNotify };
};
