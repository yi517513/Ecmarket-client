import React from "react";

export const RemoveImageButton = ({ onRemove, image }) => {
  return (
    <button
      onClick={() => onRemove(image)}
      className="flex items-center justify-center z-10 absolute top-1 right-1 rounded-full border border-white bg-red-400 hover:bg-red-500 h-6 w-6 text-white opcatity-100"
    >
      x
    </button>
  );
};
