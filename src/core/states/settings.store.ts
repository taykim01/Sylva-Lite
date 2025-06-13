import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsState } from "../types";

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {} as SettingsState["settings"],
      _setSettings: (settings) => set({ settings }),
      _resetSettings: () => set({ settings: {} as SettingsState["settings"] }),
    }),
    {
      name: "settings-store",
    },
  ),
);

export default useSettingsStore;
