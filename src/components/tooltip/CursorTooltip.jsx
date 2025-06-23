import { useState, useRef, useEffect } from "react";

export const CursorTooltip = ({ children, content }) => {
  // 儲存滑鼠相對於目前元素的座標位置
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 當滑鼠在元素內移動時，更新相對座標
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect(); // 取得元素相對於 viewport 的邊界位置
      setPosition({
        x: e.clientX - rect.left, // 計算滑鼠相對於元素左上角的 x 座標
        y: e.clientY - rect.top, // 計算滑鼠相對於元素左上角的 y 座標
      });
    };

    // 滑鼠進入元素時，顯示 tooltip
    const handleEnter = () => setIsHovering(true);
    // 滑鼠離開元素時，隱藏 tooltip
    const handleLeave = () => setIsHovering(false);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className="relative group w-full h-full">
      {children}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-100"
          style={{ top: position.y - 20, left: position.x + 5 }}
        >
          <span className="text-nowrap z-10">
            {typeof content === "string" ? content : String(content)}
          </span>
        </div>
      )}
    </div>
  );
};
