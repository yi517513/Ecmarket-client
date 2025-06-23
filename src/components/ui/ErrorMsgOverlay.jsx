import React, { useEffect } from "react";

export const ErrorMsgOverlay = ({ message, onClear, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClear?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClear]);

  return (
    <div className="fixed inset-0 z-50 flex pointer-events-none">
      <div className="flex items-center justify-center h-full w-full">
        {message && (
          <span className="opacity-80 bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};
