import React from "react";

export const LoadingOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 opacity-30 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full" />
    </div>
  );
};
