import { useEffect, useState, useRef } from "react";

export const useImageGallery = (initialImages) => {
  // 縮圖列表
  const [thumbnailList, setThumbnailList] = useState([]);
  // 當前縮圖 index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // 當前選擇圖片，默認 index 0
  const selectedImage = thumbnailList[selectedIndex];

  const selectImageByIndex = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (!thumbnailList.length) return;

    setSelectedIndex((prev) =>
      prev + 1 >= thumbnailList.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!thumbnailList.length) return;

    setSelectedIndex((prev) =>
      prev - 1 < 0 ? thumbnailList.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    Array.isArray(initialImages)
      ? setThumbnailList(initialImages)
      : setThumbnailList([]);
  }, [initialImages]);

  return {
    thumbnailList,
    selectedImage,
    selectImageByIndex,
    handleNext,
    handlePrev,
  };
};
