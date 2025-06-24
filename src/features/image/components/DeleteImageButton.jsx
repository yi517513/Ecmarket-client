import React, { useCallback } from "react";
import { useDeleteImage } from "../hooks/useImageMutate";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";

export const DeleteImageButton = ({ _id }) => {
  const openConfirm = useConfirmDialogStore((s) => s.openConfirm);
  const { mutate: deleteImage } = useDeleteImage();

  const handleDeleteImg = useCallback(async () => {
    const confirmed = await openConfirm("是否刪除圖片? 此操作無法還原");
    if (!confirmed) return;

    deleteImage(_id);
  }, [_id]);

  return (
    <>
      <button className="btn-danger mx-auto" onClick={handleDeleteImg}>
        刪除
      </button>
    </>
  );
};
