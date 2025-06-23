import React, { useEffect } from "react";

export const ImagePreview = ({ src, onClose }) => {
  if (!src) return;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <img
        src={src}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
      />
    </div>
  );
};
