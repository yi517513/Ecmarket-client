import React from "react";
import { CursorTooltip } from "@components/tooltip/CursorTooltip";
import { ImageCardWithPreview } from "@components/image/ImageCardWithPreview";

export const ImageGrid = ({ images, renderActionButton }) => {
  return (
    <div className="h-full grid gap-2 grid-cols-5">
      {images?.map?.((image) => {
        const { key, _id, createdAt, url } = image || {};
        return (
          <div
            key={_id}
            className="aspect-square bg-gray-100 border border-gray-300 rounded max-w-[240px]"
          >
            <CursorTooltip
              content={`建立日期: ${new Date(createdAt).toLocaleString()}`}
            >
              <ImageCardWithPreview src={url} />
            </CursorTooltip>
            <div className="flex items-center">
              {renderActionButton?.({ _id, createdAt, url })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
