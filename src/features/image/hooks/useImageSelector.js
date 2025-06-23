import { useEffect, useState } from "react";

export const useImageSelector = (initialImages) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState(initialImages);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selectImage = (image) => {
    if (image && Object.keys(image).length > 0) {
      setImages((prev) => (Array.isArray(prev) ? [...prev, image] : [image]));
      closeModal(); // 選完自動關 modal
    }
  };

  const removeImage = (removeImage) => {
    setImages((prev) =>
      Array.isArray(prev)
        ? prev.filter((img) => img._id !== removeImage._id)
        : []
    );
  };

  useEffect(() => {
    setImages(Array.isArray(initialImages) ? initialImages : []);
  }, [initialImages]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    images,
    selectImage,
    removeImage,
  };
};
