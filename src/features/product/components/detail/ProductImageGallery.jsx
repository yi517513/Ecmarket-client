import React from "react";
import { ImageCardWithPreview } from "@components/image/ImageCardWithPreview";
import { ImageCard } from "@components/image/ImageCard";
import clsx from "clsx";

export const ProductImageGallery = ({
  thumbnailList,
  selectedImage,
  onChangeSelectedIndex,
  onNext,
  onPrev,
}) => {
  return (
    <div className="relative flex flex-col items-center gap-4 w-[480px] aspect-[3/4] bg-neutral-800 p-4 rounded-lg shadow-lg">
      {/* 左右箭頭按鈕 */}
      <button
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/20 text-white hover:bg-white/30"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/20 text-white hover:bg-white/30"
      >
        ›
      </button>

      {/* 主圖 */}
      <div className="w-[360px] h-full bg-black flex items-center justify-center rounded-md overflow-hidden">
        <ImageCardWithPreview src={selectedImage?.url} />
      </div>

      {/* 縮圖列表 */}
      <div className="flex gap-3">
        {thumbnailList?.map?.((thumbnail, index) => {
          const isSelected = selectedImage?._id === thumbnail?._id;
          return (
            <div
              key={thumbnail?._id}
              onClick={() => onChangeSelectedIndex(index)}
              className={clsx(
                "w-16 h-16 rounded-md overflow-hidden cursor-pointer transition",
                isSelected
                  ? "ring-2 ring-white scale-105"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              <ImageCard src={thumbnail?.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
