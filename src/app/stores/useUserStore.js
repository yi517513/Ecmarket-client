import { create } from "zustand";

export const useUserStore = create((set) => ({
  uid: null,
  userId: null,
  username: null,
  loginAt: null,
  logoutAt: null,

  setUserInfo: ({ _id, uid, username, loginAt, logoutAt } = {}) =>
    set({ userId: _id, uid, username, loginAt, logoutAt }),
}));
