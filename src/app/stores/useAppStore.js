import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAppStore = create(
  devtools(
    (set) => ({
      isAppReady: false,
      setAppReady: (ready) => set({ isAppReady: ready }),
    }),
    { name: "AppStore" }
  )
);
