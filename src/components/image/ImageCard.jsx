import React from "react";
import { ImageIcon } from "lucide-react";

export const ImageCard = ({ src, onClick }) => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-md border overflow-hidden">
      {src ? (
        <img
          src={src}
          alt=""
          onClick={onClick}
          className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
        />
      ) : (
        <ImageIcon size={24} />
      )}
    </div>
  );
};
