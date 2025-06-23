import { uploadImageApi, deleteImageApi } from "../api/imageApi";
import { useQueryClient } from "@tanstack/react-query";
import { useProtectedMutate } from "@hooks/useProtectedMutate";
import { notifyUtils as notify } from "@utils/notify";

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useProtectedMutate({
    mutationFn: uploadImageApi,
    onMutate: () => {
      notify.loading("上傳圖片中。。");
    },
    onSuccess: (newImage) => {
      queryClient.setQueryData(["private", "images"], (prev) => {
        return prev ? [newImage, ...prev] : [newImage];
      });
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useProtectedMutate({
    mutationFn: deleteImageApi,
    onMutate: async (imageId) => {
      notify.loading("正在刪除中。。");
      // 暫停其他 queries（防止 race condition）
      await queryClient.cancelQueries({ queryKey: ["private", "images"] });

      // 快照目前資料
      const previousImages = queryClient.getQueryData(["private", "images"]);

      // 樂觀更新：預先移除圖片
      queryClient.setQueryData(["private", "images"], (old = []) =>
        old.filter((img) => img._id !== imageId)
      );

      // 回傳快照資料供 onError 使用
      return { previousImages };
    },
    onError: (context) => {
      // 還原快取資料
      if (context?.previousImages) {
        queryClient.setQueryData(["private", "images"], context.previousImages);
      }
    },
  });
};
