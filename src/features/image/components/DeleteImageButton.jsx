import React from "react";
import { useDeleteImage } from "../hooks/useImageMutate";

export const DeleteImageButton = ({ _id }) => {
  const { mutate: deleteImage } = useDeleteImage();

  return (
    <>
      <button className="btn-danger mx-auto" onClick={() => deleteImage(_id)}>
        刪除
      </button>
    </>
  );
};
