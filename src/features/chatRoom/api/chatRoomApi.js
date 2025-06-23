import { api } from "@utils/apiClient";

// 聊天摘要
export const getChatSummaryApi = async () => {
  return await api.get("/api/chat");
};

// 指定對象紀錄
export const getMessagesApi = async ({ recipientId, cursor, limit }) => {
  return await api.get("/api/chat/messages", {
    params: { recipientId, cursor, limit },
  });
};

// 發送訊息
export const sendMessageApi = async (message) => {
  return await api.post("/api/chat/", message);
};

// 更新未讀
export const markMessagesAsRead = async (messageIds) => {
  return await api.post(`/api/chat/markAsRead`, { messageIds });
};

// 搜訊用戶*
export const getUserInfo = async (uid) => {
  return await api.get("/api/users", { params: { uid }, silent: true });
};
