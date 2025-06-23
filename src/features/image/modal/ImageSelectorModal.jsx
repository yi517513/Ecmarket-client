import React, { useState } from "react";
import { Modal } from "@components/modal/Modal";
import { ImageGrid } from "../components/ImageGrid";
import { useFetchImages } from "../hooks/useImageQuery";
import { ImageInput } from "../components/ImageInput";
import { OffsetPagination } from "@components/pagination/offset/OffsetPagination";
import { usePagination } from "@hooks/pagination/clientSide/usePagination";
import { ContentFallback } from "@components/ui/ContentFallback";
import { ImagePreview } from "@components/image/ImagePreview";

export const ImageSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const { data, isLoading } = useFetchImages({ enabled: isOpen });
  const { paginatedItems: images, uiControls } = usePagination(data);
  const isEmpty = images?.length <= 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-4/5 w-3/4 w-auto p-4 "
    >
      <div className="w-full flex flex-col justify-between h-full gap-1">
        <ImageInput />
        <ContentFallback isLoading={isLoading} isEmpty={isEmpty}>
          <ImageGrid
            images={images}
            openPreview={setPreviewSrc}
            renderActionButton={(image) => (
              <button
                className="btn-primary mx-auto"
                onClick={() => onSelect(image)}
              >
                選擇
              </button>
            )}
          />
        </ContentFallback>
        <OffsetPagination {...uiControls} />
        <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />
      </div>
    </Modal>
  );
};
