import { api } from "@utils/apiClient";

// 取得圖片
export const getImagesApi = async () => {
  return await api.get("/api/images");
};

// 上傳圖片
export const uploadImageApi = async (image) => {
  return await api.post("/api/images", image);
};

// 刪除圖片
export const deleteImageApi = async (imageId) => {
  return await api.delete(`/api/images/${imageId}`);
};
