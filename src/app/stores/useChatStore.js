import { create } from "zustand";

export const useChatStore = create((set) => ({
  isChatRoomOpen: false,
  recipient: null,
  chatSummary: [],
  messages: [],
  pendingMarkAsReadIds: [],
  typingFromRecipient: false, // from server
  currentChatUserId: null,

  // === 聊天室開關 ===
  openChatRoom: () => set({ isChatRoomOpen: true }),
  closeChatRoom: () => set({ isChatRoomOpen: false }),

  // === 設定接收對象 ===
  setRecipient: (info) =>
    set((state) => {
      const current = state.recipient;
      if (current?.userId === info.userId) return {};
      return { recipient: info, isReady: false };
    }),

  // === 設定聊天摘要 ===
  setChatSummary: (summary) => set({ chatSummary: summary }),

  // === 更新聊天摘要 ===
  updateChatSummary: (newSummary) =>
    set((state) => {
      const otherSummaries = state.chatSummary?.filter?.(
        (s) => s?.userId !== newSummary?.userId
      );

      return { chatSummary: [newSummary, ...otherSummaries] };
    }),

  // === 設定聊天紀錄 ===
  setMessages: (messages, userId) =>
    set({ messages, currentChatUserId: userId }),

  // === 更新聊天紀錄 ===
  markAsReadLocal: (messageIds) =>
    set((state) => ({
      messages: state.messages?.map((msg) =>
        messageIds?.includes(msg._id) ? { ...msg, isRead: true } : msg
      ),
    })),
  enqueueMarkAsRead: (ids) =>
    set((state) => {
      const setForm = new Set(state.pendingMarkAsReadIds);
      ids.forEach((id) => setForm.add(id));
      return { pendingMarkAsReadIds: [...setForm] };
    }),
  dequeueMarkAsRead: (ids) =>
    set((state) => {
      const setForm = new Set(state.pendingMarkAsReadIds);
      ids.forEach((id) => setForm.delete(id));
      return { pendingMarkAsReadIds: [...setForm] };
    }),

  // === 發送訊息 ===
  appendMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // === 設定 '正在輸入中' ===
  setTypingFromRecipient: (isTyping) => set({ typingFromRecipient: isTyping }),

  // === 清除聊天相關 ===
  clearChat: () =>
    set({
      isChatRoomOpen: false,
      recipientId: null,
      chatSummary: [],
      messages: [],
      typing: false,
    }),
}));
