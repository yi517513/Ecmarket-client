import { useAuthStore } from "@app/stores/useAuthStore";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// const WEBSOCKET_URL = import.meta.env.VITE_LOCAL; // 本地
const WEBSOCKET_URL = import.meta.env.VITE_ZEABUR; // 雲端

export const useSocketConnect = () => {
  const socketRef = useRef(null);
  const [isSocketReady, setSocketReady] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io(WEBSOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;
    setSocketReady(true);

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    return () => {
      socket?.disconnect?.();
      socketRef.current = null;
    };
  }, [isAuthenticated]);

  return { socketRef, isSocketReady };
};
