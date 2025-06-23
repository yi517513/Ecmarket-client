import React from "react";
import { ImageGrid } from "@features/image/components/ImageGrid";
import { useFetchImages } from "@features/image/hooks/useImageQuery";
import { ImageInput } from "@features/image/components/ImageInput";
import { ContentFallback } from "@components/ui/ContentFallback";
import { DeleteImageButton } from "@features/image/components/DeleteImageButton";

export const ImageManagePage = () => {
  const { data: images, isLoading } = useFetchImages();
  const isEmpty = images?.length <= 0;

  return (
    <div className="w-full py-2">
      <div className="flex flex-col w-full max-w-[1200px] mx-auto">
        <div className="flex items-start w-full my-2">
          <ImageInput />
        </div>
        <div className="border border-gray-300 rounded p-2 my-2 min-h-[screen/2]">
          <ContentFallback isLoading={isLoading} isEmpty={isEmpty}>
            <ImageGrid
              images={images}
              renderActionButton={(image) => <DeleteImageButton {...image} />}
            />
          </ContentFallback>
        </div>
      </div>
    </div>
  );
};
