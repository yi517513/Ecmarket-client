import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ANIMATION_DURATION = 780;

export const Modal = ({ isOpen, onClose, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Modal 打開時立即顯示
      setIsVisible(true);
    } else {
      // Modal關閉時等待動畫結束後才設置isVisible為false
      const timer = setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  // 讓Modal脫離sticky的上下文，直接渲染到body中
  return ReactDOM.createPortal(
    <div
      className={`${
        isOpen ? `animate-fade-in` : `animate-fade-out`
      } flex fixed inset-0 bg-black bg-opacity-10 items-center justify-center z-50`}
      onClick={(e) => {
        // e.stopPropagation();
        if (onClose) onClose();
      }}
    >
      <div
        className={`flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {React.Children?.map?.(children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })}
      </div>
    </div>,
    document.body
  );
};
