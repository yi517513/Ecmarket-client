import { create } from "zustand";
import { devtools } from "zustand/middleware";

const withDevtools =
  process.env.NODE_ENV === "development" ? devtools : (f) => f;

export const useAuthStore = create(
  withDevtools(
    (set) => ({
      isAdmin: false,
      isAuthenticated: false,
      isOpenModal: false,

      setAdmin: (value) => set({ isAdmin: value }),
      setAuth: (isAuthenticated) => set({ isAuthenticated }),
      clearAuth: () =>
        set({ isAuthenticated: false, isAdmin: false, isOpenModal: false }),

      openAuthModal: () => set({ isOpenModal: true }),
      closeAuthModal: () => set({ isOpenModal: false }),
    }),
    { name: "AuthStore" }
  )
);
