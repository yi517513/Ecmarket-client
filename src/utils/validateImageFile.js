export const validateImageFile = (file) => {
  if (!file) return "請選擇圖片";

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return "僅支持 JPEG, PNG, GIF 格式";
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "圖片大小不得超過 5MB";
  }

  return null;
};
