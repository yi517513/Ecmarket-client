import React from "react";

export const OpenImageSelectorButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-full w-full text-3xl text-gray-400 hover:bg-slate-100 hover:text-4xl"
      type="button"
    >
      +
    </button>
  );
};
