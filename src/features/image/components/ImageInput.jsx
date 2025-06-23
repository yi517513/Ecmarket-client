import React from "react";
import { useUploadImage } from "../hooks/useImageMutate";
import { notifyUtils as notify } from "@utils/notify";
import { validateImageFile } from "@utils/validateImageFile";

export const ImageInput = () => {
  const { mutate: uploadImage } = useUploadImage();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    const error = validateImageFile(file);

    if (error) {
      notify.error(error);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    uploadImage(formData);
  };

  return (
    <input
      type="file"
      onChange={handleChange}
      className="cursor-pointer p-1 rounded "
    />
  );
};
