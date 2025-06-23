import { useEffect, useRef, useState } from "react";

export const useCountdown = () => {
  // ui 更新對象
  const [timeLeft, setTimeLeft] = useState(null);
  // 監控 window 事件
  const timeRef = useRef(null);
  const endTimeRef = useRef(0);
  const isCountingRef = useRef(false);

  const STORAGE_KEY = "countdown:endTime";

  // 計算每秒變更
  const tick = () => {
    const diff = Math.max(0, endTimeRef.current - Date.now());
    const secondsLeft = Math.floor(diff / 1000);
    setTimeLeft(secondsLeft);

    if (secondsLeft <= 0) {
      clearCountdown();
    }
  };

  // 開啟倒數
  const startInternalCountdown = () => {
    isCountingRef.current = true;
    clearInterval(timeRef.current);
    tick(); // 立即更新一次
    timeRef.current = window.setInterval(tick, 100);
  };

  // 結束倒數
  const clearCountdown = () => {
    isCountingRef.current = false;
    clearInterval(timeRef.current);
    localStorage.removeItem(STORAGE_KEY);
  };

  // 觸發倒數
  const startCountdown = ({ count }) => {
    const endTime = Date.now() + count * 1000;
    endTimeRef.current = endTime;

    localStorage.setItem(STORAGE_KEY, endTime.toString());
    startInternalCountdown();
  };

  // 掛載時獲取 localStorge.STORAGE_KEY 並接管倒數
  useEffect(() => {
    const storedEndTime = Number(localStorage.getItem(STORAGE_KEY) || "0");

    if (storedEndTime) {
      if (storedEndTime > Date.now()) {
        endTimeRef.current = storedEndTime;
        startInternalCountdown();
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return () => {
      clearInterval(timeRef.current); // 卸載時清除 interval
    };
  }, []);

  return { startCountdown, timeLeft, isCounting: isCountingRef.current };
};
