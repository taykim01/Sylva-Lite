import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "../types";

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {} as UserState["user"],
      _setUser: (user) => set({ user }),
      _resetUser: () => set({ user: {} as UserState["user"] }),
    }),
    {
      name: "user-store",
    },
  ),
);

export default useUserStore;
