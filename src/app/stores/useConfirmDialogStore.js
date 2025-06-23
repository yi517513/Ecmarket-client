import { create } from "zustand";

export const useConfirmDialogStore = create((set) => ({
  isOpen: false,
  message: "",
  resolve: undefined,

  // Deferred Promise：回傳一個 Promise，將 resolve 函數暫存至狀態，讓外部（通常是 UI 事件）稍後決定何時觸發
  openConfirm: (message) =>
    new Promise((resolve) => {
      set({ isOpen: true, message, resolve });
    }),

  closeConfirm: () => set({ isOpen: false, message: "", resolve: undefined }),
}));
