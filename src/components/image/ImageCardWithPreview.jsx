import React, { useState } from "react";
import { ImageCard } from "./ImageCard";
import { ImagePreview } from "./ImagePreview";

export const ImageCardWithPreview = ({ src }) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  return (
    <>
      <ImageCard src={src} onClick={() => setPreviewSrc(src)} />
      {previewSrc && (
        <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />
      )}
    </>
  );
};
